<? 
include('config.php'); 
$id_pregunta = (int) $_GET['id_pregunta']; 
mysql_query("DELETE FROM `Pregunta` WHERE `id_pregunta` = '$id_pregunta' ") ; 
echo (mysql_affected_rows()) ? "Row deleted.<br /> " : "Nothing deleted.<br /> "; 
?> 

<a href='list_pregunta.php'>Back To Listing</a>