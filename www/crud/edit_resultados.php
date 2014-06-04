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
if (isset($_GET['id_resultado']) ) { 
$id_resultado = (int) $_GET['id_resultado']; 
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "UPDATE `Resultados` SET  `fecha` =  '{$_POST['fecha']}' ,  `hora` =  '{$_POST['hora']}' ,  `codigo_est` =  '{$_POST['codigo_est']}' ,  `nombre_est` =  '{$_POST['nombre_est']}' ,  `grupo_est` =  '{$_POST['grupo_est']}' ,  `nivel_pregunta` =  '{$_POST['nivel_pregunta']}' ,  `numero_pregunta` =  '{$_POST['numero_pregunta']}' ,  `tiempo_respuesta` =  '{$_POST['tiempo_respuesta']}' ,  `puntos_pregunta` =  '{$_POST['puntos_pregunta']}'   WHERE `id_resultado` = '$id_resultado' "; 
mysql_query($sql) or die(mysql_error()); 
echo (mysql_affected_rows()) ? "Edited row.<br />" : "Nothing changed. <br />"; 
echo "<a href='list_resultados.php'>Back To Listing</a>"; 
} 
$row = mysql_fetch_array ( mysql_query("SELECT * FROM `Resultados` WHERE `id_resultado` = '$id_resultado' ")); 
?>

<form action='' method='POST'> 
<p><b>Fecha:</b><br /><textarea name='fecha'><?= stripslashes($row['fecha']) ?></textarea> 
<p><b>Hora:</b><br /><textarea name='hora'><?= stripslashes($row['hora']) ?></textarea> 
<p><b>Codigo Est:</b><br /><textarea name='codigo_est'><?= stripslashes($row['codigo_est']) ?></textarea> 
<p><b>Nombre Est:</b><br /><textarea name='nombre_est'><?= stripslashes($row['nombre_est']) ?></textarea> 
<p><b>Grupo Est:</b><br /><textarea name='grupo_est'><?= stripslashes($row['grupo_est']) ?></textarea> 
<p><b>Nivel Pregunta:</b><br /><textarea name='nivel_pregunta'><?= stripslashes($row['nivel_pregunta']) ?></textarea> 
<p><b>Numero Pregunta:</b><br /><textarea name='numero_pregunta'><?= stripslashes($row['numero_pregunta']) ?></textarea> 
<p><b>Tiempo Respuesta:</b><br /><textarea name='tiempo_respuesta'><?= stripslashes($row['tiempo_respuesta']) ?></textarea> 
<p><b>Puntos Pregunta:</b><br /><textarea name='puntos_pregunta'><?= stripslashes($row['puntos_pregunta']) ?></textarea> 
<p><input class='button' type='submit' value='Edit Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
<? } ?> 
</body>
</html>