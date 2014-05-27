<?php
header("Access-Control-Allow-Origin: *");
date_default_timezone_set("America/Bogota");
$dbuser = "u927820083_user";
$dbpass = "123456";
$dbhost = "mysql.hostinger.co";
$dbname = "u927820083_db";
$connection = mysql_connect($dbhost, $dbuser, $dbpass) or die("Unable to connect to server");
$database = mysql_select_db($dbname) or die("Unable to connect to database");
?>