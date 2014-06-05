<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="f/css/normalize.css">
	<link rel="stylesheet" href="f/css/foundation.css">
</head>
<body>
<h1>Resultados</h1>
<? 
include('config.php'); 
echo "<table border=1 >"; 
echo "<tr>"; 
echo "<td><b>Id Resultado</b></td>"; 
echo "<td><b>Fecha</b></td>"; 
echo "<td><b>Hora</b></td>"; 
echo "<td><b>Codigo Est</b></td>"; 
echo "<td><b>Nombre Est</b></td>"; 
echo "<td><b>Grupo Est</b></td>"; 
echo "<td><b>Nivel Pregunta</b></td>"; 
echo "<td><b>Numero Pregunta</b></td>"; 
echo "<td><b>Tiempo Respuesta</b></td>"; 
echo "<td><b>Puntos Pregunta</b></td>"; 
echo "</tr>"; 
$result = mysql_query("SELECT * FROM `Resultados`") or trigger_error(mysql_error()); 
while($row = mysql_fetch_array($result)){ 
foreach($row AS $key => $value) { $row[$key] = stripslashes($value); } 
echo "<tr>";  
echo "<td valign='top'>" . nl2br( $row['id_resultado']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['fecha']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['hora']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['codigo_est']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['nombre_est']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['grupo_est']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['nivel_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['numero_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['tiempo_respuesta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['puntos_pregunta']) . "</td>";  
echo "<td valign='top'><a href=edit_resultados.php?id_resultado={$row['id_resultado']}>Edit</a></td><td><a href=delete_resultados.php?id_resultado={$row['id_resultado']}>Delete</a></td> "; 
echo "</tr>"; 
} 
echo "</table>"; 
echo "<a class='button' href=new_resultados.php>New Row</a>"; 
?>
</body>
</html>