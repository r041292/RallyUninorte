<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<link rel="stylesheet" href="f/css/normalize.css">
	<link rel="stylesheet" href="f/css/foundation.css">
</head>
<body>
<h1>Pista</h1>
<? 

session_start();
if(!$_SESSION['shouldPass']){
	header("Location: http://uninorterally1.hol.es");
    exit;
}

include('../connection.php'); 
echo "<table border=1 >"; 
echo "<tr>"; 
echo "<td><b>Id Pista</b></td>"; 
echo "<td><b>Pista</b></td>"; 
echo "<td><b>Id Lugar</b></td>"; 
echo "</tr>"; 
$result = mysql_query("SELECT * FROM `Pista`") or trigger_error(mysql_error()); 
while($row = mysql_fetch_array($result)){ 
foreach($row AS $key => $value) { $row[$key] = stripslashes($value); } 
echo "<tr>";  
echo "<td valign='top'>" . nl2br( $row['id_pista']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['pista']) . "</td>";  
echo "<td valign='top'>" . nl2br( $row['id_lugar']) . "</td>";  
//echo "<td valign='top'><a href=edit_pista.php?id_pista={$row['id_pista']}>Edit</a></td><td><a href=delete_pista.php?id_pista={$row['id_pista']}>Delete</a></td> "; 
echo "<td valign='top'><a href=edit_pista.php?id_pista={$row['id_pista']}>Edit</a></td>";
echo "</tr>"; 
} 
echo "</table>"; 
//echo "<a class='button' href=new_pista.php>New Row</a>"; 
?>

</body>
</html>