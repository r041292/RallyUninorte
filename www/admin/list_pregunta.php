<? 
include('config.php'); 
echo "<table border=1 >"; 
echo "<tr>"; 
echo "<td><b>Id Pregunta</b></td>"; 
echo "<td><b>Num Pregunta</b></td>"; 
echo "<td><b>Nivel Pregunta</b></td>"; 
echo "<td><b>Titulo Pregunta</b></td>"; 
echo "<td><b>Texto 1</b></td>"; 
echo "<td><b>Texto 2</b></td>"; 
echo "<td><b>Texto 3</b></td>"; 
echo "<td><b>Imagen 1</b></td>"; 
echo "<td><b>Imagen 2</b></td>"; 
echo "<td><b>Respuesta A</b></td>"; 
echo "<td><b>Respuesta B</b></td>"; 
echo "<td><b>Respuesta C</b></td>"; 
echo "<td><b>Respuesta D</b></td>"; 
echo "<td><b>Respuesta Correcta</b></td>"; 
echo "<td><b>Tipo Pregunta</b></td>"; 
echo "</tr>"; 
$result = mysql_query("SELECT * FROM `Pregunta`") or trigger_error(mysql_error()); 
while($row = mysql_fetch_array($result)){ 
foreach($row AS $key => $value) { $row[$key] = stripslashes($value); } 
echo "<tr>";  
echo "<td valign='top'>" . nl2br( $row['id_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['num_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['nivel_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['titulo_pregunta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['texto_1']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['texto_2']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['texto_3']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['imagen_1']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['imagen_2']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['respuesta_a']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['respuesta_b']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['respuesta_c']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['respuesta_d']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['respuesta_correcta']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['tipo_pregunta']) . "</td>";  
echo "<td valign='top'><a href=edit_pregunta.php?id_pregunta={$row['id_pregunta']}>Edit</a></td><td><a href=delete_pregunta.php?id_pregunta={$row['id_pregunta']}>Delete</a></td> "; 
echo "</tr>"; 
} 
echo "</table>"; 
echo "<a href=new_pregunta.php>New Row</a>"; 
?>