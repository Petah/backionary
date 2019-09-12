<?php
$path = __DIR__ . '/public/';
passthru("rm -rf $path");
mkdir("$path");

$token = 'aa';
$getToken = function () use (&$token) {
    while ($token == 'i' || $token == 'j' || $token == 'p' || $token == 'x' || $token == 'y' || $token == 'do') {
        $token++;
    }
    return $token++;
};

$tokens = [];

foreach (glob(__DIR__ . '/src/*.*') as $file) {
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
    if (preg_match('/\.(js)$/', $file)) {
        passthru("node_modules\\.bin\\esminify --keep-top-level -o $outputFile $outputFile");
    }
}



if (is_file(__DIR__ . '/public.zip')) {
    echo 'Deleting public.zip' . PHP_EOL . PHP_EOL;
    unlink(__DIR__ . '/public.zip');
}
echo 'Compressing public.zip' . PHP_EOL . PHP_EOL;
passthru('kzip public.zip public/*');
echo PHP_EOL . PHP_EOL;

echo 'Final size: ' . filesize(__DIR__ . '/public.zip') . PHP_EOL . PHP_EOL;
