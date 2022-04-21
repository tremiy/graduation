<?php 
header("content-type:text/html;charset=utf-8");

$nickname = $_POST['nickname'];
$doctorId = $_POST['doctorId'];

$username = "root"; $password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 

// 创建连接 
$conn = mysql_connect($servername, $username, $password);
mysql_select_db($dbname);
// 检测连接 
if ($conn->connect_error) { 
    echo "false";
    die("connect server fail: " . $conn->connect_error); 
}
else{
    // echo "success";
}

$sql = "INSERT INTO line (user,doctor,create_time)  VALUES((SELECT id FROM user WHERE nickname='$nickname'),$doctorId,now())";
// echo $sql;

$res = mysql_query($sql,$conn);

if($res){  
    echo "success";
}
else{
    echo "false";
}
mysql_close();

?>