<? 
include('config.php'); 
if (isset($_GET['id_pregunta']) ) { 
$id_pregunta = (int) $_GET['id_pregunta']; 
if (isset($_POST['submitted'])) { 
foreach($_POST AS $key => $value) { $_POST[$key] = mysql_real_escape_string($value); } 
$sql = "UPDATE `Pregunta` SET  `num_pregunta` =  '{$_POST['num_pregunta']}' ,  `nivel_pregunta` =  '{$_POST['nivel_pregunta']}' ,  `titulo_pregunta` =  '{$_POST['titulo_pregunta']}' ,  `texto_1` =  '{$_POST['texto_1']}' ,  `texto_2` =  '{$_POST['texto_2']}' ,  `texto_3` =  '{$_POST['texto_3']}' ,  `imagen_1` =  '{$_POST['imagen_1']}' ,  `imagen_2` =  '{$_POST['imagen_2']}' ,  `respuesta_a` =  '{$_POST['respuesta_a']}' ,  `respuesta_b` =  '{$_POST['respuesta_b']}' ,  `respuesta_c` =  '{$_POST['respuesta_c']}' ,  `respuesta_d` =  '{$_POST['respuesta_d']}' ,  `respuesta_correcta` =  '{$_POST['respuesta_correcta']}' ,  `tipo_pregunta` =  '{$_POST['tipo_pregunta']}'   WHERE `id_pregunta` = '$id_pregunta' "; 
mysql_query($sql) or die(mysql_error()); 
echo (mysql_affected_rows()) ? "Edited row.<br />" : "Nothing changed. <br />"; 
echo "<a href='list_pregunta.php'>Back To Listing</a>"; 
} 
$row = mysql_fetch_array ( mysql_query("SELECT * FROM `Pregunta` WHERE `id_pregunta` = '$id_pregunta' ")); 
?>

<form action='' method='POST'> 
<p><b>Num Pregunta:</b><br /><input type='text' name='num_pregunta' value='<?= stripslashes($row['num_pregunta']) ?>' /> 
<p><b>Nivel Pregunta:</b><br /><input type='text' name='nivel_pregunta' value='<?= stripslashes($row['nivel_pregunta']) ?>' /> 
<p><b>Titulo Pregunta:</b><br /><textarea name='titulo_pregunta'><?= stripslashes($row['titulo_pregunta']) ?></textarea> 
<p><b>Texto 1:</b><br /><textarea name='texto_1'><?= stripslashes($row['texto_1']) ?></textarea> 
<p><b>Texto 2:</b><br /><textarea name='texto_2'><?= stripslashes($row['texto_2']) ?></textarea> 
<p><b>Texto 3:</b><br /><textarea name='texto_3'><?= stripslashes($row['texto_3']) ?></textarea> 
<p><b>Imagen 1:</b><br /><textarea name='imagen_1'><?= stripslashes($row['imagen_1']) ?></textarea> 
<p><b>Imagen 2:</b><br /><textarea name='imagen_2'><?= stripslashes($row['imagen_2']) ?></textarea> 
<p><b>Respuesta A:</b><br /><textarea name='respuesta_a'><?= stripslashes($row['respuesta_a']) ?></textarea> 
<p><b>Respuesta B:</b><br /><textarea name='respuesta_b'><?= stripslashes($row['respuesta_b']) ?></textarea> 
<p><b>Respuesta C:</b><br /><textarea name='respuesta_c'><?= stripslashes($row['respuesta_c']) ?></textarea> 
<p><b>Respuesta D:</b><br /><textarea name='respuesta_d'><?= stripslashes($row['respuesta_d']) ?></textarea> 
<p><b>Respuesta Correcta:</b><br /><textarea name='respuesta_correcta'><?= stripslashes($row['respuesta_correcta']) ?></textarea> 
<p><b>Tipo Pregunta:</b><br /><input type='text' name='tipo_pregunta' value='<?= stripslashes($row['tipo_pregunta']) ?>' /> 
<p><input type='submit' value='Edit Row' /><input type='hidden' value='1' name='submitted' /> 
</form> 
<? } ?> 
