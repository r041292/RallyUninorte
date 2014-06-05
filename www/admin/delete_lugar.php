<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="f/css/normalize.css">
	<link rel="stylesheet" href="f/css/foundation.css">
</head>
<body>
<? 
include('config.php'); 
$id_lugar = (int) $_GET['id_lugar']; 
mysql_query("DELETE FROM `Lugar` WHERE `id_lugar` = '$id_lugar' ") ; 
echo (mysql_affected_rows()) ? "Row deleted.<br /> " : "Nothing deleted.<br /> "; 
?> 

<a class='button' href='list_lugar.php'>Back To Listing</a>
</body>
</html>