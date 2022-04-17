<?php 
$name = $_POST['keshi']; 
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
    // echo "success";
}
// echo $name;


$sql = "SELECT zhengzhuang,yufang FROM department WHERE name = '$name'";
$res = mysql_query($sql,$conn);
$result = mysql_fetch_array($res,MYSQL_ASSOC);

$back = array("zhengzhuang"=>"$result[zhengzhuang]","yufang"=>"$result[yufang]");

if($back){
    echo json_encode($back);
}
else{
    echo "false";
}
mysql_close();

?>