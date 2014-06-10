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
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "INSERT INTO `Pista` ( `pista` ,  `id_lugar`  ) VALUES(  '{$_POST['pista']}' ,  '{$_POST['id_lugar']}'  ) "; 
mysql_query($sql) or die(mysql_error()); 
echo "Added row.<br />"; 
echo "<a href='list_pista.php'>Back To Listing</a>"; 
} 
?>

<form action='' method='POST'> 
<p><b>Pista:</b><br /><textarea name='pista'></textarea> 
<p><b>Id Lugar:</b><br /><input type='text' name='id_lugar'/> 
<p><input class='button' type='submit' value='Add Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
</body>
</html>