<?php 
header("content-type:text/html;charset=utf-8");

$department = $_POST['keshi'];

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
    // echo "success";
}
// echo $name;


$sql = "SELECT doctor.pic,doctor.name,doctor.years,doctor.num,doctor.introduction,doctor.id FROM doctor INNER JOIN department ON doctor.dp = department.id WHERE department.name = '$department'";
// echo $sql;

$result = mysql_query($sql,$conn);
// echo mysql_num_rows($res);
// // echo $res;
// $result = mysql_fetch_array($res,MYSQL_ASSOC);
// // echo $result;

// $back = array("pic"=>"$result[pic]","name"=>"$result[name]","years"=>"$result[years]",'num'=>"$result[num]","introduction"=>"$result[introduction]");

$new = array();
// echo mysql_num_rows($res);
if (mysql_num_rows($result) > 0) {

    // 输出数据
    while($row =  mysql_fetch_array($result,MYSQL_ASSOC)) {
        $cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py decrypt '.$row[name];
        // echo $cmdname;   
        exec($cmdname,$outputname,$res);
        // print_r($outputname);
        // echo $outputname[2];

        $cmdpic = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py decrypt '.$row[pic];
        // echo $cmdname;   
        exec($cmdpic,$outputpic,$res);
        // print_r($outputpic);
        // echo $outputpic[2];

        $cmdyears = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py decrypt '.$row[years];
        // echo $cmdname;   
        exec($cmdyears,$outputyears,$res);
        // print_r($outputyears);
        // echo $outputyears[2];

        $cmdintroduction = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py decrypt '.$row[introduction];
        // echo $cmdname;   
        exec($cmdintroduction,$outputintroduction,$res);
        // print_r($outputintroduction);
        // echo $outputintroduction[2];

        $row = array("id"=>"$row[id]","pic"=>"$outputpic[2]","name"=>"$outputname[2]","years"=>"$outputyears[2]",'num'=>"$row[num]","introduction"=>"$outputintroduction[2]");
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