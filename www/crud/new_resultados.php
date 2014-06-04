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
$sql = "INSERT INTO `Resultados` ( `fecha` ,  `hora` ,  `codigo_est` ,  `nombre_est` ,  `grupo_est` ,  `nivel_pregunta` ,  `numero_pregunta` ,  `tiempo_respuesta` ,  `puntos_pregunta`  ) VALUES(  '{$_POST['fecha']}' ,  '{$_POST['hora']}' ,  '{$_POST['codigo_est']}' ,  '{$_POST['nombre_est']}' ,  '{$_POST['grupo_est']}' ,  '{$_POST['nivel_pregunta']}' ,  '{$_POST['numero_pregunta']}' ,  '{$_POST['tiempo_respuesta']}' ,  '{$_POST['puntos_pregunta']}'  ) "; 
mysql_query($sql) or die(mysql_error()); 
echo "Added row.<br />"; 
echo "<a href='list_resultados.php'>Back To Listing</a>"; 
} 
?>

<form action='' method='POST'> 
<p><b>Fecha:</b><br /><textarea name='fecha'></textarea> 
<p><b>Hora:</b><br /><textarea name='hora'></textarea> 
<p><b>Codigo Est:</b><br /><textarea name='codigo_est'></textarea> 
<p><b>Nombre Est:</b><br /><textarea name='nombre_est'></textarea> 
<p><b>Grupo Est:</b><br /><textarea name='grupo_est'></textarea> 
<p><b>Nivel Pregunta:</b><br /><textarea name='nivel_pregunta'></textarea> 
<p><b>Numero Pregunta:</b><br /><textarea name='numero_pregunta'></textarea> 
<p><b>Tiempo Respuesta:</b><br /><textarea name='tiempo_respuesta'></textarea> 
<p><b>Puntos Pregunta:</b><br /><textarea name='puntos_pregunta'></textarea> 
<p><input class='button' type='submit' value='Add Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
</body>
</html>