<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="f/css/normalize.css">
	<link rel="stylesheet" href="f/css/foundation.css">
</head>
<body>
<h1>Lugar</h1>
<? 

try
{
	session_start();
	if(!$_SESSION['shouldPass']){
		header("Location: http://uninorterally1.hol.es");
	    exit;
	}

}
catch (Exception $e)
{ header("Location: http://uninorterally1.hol.es");}


include('config.php'); 
echo "<table border=1 >"; 
echo "<tr>"; 
echo "<td><b>Id Lugar</b></td>"; 
echo "<td><b>Nombre Lugar</b></td>"; 
echo "<td><b>Lat</b></td>"; 
echo "<td><b>Long</b></td>"; 
echo "<td><b>Alt</b></td>"; 
echo "</tr>"; 
$result = mysql_query("SELECT * FROM `Lugar`") or trigger_error(mysql_error()); 
while($row = mysql_fetch_array($result)){ 
foreach($row AS $key => $value) { $row[$key] = stripslashes($value); } 
echo "<tr>";  
echo "<td valign='top'>" . nl2br( $row['id_lugar']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['nombre_lugar']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['lat']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['long']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['alt']) . "</td>";  
//echo "<td valign='top'><a href=edit_lugar.php?id_lugar={$row['id_lugar']}>Edit</a></td><td><a href=delete_lugar.php?id_lugar={$row['id_lugar']}>Delete</a></td> "; 
echo "<td valign='top'><a href=edit_lugar.php?id_lugar={$row['id_lugar']}>Edit</a></td>";
echo "</tr>"; 
} 
echo "</table>"; 
//echo "<a class='button' href=new_lugar.php>New Row</a>"; 
?>
</body>
</html>