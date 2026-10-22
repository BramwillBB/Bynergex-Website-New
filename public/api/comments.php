<?php
// Ratings and "Ask the engineer" questions for blog posts.
//   GET  ?post=slug                     approved questions and the rating summary
//   GET  ?action=health                 checks the private storage folder is writable
//   POST action=rate  post, stars        one rating per visitor per post (they can change it)
//   POST action=ask   post, name, email, question   held for approval, owner emailed
//   GET/POST action=moderate             the signed page the owner opens from that email

declare(strict_types=1);
require __DIR__ . '/_lib.php';
header('X-Robots-Tag: noindex');

$action = line('action', 20, $_REQUEST);

function summary(string $slug): array {
    $ratings = array_values(read_json("ratings-$slug.json"));
    $count = count($ratings);
    return ['count' => $count, 'average' => $count ? round(array_sum($ratings) / $count, 1) : 0];
}
function approved(string $slug): array {
    $out = [];
    foreach (read_json("questions-$slug.json") as $q) {
        if (($q['status'] ?? '') !== 'approved') continue;
        $out[] = ['name' => $q['name'], 'question' => $q['question'], 'answer' => $q['answer'] ?? '', 'date' => $q['date']];
    }
    usort($out, fn($a, $b) => strcmp($b['date'], $a['date']));
    return $out;
}

// ---- reads ----
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === 'health') {
    $probe = data_dir() . '/.probe';
    $ok = @file_put_contents($probe, 'ok') === 2 && @unlink($probe);
    secret();   // created on first use; its date shows the folder survives deploys
    reply($ok ? 200 : 500, ['ok' => $ok, 'beside' => basename(dirname(data_dir())),
        'since' => date('c', (int) filemtime(data_dir() . '/secret.key')), 'smtp' => smtp_config() !== null]);
}
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $action === '') {
    $slug = post_slug($_GET);
    header('Cache-Control: no-store');
    reply(200, ['ok' => true, 'rating' => summary($slug), 'questions' => approved($slug)]);
}

// ---- the owner's moderation page (signed link from the notification email) ----
if ($action === 'moderate') {
    header('Content-Type: text/html; charset=utf-8');
    $src = $_SERVER['REQUEST_METHOD'] === 'POST' ? $_POST : $_GET;
    $slug = line('post', 120, $src);
    $id = line('id', 40, $src);
    $sig = line('sig', 64, $src);
    $page = fn(string $title, string $inner) => exit('<!doctype html><html lang="en-ZA"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>' . htmlspecialchars($title) . '</title>'
        . '<style>body{margin:0;background:#0b1d3a;color:#f8fafc;font:16px/1.6 system-ui,sans-serif;padding:6vh 20px}main{max-width:40rem;margin:0 auto}'
        . 'h1{font-size:1.5rem}blockquote{margin:1rem 0;padding:1rem 1.2rem;background:#1a3c6e;border-left:4px solid #e55225;border-radius:4px}'
        . 'textarea{width:100%;box-sizing:border-box;min-height:9rem;font:inherit;padding:.8rem;border-radius:4px;border:1px solid #94a3b8;background:#061022;color:#f8fafc}'
        . 'button{font:600 1rem system-ui;padding:.8rem 1.4rem;border:0;border-radius:4px;cursor:pointer;margin:1rem .6rem 0 0}.ok{background:#e55225;color:#fff}.no{background:#334155;color:#fff}'
        . 'small,.muted{color:#94a3b8}a{color:#f06a3d}</style></head><body><main>' . $inner . '</main></body></html>');

    if (!isset(POSTS[$slug]) || $id === '' || !hash_equals(sign($slug, $id), $sig)) {
        http_response_code(403);
        $page('Link not valid', '<h1>This moderation link isn\'t valid.</h1><p class="muted">It may have been copied incompletely.</p>');
    }
    $file = "questions-$slug.json";
    $q = read_json($file)[$id] ?? null;
    if (!$q) { http_response_code(404); $page('Not found', '<h1>This question no longer exists.</h1>'); }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $decision = line('decision', 10);
        $answer = field('answer', 4000);
        $result = with_json($file, function (&$d) use ($id, $decision, $answer) {
            if (!isset($d[$id])) return null;
            if ($decision === 'delete') { unset($d[$id]); return 'deleted'; }
            $d[$id]['status'] = 'approved';
            $d[$id]['answer'] = $answer;
            $d[$id]['answeredAt'] = date('c');
            return 'approved';
        });
        $postUrl = SITE . '/blog/' . $slug . '/#questions';
        if ($result === 'approved' && $answer !== '' && empty($q['notified'])) {
            send_mail($q['email'], 'Your question on bynergex.com has been answered',
                "Hi {$q['name']},\n\nThank you for your question on \"" . POSTS[$slug]['title'] . "\".\n\nYou asked:\n{$q['question']}\n\nBramwill's answer:\n$answer\n\nIt's now published on the article:\n$postUrl\n\nIf you'd like to talk it through, reply to this email or call +27 66 252 2655.\n\nBynergex Consulting\n" . SITE,
                OWNER_EMAIL);
            with_json($file, function (&$d) use ($id) { if (isset($d[$id])) $d[$id]['notified'] = true; });
        }
        $page('Done', $result === 'deleted'
            ? '<h1>Deleted.</h1><p class="muted">The question has been removed.</p>'
            : '<h1>Published.</h1><p>The question' . ($answer !== '' ? ' and your answer are' : ' is') . ' now on <a href="' . htmlspecialchars($postUrl) . '">the article</a>.' . ($answer !== '' ? ' The reader has been emailed your answer.' : '') . '</p>');
    }

    $h = fn($s) => htmlspecialchars((string) $s, ENT_QUOTES);
    $page('Moderate question', '<h1>Question on “' . $h(POSTS[$slug]['title']) . '”</h1>'
        . '<p><strong>' . $h($q['name']) . '</strong> <span class="muted">&lt;' . $h($q['email']) . '&gt; · ' . $h(substr($q['date'], 0, 16)) . ' · status: ' . $h($q['status']) . '</span></p>'
        . '<blockquote>' . nl2br($h($q['question'])) . '</blockquote>'
        . '<form method="post" action="/api/comments.php"><input type="hidden" name="action" value="moderate"><input type="hidden" name="post" value="' . $h($slug) . '"><input type="hidden" name="id" value="' . $h($id) . '"><input type="hidden" name="sig" value="' . $h($sig) . '">'
        . '<label for="answer">Your answer (shown under the question; the reader is emailed it)</label><textarea id="answer" name="answer">' . $h($q['answer'] ?? '') . '</textarea>'
        . '<button class="ok" name="decision" value="approve">Publish</button><button class="no" name="decision" value="delete">Delete</button></form>'
        . '<p><small>Only you have this link. Publishing shows the reader\'s name, never their email address.</small></p>');
}

// ---- visitor actions ----
if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);
if (!same_origin()) reply(403, ['ok' => false, 'error' => 'origin']);
$slug = post_slug($_POST);

if ($action === 'rate') {
    $stars = (int) ($_POST['stars'] ?? 0);
    if ($stars < 1 || $stars > 5) reply(422, ['ok' => false, 'error' => 'stars']);
    if (rate_limited('rate', 20)) reply(429, ['ok' => false, 'error' => 'rate']);
    $me = visitor_hash();
    with_json("ratings-$slug.json", function (&$d) use ($me, $stars) { $d[$me] = $stars; });
    reply(200, ['ok' => true, 'rating' => summary($slug), 'mine' => $stars]);
}

if ($action === 'ask') {
    if (looks_like_bot()) reply(200, ['ok' => true]);
    $name = line('name', 80);
    $email = line('email', 200);
    $question = field('question', 2000);
    $missing = [];
    if ($name === '') $missing[] = 'name';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $missing[] = 'email';
    if (mb_strlen($question) < 10) $missing[] = 'question';
    if (($_POST['consent'] ?? '') !== 'yes') $missing[] = 'consent';
    if ($missing) reply(422, ['ok' => false, 'error' => 'fields', 'fields' => $missing]);
    if (rate_limited('ask', 5)) reply(429, ['ok' => false, 'error' => 'rate']);

    $id = bin2hex(random_bytes(8));
    with_json("questions-$slug.json", function (&$d) use ($id, $name, $email, $question) {
        $d[$id] = ['name' => $name, 'email' => $email, 'question' => $question, 'date' => date('c'), 'status' => 'pending'];
    });
    $link = SITE . '/api/comments.php?action=moderate&post=' . rawurlencode($slug) . '&id=' . $id . '&sig=' . sign($slug, $id);
    send_mail(OWNER_EMAIL, 'New question on: ' . POSTS[$slug]['title'],
        "New reader question on bynergex.com\n\nArticle: " . POSTS[$slug]['title'] . "\nFrom: $name <$email>\n\n$question\n\nPublish it (with your answer) or delete it here:\n$link\n\nNothing appears on the site until you publish it. You can also reply to this email to answer privately.",
        $email);
    reply(200, ['ok' => true]);
}

reply(400, ['ok' => false, 'error' => 'action']);
