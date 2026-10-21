<?php
// Enquiry form handler: validates the website form and emails it to the practice
// through Hostinger's mail server (the domain's MX and SPF are Hostinger's, so no
// password or third-party service is needed). Replies with JSON for the page script.

declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

const TO_ADDRESS   = 'consultant@bynergex.com';
const FROM_ADDRESS = 'consultant@bynergex.com';
const ALLOWED_HOSTS = ['bynergex.com', 'www.bynergex.com'];
const MAX_PER_HOUR = 5;

function reply(int $status, array $body): void {
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false, 'error' => 'method']);
}

// Only accept posts from the site's own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$host = strtolower((string) parse_url($origin, PHP_URL_HOST));
if (!in_array($host, ALLOWED_HOSTS, true)) {
    reply(403, ['ok' => false, 'error' => 'origin']);
}

// Text fields: trimmed, length-capped, and stripped of control characters.
function field(string $name, int $max): string {
    $v = trim((string) ($_POST[$name] ?? ''));
    $v = preg_replace('/[^\P{C}\n\t]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}
// Single-line values can never carry a line break (blocks header injection).
function line(string $name, int $max): string {
    return str_replace(["\r", "\n"], ' ', field($name, $max));
}

// Bots: the hidden "website" field is filled, or the form was sent within 3 seconds of loading.
$started = (int) ($_POST['t'] ?? 0);
if (field('website', 200) !== '' || ($started > 0 && (time() * 1000 - $started) < 3000)) {
    reply(200, ['ok' => true]);
}

$service  = line('service', 60);
$stage    = line('stage', 120);
$decision = field('decision', 4000);
$name     = line('name', 120);
$email    = line('email', 200);
$company  = line('company', 160);
$phone    = line('phone', 40);

$missing = [];
if ($decision === '') $missing[] = 'decision';
if ($name === '') $missing[] = 'name';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $missing[] = 'email';
if ($missing) {
    reply(422, ['ok' => false, 'error' => 'fields', 'fields' => $missing]);
}

// At most a handful of enquiries per visitor per hour.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$log = sys_get_temp_dir() . '/bynergex-enquiry-' . hash('sha256', $ip) . '.json';
$recent = array_filter((array) json_decode((string) @file_get_contents($log), true), fn($t) => is_int($t) && $t > time() - 3600);
if (count($recent) >= MAX_PER_HOUR) {
    reply(429, ['ok' => false, 'error' => 'rate']);
}

$body = implode("\n", array_filter([
    'New enquiry from bynergex.com',
    '',
    'Service: ' . ($service ?: 'Not chosen'),
    'Where things stand: ' . ($stage ?: 'Not chosen'),
    '',
    'What they need help with:',
    $decision,
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    $company !== '' ? 'Company / site: ' . $company : null,
    $phone !== '' ? 'Phone: ' . $phone : null,
    '',
    'Sent from: ' . line('page', 200) . ' at ' . date('Y-m-d H:i T'),
    'Reply to this email to answer ' . $name . ' directly.',
], fn($l) => $l !== null));

$subject = '=?UTF-8?B?' . base64_encode('Website enquiry: ' . ($service ?: 'General') . ' from ' . $name) . '?=';
$headers = implode("\r\n", [
    'From: Bynergex website <' . FROM_ADDRESS . '>',
    'Reply-To: ' . '=?UTF-8?B?' . base64_encode($name) . '?= <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: bynergex.com enquiry form',
]);

$sent = @mail(TO_ADDRESS, $subject, $body, $headers, '-f' . FROM_ADDRESS);
if (!$sent) {
    reply(502, ['ok' => false, 'error' => 'mail']);
}

$recent[] = time();
@file_put_contents($log, json_encode(array_values($recent)));
reply(200, ['ok' => true]);
