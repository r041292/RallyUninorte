<? 
include('config.php'); 
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "INSERT INTO `Pregunta` ( `num_pregunta` ,  `nivel_pregunta` ,  `titulo_pregunta` ,  `texto_1` ,  `texto_2` ,  `texto_3` ,  `imagen_1` ,  `imagen_2` ,  `respuesta_a` ,  `respuesta_b` ,  `respuesta_c` ,  `respuesta_d` ,  `respuesta_correcta` ,  `tipo_pregunta`  ) VALUES(  '{$_POST['num_pregunta']}' ,  '{$_POST['nivel_pregunta']}' ,  '{$_POST['titulo_pregunta']}' ,  '{$_POST['texto_1']}' ,  '{$_POST['texto_2']}' ,  '{$_POST['texto_3']}' ,  '{$_POST['imagen_1']}' ,  '{$_POST['imagen_2']}' ,  '{$_POST['respuesta_a']}' ,  '{$_POST['respuesta_b']}' ,  '{$_POST['respuesta_c']}' ,  '{$_POST['respuesta_d']}' ,  '{$_POST['respuesta_correcta']}' ,  '{$_POST['tipo_pregunta']}'  ) "; 
mysql_query($sql) or die(mysql_error()); 
echo "Added row.<br />"; 
echo "<a href='list_pregunta.php'>Back To Listing</a>"; 
} 
?>

<form action='' method='POST'> 
<p><b>Num Pregunta:</b><br /><input type='text' name='num_pregunta'/> 
<p><b>Nivel Pregunta:</b><br /><input type='text' name='nivel_pregunta'/> 
<p><b>Titulo Pregunta:</b><br /><textarea name='titulo_pregunta'></textarea> 
<p><b>Texto 1:</b><br /><textarea name='texto_1'></textarea> 
<p><b>Texto 2:</b><br /><textarea name='texto_2'></textarea> 
<p><b>Texto 3:</b><br /><textarea name='texto_3'></textarea> 
<p><b>Imagen 1:</b><br /><textarea name='imagen_1'></textarea> 
<p><b>Imagen 2:</b><br /><textarea name='imagen_2'></textarea> 
<p><b>Respuesta A:</b><br /><textarea name='respuesta_a'></textarea> 
<p><b>Respuesta B:</b><br /><textarea name='respuesta_b'></textarea> 
<p><b>Respuesta C:</b><br /><textarea name='respuesta_c'></textarea> 
<p><b>Respuesta D:</b><br /><textarea name='respuesta_d'></textarea> 
<p><b>Respuesta Correcta:</b><br /><textarea name='respuesta_correcta'></textarea> 
<p><b>Tipo Pregunta:</b><br /><input type='text' name='tipo_pregunta'/> 
<p><input type='submit' value='Add Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
