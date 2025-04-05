<?php
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");
header("Connection: keep-alive");

while (true) {
    $time = date('H:i:s');
    echo "data: Az aktuális idő: {$time}\n\n";
    ob_flush();
    flush();
    sleep(1); // 1 másodpercenként küld egy új üzenetet
}
?>
