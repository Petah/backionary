<?php
$path = __DIR__ . '/build/';
passthru("rm -rf $path");
mkdir("$path");

$token = 'a';
$getToken = function () use (&$token) {
    while ($token == 'i' || $token == 'j' || $token == 'p' || $token == 'x' || $token == 'y' || $token == 'do') {
        $token++;
    }
    return $token++;
};

$tokens = [];

foreach (glob(__DIR__ . '/public/*.*') as $file) {
    echo $file . PHP_EOL;
    $content = file_get_contents($file);
    if (preg_match('/\.(js|css|html|svg)$/', $file)) {
        echo 'Replacing tokens' . PHP_EOL;
        $content = preg_replace_callback('/zx[a-zA-Z0-9]+/', function ($match) use ($getToken, &$tokens) {
            if (!isset($tokens[$match[0]])) {
                $tokens[$match[0]] = $getToken();
            }
            return $tokens[$match[0]];
        }, $content);
    }
    $outputFile = $path . basename($file);
    echo 'Writing ' . $outputFile . PHP_EOL;
    file_put_contents($outputFile, $content);

    if (preg_match('/\.(css)$/', $file)) {
        passthru("node_modules\.bin\uglifycss $outputFile > $outputFile.min && rm $outputFile && mv $outputFile.min $outputFile");
    }
    if (preg_match('/\.(html)$/', $file)) {
        passthru("node_modules\.bin\html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype $outputFile > $outputFile.min && rm $outputFile && mv $outputFile.min $outputFile");
    }
}

passthru("node_modules\\.bin\\esminify -o $path $path");

if (is_file(__DIR__ . '/build.zip')) {
    echo 'Deleting build.zip' . PHP_EOL . PHP_EOL;
    unlink(__DIR__ . '/build.zip');
}
echo 'Compressing build.zip' . PHP_EOL . PHP_EOL;
passthru('kzip build.zip build/*');
echo PHP_EOL . PHP_EOL;

echo 'Final size: ' . filesize(__DIR__ . '/build.zip') . PHP_EOL . PHP_EOL;
