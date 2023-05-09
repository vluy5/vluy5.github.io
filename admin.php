<?php
$ip = $_SERVER['REMOTE_ADDR']; // получаем IP-адрес посетителя
$file = 'ips.txt'; // имя файла, куда будем записывать IP-адреса

// записываем IP-адрес в файл
$current = file_get_contents($file);
$current .= $ip . "\n";
file_put_contents($file, $current);
?>
