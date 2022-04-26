<?php
header("content-type:text/html;charset=utf-8");
$nickName = $_POST['nickName'];
$servername = "127.0.0.1"; 
$username = "root"; 
$password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 
// echo $nickName;

// 创建连接 
// $conn = new mysqli($servername, $username, $password, $dbname);
$conn = mysql_connect($servername, $username, $password);
mysql_select_db($dbname);
// 检测连接 

if ($conn->connect_error) { 
    // echo "false";
    die("connect server fail: " . $conn->connect_error); 
}
else{
    // echo "connect success";
}

// 查询
$sql = "SELECT username,phone,gender,age FROM user";
$res = mysql_query($sql,$conn);
$result = mysql_fetch_array($res,MYSQL_ASSOC);


if($result[username]!=null && $result[phone]!=null && $result[gender]!=null && $result[age]!=null){
    $cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[username];
    exec($cmdname,$outputname,$res);
    // echo 'name:'.$outputname[2];
    $name = $outputname[1];
    
    $cmdphone = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[phone];
    exec($cmdphone,$outputphone,$res);
    // echo 'phone:'.$outputphone[2];
    $phone = $outputphone[1];

    $cmdgender = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[gender];
    exec($cmdgender,$outputgender,$res);
    // echo 'gender:'.$outputgender[2];
    $gender = $outputgender[1];

    $cmdage = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe SM2.py decrypt '.$result[age];
    exec($cmdage,$outputage,$res);
    // echo 'age'.$outputage[2];
    $age = $outputage[1];

    $back = array("username"=>urlencode("$name"),"phone"=>"$phone","gender"=>"$gender","age"=>"$age");

    $array = json_encode($back);
    echo urldecode($array);
}
else{
    echo 'null';
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