<?php 
	include("connection.php"); 
	$numpista=0;
	if(isset($_GET['numpista'])){
		$numpista= $_GET[numpista];
	}else{
		$numpista = rand(1,15);
	}

	$query ="SELECT * FROM Pista WHERE id_pista = $numpista;"; 
	//echo $query;
	$result = mysql_query($query) or die(mysql_error());
	$info = array(); 
	while($pistainfo = mysql_fetch_array($result)){
	$info["id_pista"] = $pistainfo["id_pista"];
	$info["pista"] = $pistainfo["pista"];
	$info["id_lugar"] = $pistainfo["id_lugar"]; 
	}

	$temp = array(); 
	$temp["pista"]=$info["pista"];
	//echo "lugar: "+$info["id_lugar"]+"<br>"; 
	//echo "Pista: " .$temp["pista"] . "<br>" ;
	$tempLugar = $info["id_lugar"];

	$query ="SELECT * FROM Lugar WHERE id_lugar = $tempLugar;"; 
	$result = mysql_query($query) or die(mysql_error());
	$info2 = array();
	while($lugarinfo = mysql_fetch_array($result)){
	$info2["id_lugar"] = $lugarinfo["id_lugar"];
	$info2["nombre_lugar"] = $lugarinfo["nombre_lugar"];
	$info2["lat"] = $lugarinfo["lat"]; 
	$info2["long"] = $lugarinfo["long"]; 
	}

	//echo $info2["lat"]." , ".$info2["long"];
	$temp["lat"] = $info2["lat"];
	$temp["long"] = $info2["long"];

	echo json_encode($temp);
	
?>