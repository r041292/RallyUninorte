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
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "INSERT INTO `Lugar` ( `nombre_lugar` ,  `lat` ,  `long` ,  `alt`  ) VALUES(  '{$_POST['nombre_lugar']}' ,  '{$_POST['lat']}' ,  '{$_POST['long']}' ,  '{$_POST['alt']}'  ) "; 
mysql_query($sql) or die(mysql_error()); 
echo "Added row.<br />"; 
echo "<a href='list_lugar.php'>Back To Listing</a>"; 
} 
?>

<form action='' method='POST'> 
<p><b>Nombre Lugar:</b><br /><textarea name='nombre_lugar'></textarea> 
<p><b>Lat:</b><br /><textarea name='lat'></textarea> 
<p><b>Long:</b><br /><textarea name='long'></textarea> 
<p><b>Alt:</b><br /><textarea name='alt'></textarea> 
<p><input class='button' type='submit' value='Add Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
</body>
</html>