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
if (isset($_GET['id_lugar']) ) { 
$id_lugar = (int) $_GET['id_lugar']; 
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "UPDATE `Lugar` SET  `nombre_lugar` =  '{$_POST['nombre_lugar']}' ,  `lat` =  '{$_POST['lat']}' ,  `long` =  '{$_POST['long']}' ,  `alt` =  '{$_POST['alt']}'   WHERE `id_lugar` = '$id_lugar' "; 
mysql_query($sql) or die(mysql_error()); 
echo (mysql_affected_rows()) ? "Edited row.<br />" : "Nothing changed. <br />"; 
echo "<a href='list_lugar.php'>Back To Listing</a>"; 
} 
$row = mysql_fetch_array ( mysql_query("SELECT * FROM `Lugar` WHERE `id_lugar` = '$id_lugar' ")); 
?>

<form action='' method='POST'> 
<p><b>Nombre Lugar:</b><br /><textarea name='nombre_lugar'><?= stripslashes($row['nombre_lugar']) ?></textarea> 
<p><b>Lat:</b><br /><textarea name='lat'><?= stripslashes($row['lat']) ?></textarea> 
<p><b>Long:</b><br /><textarea name='long'><?= stripslashes($row['long']) ?></textarea> 
<p><b>Alt:</b><br /><textarea name='alt'><?= stripslashes($row['alt']) ?></textarea> 
<p><input class='button' type='submit' value='Edit Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
<? } ?> 
</body>
</html>