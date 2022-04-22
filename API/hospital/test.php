<?php
header('Content-Type: text/html; charset=utf-8');

$name = '杨敏铝';
// echo $name;


$name = urlencode($name);

$cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$name;
// echo $cmdname;   
exec($cmdname,$outputname,$res);
$name = $outputname;


// $output = urldecode(shell_exec('C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$name));
// $array = explode(',', $output);

// foreach ($array as $value) {
//     echo "1111哈哈";
//     echo $value;
//     echo "<br>";
//    }
print_r($name);
// echo $name[2];

?>