<?php
// Shared helpers for the blog's questions, ratings and downloads. Data lives in a
// private folder beside the website (never inside it), so deploys don't wipe it
// and nothing in it can be fetched over the web.

declare(strict_types=1);
if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === realpath(__FILE__)) { http_response_code(404); exit; }

const SITE = 'https://bynergex.com';
const OWNER_EMAIL = 'consultant@bynergex.com';
const ALLOWED_HOSTS = ['bynergex.com', 'www.bynergex.com'];

// Every post that takes ratings, questions and downloads, with its downloads.
const POSTS = [
    'energy-audit-before-solar-south-africa' => [
        'title' => 'Energy audit before solar: Why South African businesses should cut waste first',
        'resource' => 'Pre-Solar Energy Checklist',
        'files' => [
            'Pre-Solar Energy Checklist' => '/downloads/pre-solar-energy-checklist-7c41e2.pdf',
            'The full article (PDF)' => '/downloads/energy-audit-before-solar-article-3b9d50.pdf',
        ],
    ],
    'sseg-registration-cape-town-guide' => [
        'title' => 'SSEG registration in Cape Town: A step-by-step guide for 2026',
        'resource' => 'SSEG Registration Pack',
        'files' => [
            'SSEG Registration Pack' => '/downloads/sseg-registration-pack-a58f13.pdf',
            'The full article (PDF)' => '/downloads/sseg-registration-guide-article-e2c704.pdf',
        ],
    ],
];

function reply(int $status, array $body): void {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code($status);
    echo json_encode($body);
    exit;
}

function same_origin(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    return in_array(strtolower((string) parse_url($origin, PHP_URL_HOST)), ALLOWED_HOSTS, true);
}

// Text from the request: trimmed, length-capped, control characters removed.
function field(string $name, int $max, ?array $src = null): string {
    $src ??= $_POST;
    $v = trim((string) ($src[$name] ?? ''));
    $v = preg_replace('/[^\P{C}\n\t]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}
function line(string $name, int $max, ?array $src = null): string {
    return str_replace(["\r", "\n"], ' ', field($name, $max, $src));
}

function post_slug(?array $src = null): string {
    $slug = line('post', 120, $src ?? $_REQUEST);
    if (!isset(POSTS[$slug])) reply(404, ['ok' => false, 'error' => 'post']);
    return $slug;
}

// Bots: the hidden "website" field is filled, or the form was sent within 3 s of loading.
function looks_like_bot(): bool {
    $started = (int) ($_POST['t'] ?? 0);
    return field('website', 200) !== '' || ($started > 0 && (time() * 1000 - $started) < 3000);
}

function data_dir(): string {
    static $dir = null;
    if ($dir !== null) return $dir;
    $web = realpath($_SERVER['DOCUMENT_ROOT'] ?? '') ?: '';
    $candidates = array_filter([
        $web ? dirname($web) . '/bynergex-private' : null,
        '/home/' . get_current_user() . '/bynergex-private',
    ]);
    foreach ($candidates as $c) {
        if ($web && strpos($c, $web . '/') === 0) continue;   // never inside the website
        if (!is_dir($c)) @mkdir($c, 0700, true);
        if (is_dir($c) && is_writable($c)) return $dir = $c;
    }
    reply(500, ['ok' => false, 'error' => 'storage']);
}

// JSON read/write with a lock, so two visitors can't overwrite each other.
function with_json(string $file, callable $fn) {
    $path = data_dir() . '/' . $file;
    $h = fopen($path, 'c+');
    if (!$h) reply(500, ['ok' => false, 'error' => 'storage']);
    flock($h, LOCK_EX);
    $raw = stream_get_contents($h);
    $data = $raw ? (json_decode($raw, true) ?: []) : [];
    $result = $fn($data);
    ftruncate($h, 0); rewind($h);
    fwrite($h, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    fflush($h); flock($h, LOCK_UN); fclose($h);
    return $result;
}
function read_json(string $file): array {
    $path = data_dir() . '/' . $file;
    return is_file($path) ? (json_decode((string) file_get_contents($path), true) ?: []) : [];
}

function visitor_hash(): string {
    return hash_hmac('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . ($_SERVER['HTTP_USER_AGENT'] ?? ''), secret());
}

// Per-visitor limit on any action, e.g. 5 questions an hour.
function rate_limited(string $action, int $max, int $window = 3600): bool {
    return with_json('limits.json', function (&$d) use ($action, $max, $window) {
        $key = $action . ':' . visitor_hash();
        $recent = array_values(array_filter($d[$key] ?? [], fn($t) => $t > time() - $window));
        if (count($recent) >= $max) { $d[$key] = $recent; return true; }
        $recent[] = time();
        $d[$key] = $recent;
        foreach ($d as $k => $times) if (!array_filter($times, fn($t) => $t > time() - 86400)) unset($d[$k]);
        return false;
    });
}

// A random secret made on first use and kept in the private folder; signs moderation links.
function secret(): string {
    static $s = null;
    if ($s) return $s;
    $path = data_dir() . '/secret.key';
    if (!is_file($path)) { file_put_contents($path, bin2hex(random_bytes(32))); @chmod($path, 0600); }
    return $s = trim((string) file_get_contents($path));
}
function sign(string ...$parts): string {
    return substr(hash_hmac('sha256', implode('|', $parts), secret()), 0, 32);
}

function send_mail(string $to, string $subject, string $body, string $replyTo = ''): bool {
    $headers = [
        'From: Bynergex Consulting <' . OWNER_EMAIL . '>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];
    if ($replyTo !== '') $headers[] = 'Reply-To: ' . $replyTo;
    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . OWNER_EMAIL);
}
