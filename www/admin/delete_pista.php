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
$id_pista = (int) $_GET['id_pista']; 
mysql_query("DELETE FROM `Pista` WHERE `id_pista` = '$id_pista' ") ; 
echo (mysql_affected_rows()) ? "Row deleted.<br /> " : "Nothing deleted.<br /> "; 
?> 

<a class='button' href='list_pista.php'>Back To Listing</a>
</body>
</html>