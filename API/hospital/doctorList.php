<?php 
header("content-type:text/html;charset=utf-8");

$department = $_POST['keshi'];

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


$sql = "SELECT doctor.pic,doctor.name,doctor.years,doctor.num,doctor.introduction,doctor.id FROM doctor INNER JOIN department ON doctor.dp = department.id WHERE department.name = '$department'";
// echo $sql;

$res = mysql_query($sql,$conn);
// // echo $res;
// $result = mysql_fetch_array($res,MYSQL_ASSOC);
// // echo $result;

// $back = array("pic"=>"$result[pic]","name"=>"$result[name]","years"=>"$result[years]",'num'=>"$result[num]","introduction"=>"$result[introduction]");

$new = array();
// echo mysql_num_rows($res);
if (mysql_num_rows($res) > 0) {

    // 输出数据
    while($row =  mysql_fetch_array($res,MYSQL_ASSOC)) {
        $row = array("id"=>"$row[id]","pic"=>"$row[pic]","name"=>"$row[name]","years"=>"$row[years]",'num'=>"$row[num]","introduction"=>"$row[introduction]");
        $new[] = $row;
    }
    echo json_encode($new);
}
// if($back){  
//     echo json_encode($back);
// }
else{
    echo "false";
}
mysql_close();

?>