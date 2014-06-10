<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="f/css/normalize.css">
	<link rel="stylesheet" href="f/css/foundation.css">
</head>
<body>
<? 

session_start();
if(!$_SESSION['shouldPass']){
	header("Location: http://uninorterally1.hol.es");
    exit;
}

include('../connection.php'); 
$id_resultado = (int) $_GET['id_resultado']; 
mysql_query("DELETE FROM `Resultados` WHERE `id_resultado` = '$id_resultado' ") ; 
echo (mysql_affected_rows()) ? "Row deleted.<br /> " : "Nothing deleted.<br /> "; 
?> 

<a class='button' href='list_resultados.php'>Back To Listing</a>
</body>
</html>