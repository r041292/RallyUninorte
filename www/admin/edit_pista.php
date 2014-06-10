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

include('config.php'); 
if (isset($_GET['id_pista']) ) { 
$id_pista = (int) $_GET['id_pista']; 
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "UPDATE `Pista` SET  `pista` =  '{$_POST['pista']}' ,  `id_lugar` =  '{$_POST['id_lugar']}'   WHERE `id_pista` = '$id_pista' "; 
mysql_query($sql) or die(mysql_error()); 
echo (mysql_affected_rows()) ? "Edited row.<br />" : "Nothing changed. <br />"; 
echo "<a href='list_pista.php'>Back To Listing</a>"; 
} 
$row = mysql_fetch_array ( mysql_query("SELECT * FROM `Pista` WHERE `id_pista` = '$id_pista' ")); 
?>

<form action='' method='POST'> 
<p><b>Pista:</b><br /><textarea name='pista'><?= stripslashes($row['pista']) ?></textarea> 
<p><b>Id Lugar:</b><br /><input type='text' name='id_lugar' value='<?= stripslashes($row['id_lugar']) ?>' /> 
<p><input class='button' type='submit' value='Edit Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
<? } ?> 
</body>
</html>