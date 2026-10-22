<?php
// Blog downloads in exchange for contact details. Emails the reader their download
// links (which confirms the address is real), emails the lead to the practice, and
// keeps a private CSV of leads beside the website.

declare(strict_types=1);
require __DIR__ . '/_lib.php';
header('X-Robots-Tag: noindex');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false, 'error' => 'method']);
if (!same_origin()) reply(403, ['ok' => false, 'error' => 'origin']);
if (looks_like_bot()) reply(200, ['ok' => true]);

$slug    = post_slug($_POST);
$name    = line('name', 120);
$email   = line('email', 200);
$company = line('company', 160);
$role    = line('role', 120);
$updates = ($_POST['updates'] ?? '') === 'yes';

$missing = [];
if ($name === '') $missing[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $missing[] = 'email';
if (($_POST['consent'] ?? '') !== 'yes') $missing[] = 'consent';
if ($missing) reply(422, ['ok' => false, 'error' => 'fields', 'fields' => $missing]);
if (rate_limited('lead', 6)) reply(429, ['ok' => false, 'error' => 'rate']);

$post = POSTS[$slug];
$links = '';
foreach ($post['files'] as $label => $path) $links .= "• $label:\n  " . SITE . $path . "\n\n";

$sent = send_mail($email, 'Your download: ' . $post['resource'],
    "Hi $name,\n\nThank you for downloading from bynergex.com. Here are your files:\n\n$links"
    . "They're based on the article \"" . $post['title'] . "\":\n" . SITE . "/blog/$slug/\n\n"
    . "If you'd like an engineer to look at your own site, reply to this email or call +27 66 252 2655.\n\n"
    . "Bramwill Bruinders, Pr. Tech. Eng.\nBynergex Consulting\n" . SITE . "\n\n"
    . "You're receiving this because you asked for this download. "
    . ($updates ? "You also asked for occasional updates; reply STOP to opt out at any time." : "We won't email you again unless you contact us.")
    . "\nPrivacy policy: " . SITE . "/privacy/\n",
    OWNER_EMAIL);
$readerVia = $GLOBALS['mail_via'];

send_mail(OWNER_EMAIL, 'New download lead: ' . $name . ($company !== '' ? " ($company)" : ''),
    "New lead from a blog download\n\nResource: " . $post['resource'] . "\nArticle: " . $post['title'] . "\n\n"
    . "Name: $name\nEmail: $email\n" . ($company !== '' ? "Company: $company\n" : '') . ($role !== '' ? "Role: $role\n" : '')
    . 'Occasional updates: ' . ($updates ? 'Yes, opted in' : 'No') . "\n"
    . 'Download email to the reader: ' . ($sent ? "handed to the mail server via $readerVia" : "FAILED via $readerVia")
    . ($readerVia === 'smtp' ? '' : ' (they also got the download buttons on the page; add smtp.json for reliable delivery)')
    . "\n\nReply to this email to contact them directly.",
    $email);

$csv = data_dir() . '/leads.csv';
$new = !is_file($csv);
$h = fopen($csv, 'a');
if ($h) {
    flock($h, LOCK_EX);
    if ($new) fputcsv($h, ['date', 'name', 'email', 'company', 'role', 'resource', 'article', 'updates_opt_in']);
    fputcsv($h, [date('c'), $name, $email, $company, $role, $post['resource'], $slug, $updates ? 'yes' : 'no']);
    flock($h, LOCK_UN); fclose($h);
}

// The reader also gets the files on the page straight away, so they never depend on the email.
$files = [];
foreach ($post['files'] as $label => $path) $files[] = ['label' => $label, 'url' => $path];
reply(200, ['ok' => true, 'emailed' => $sent, 'files' => $files]);
