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
$id_resultado = (int) $_GET['id_resultado']; 
mysql_query("DELETE FROM `Resultados` WHERE `id_resultado` = '$id_resultado' ") ; 
echo (mysql_affected_rows()) ? "Row deleted.<br /> " : "Nothing deleted.<br /> "; 
?> 

<a class='button' href='list_resultados.php'>Back To Listing</a>
</body>
</html>