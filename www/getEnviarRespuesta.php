<?php
	include("conection.php"); 
	$codigo_est=0;
	$nombre_est="";
	$nivel_pregunta=0;
	$num_pregunta=0;
	$tiempo_respuesta="";
	$puntos_pregunta=0;


	if(isset($_GET['codigo_est']) && isset($_GET['nombre_est']) && isset($_GET['nivel_pregunta']) && isset($_GET['num_pregunta']) && isset($_GET['tiempo_respuesta']) && isset($_GET['puntos_pregunta']) ){
		$codigo_est=$_GET[codigo_est];
		$nombre_est=$_GET[nombre_est];
		$nivel_pregunta=$_GET[nivel_pregunta];
		$num_pregunta=$_GET[num_pregunta];
		$tiempo_respuesta=$_GET[tiempo_respuesta];
		$puntos_pregunta=$_GET[puntos_pregunta];


		$query ="SELECT * FROM Pregunta WHERE id_pregunta = $numpregunta;";
		$query ="INSERT INTO `u927820083_db`.`Resultados` (`id_resultado`, `codigo_est`, `nombre_est`, `nivel_pregunta`, `numero_pregunta`, `tiempo_respuesta`, `puntos_pregunta`) VALUES (NULL, '$codigo_est', '$nombre_est', '$nivel_pregunta', '$num_pregunta', '$tiempo_respuesta', '$puntos_pregunta');";
	    //echo $query;
		$result = mysql_query($query) or die(mysql_error());
		echo "ok";

	}else{
		echo "error";
	}

	
?>