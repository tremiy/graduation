<?php
header('Content-Type: text/html; charset=utf-8');
$nickName = $_POST['nickName'];
$name = $_POST['username'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$phone = $_POST['phone'];
$servername = "127.0.0.1"; 
$username = "root"; 
$password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 
$name = urlencode($name);
// echo $name;

// 创建连接 
// $conn = new mysqli($servername, $username, $password, $dbname);
$conn = mysql_connect($servername, $username, $password);
mysql_select_db($dbname);
// 检测连接 

if ($conn->connect_error) { 
    echo "false";
    die("connect server fail: " . $conn->connect_error); 
}
else{
    echo "connect success";
}
// echo $nickName;
// echo $name;
// public function strtoascii($str){

//     $str=mb_convert_encoding($str,'GB2312');

//     $change_after='';

//     for($i=0;$i<strlen($str);$i++){
//         $temp_str=dechex(ord($str[$i]));

//         $change_after.=$temp_str[1].$temp_str[0];

//     }

//     return strtoupper($change_after);

// }

// $name = strtoascii($name);
// echo $name;
// echo $phone;
// echo $gender;
// echo $age;
// echo $nickName;

$cmdPhone = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py encrypt '.$phone;
// echo $cmdPhone;
exec($cmdPhone,$outputPhone,$res);
$phone = $outputPhone[1];

// echo $phone;
// echo $phone;

$cmdName = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py encrypt '.$name;
exec($cmdName,$outputName,$res);
$name = $outputName[1];

$cmdAge = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py  encrypt '.$age;
exec($cmdAge,$outputAge,$res);
$age = $outputAge[1];
// echo $age;

$cmdGender = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py encrypt '.$gender[0];
exec($cmdGender,$outputGender,$res);
$gender = $outputGender[1];
// echo $gender;

// 解密：
// $cmdPhone2 = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$phone;
// // echo $cmdPhone2;
// exec($cmdPhone2,$outputPhone2,$res);
// echo 'dephone:';
// echo $outputPhone2[2];

// $cmdName2 = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$name;
// // echo $cmdName2;
// exec($cmdName2,$outputName2,$res);
// echo 'dename:';
// echo $outputName2[2];



$sql = "UPDATE user SET username='$name',phone='$phone',gender='$gender',age='$age' WHERE nickname = '$nickName'";
// if ($conn->query($sql) === TRUE) { 
//     echo "update success";
//  } 
//  else { 
//      echo "Error: " . $sql . "<br>" . $conn->error; 
//     }
// echo $sql;
if(mysql_query($sql,$conn)){
    echo "insert success";
}
else{
    echo "insert false";
}
    mysql_close();
    // $conn->close();

?>