<?php
header('Content-Type: text/html; charset=utf-8');
$servername = "127.0.0.1"; 
$username = "root"; 
$password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 


$name = '杨敏铝';

$cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM9.py encrypt '.$name;
exec($cmdname,$outputname,$res);
$name = $outputname;
echo $name;

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



// $sql = "UPDATE user SET username='$name',phone='$phone',gender='$gender',age='$age' WHERE nickname = '$nickName'";
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