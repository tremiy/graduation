<?php
header('Content-Type: text/html; charset=gb2312');
$nickName = $_POST['name'];
$servername = "127.0.0.1"; 
$username = "root"; 
$password = "root";//服务器中连接数据库的密码 
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
    echo "connect success";
}

// 查询
$sql = "SELECT username,phone,gender,age FROM user";
$res = mysql_query($sql,$conn);
$result = mysql_fetch_array($res,MYSQL_ASSOC);

if(in_array(null,$result)){
    echo 'null';
}
else{
    $cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[username];
    exec($cmdname,$outputname,$res);
    echo 'name:'.$outputname[2];

    $cmdphone = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[phone];
    exec($cmdphone,$outputphone,$res);
    echo 'phone:'.$outputphone[2];

    $cmdgender = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[gender];
    exec($cmdgender,$outputgender,$res);
    echo 'gender:'.$outputgender[2];

    $cmdage = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[age];
    exec($cmdage,$outputage,$res);
    echo 'age'.$outputage[2];
}



// if ($conn->query($sql) === TRUE) { 
//     echo "update success";
//  } 
//  else { 
//      echo "Error: " . $sql . "<br>" . $conn->error; 
//     }
// echo $sql;

    mysql_close();
    // $conn->close();

?>