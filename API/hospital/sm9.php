<?php
header('Content-Type: text/html; charset=utf-8');

$servername = "127.0.0.1"; 
$username = "root"; 
$password = "root";//服务器中连接数据库的密码 
$dbname = "doctor";//使用的数据库名 
$name = urlencode($name);

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

// $name = '张三';
// $years = '3';
// $introduction = '男，医学博士，副教授，副主任医师。籍贯：温州.毕业于复旦大学医学院,对于脑血管病（脑梗死、脑出血）、眩晕症、偏头痛、颅内感染、癫痫、帕金森病、周围神经病、重症肌无力、脱髓鞘疾病、老年性痴呆等变性疾病的诊断和治疗';
// $pic = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c8415b10ec7aa801212d57334fdc.png%401280w_1l_2o_100sh.png&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653103740&t=6f2d48d9e36593002ee212b4fcd767f4';


// $name = urlencode($name);
// $introduction = urlencode($introduction);

// $cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$name;
// // echo $cmdname;   
// exec($cmdname,$outputname,$res);
// $name = $outputname[1];
// print_r($name);

// $cmdyears = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$years;
// // echo $cmdname;   
// exec($cmdyears,$outputyears,$res);
// $years = $outputyears[1];

// $cmdintroduction = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$introduction;
// // echo $cmdname;   
// exec($cmdintroduction,$outputintroduction,$res);
// $introduction = $outputintroduction[1];

// $cmdpic = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py encrypt '.$pic;
// // echo $cmdname;   
// exec($cmdpic,$outputpic,$res);
// $pic = $outputpic[1];



// $sql = "INSERT INTO doctor (name,years,introduction,pic,num,dp) VALUES('$name','$years','$introduction','$pic','20','2')";
// echo $sql;

// if(mysql_query($sql,$conn)){
//     echo "insert success";
// }
// else{
//     echo "insert false";
// }

$sql = "SELECT name FROM doctor WHERE dp ='2'";
$res = mysql_query($sql,$conn);
$result = mysql_fetch_array($res,MYSQL_ASSOC);
print_r($result[name]);

$cmdname = 'C:/Users/nsus/AppData/Local/Programs/Python/Python38/python.exe sm9.py decrypt '.$result[name];
// echo $cmdname;   
exec($cmdname,$outputname,$res);
print_r($outputname);
echo $outputname[2];


mysql_close();
// $conn->close();

?>