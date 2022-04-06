<?php 
$name = $_POST['name']; 
$url = $_POST['url']; 
$gender = $_POST['gender'];
$servername = "127.0.0.1"; 
$username = "root"; $password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 

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
    echo "success";
}
// echo $name;


$sql = "INSERT INTO  user (nickname,url,gender) VALUES ('$name', '$url','$gender')";
$sql2 = "UPDATE user SET url = '$url',gender='$gender' WHERE nickname = '$name'";
echo $sql;
echo $sql2;

if(mysql_query($sql,$conn)){
    echo "insert success";
}
elseif(mysql_query($sql2,$conn)){
    echo "update success";
}
else{
    echo "false";
}
mysql_close();
// if ($conn->query($sql) === TRUE) { 
//     echo "insert success";
//  } 
// elseif($conn->query($sql2) === TRUE){
//     echo "update success";
// }
//  else { 
//      echo "Error: " . $sql . "<br>" . $conn->error; 
//     }
//     $conn->close(); 
?>