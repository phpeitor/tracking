<?php
header('Content-Type: application/json; charset=utf-8');

const DEFAULT_TRACKING_API_URL = 'http://127.0.0.1/cotix/controller/tracking/api_tracking.php';

function loadEnv(string $path): array
{
    $env = [];

    if (!is_file($path)) {
        return $env;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#') || str_starts_with($line, ';')) {
            continue;
        }

        $separator = strpos($line, '=');
        if ($separator === false) {
            continue;
        }

        $key = trim(substr($line, 0, $separator));
        $value = trim(substr($line, $separator + 1));

        if (($value[0] ?? '') === '"' && str_ends_with($value, '"')) {
            $value = substr($value, 1, -1);
        }

        $env[$key] = $value;
    }

    return $env;
}

$env = loadEnv(__DIR__ . '/../.env');

$trackingApiUrl = $env['TRACKING_API_URL'] ?? DEFAULT_TRACKING_API_URL;

echo json_encode(
    [
        'tracking_api_url' => trim((string) $trackingApiUrl),
    ],
    JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);