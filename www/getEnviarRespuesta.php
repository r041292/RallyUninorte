<?php
	include("connection.php"); 
	$codigo_est=0;
	$fecha="";
	$hora="";
	$nombre_est="";
	$grupo_est="";
	$nivel_pregunta=0;
	$num_pregunta=0;
	$tiempo_respuesta="";
	$puntos_pregunta=0;



	if(isset($_GET['codigo_est']) && isset($_GET['nombre_est']) && isset($_GET['fecha']) && isset($_GET['hora']) && isset($_GET['nivel_pregunta']) && isset($_GET['num_pregunta']) && isset($_GET['tiempo_respuesta']) && isset($_GET['puntos_pregunta']) && isset($_GET['grupo_est']) ){
		$codigo_est=$_GET[codigo_est];
		$nombre_est=$_GET[nombre_est];
		$fecha=$_GET[fecha];
		$hora=$_GET[hora];
		$grupo_est=$_GET[grupo_est];
		$nivel_pregunta=$_GET[nivel_pregunta];
		$num_pregunta=$_GET[num_pregunta];
		$tiempo_respuesta=$_GET[tiempo_respuesta];
		$puntos_pregunta=$_GET[puntos_pregunta];
		

		$query ="INSERT INTO `u927820083_db`.`Resultados` (`id_resultado`,`codigo_est`, `fecha`, `hora`, `nombre_est`,`grupo_est`, `nivel_pregunta`, `numero_pregunta`, `tiempo_respuesta`, `puntos_pregunta`) VALUES (NULL, '$codigo_est','$fecha','$hora', '$nombre_est','$grupo_est', '$nivel_pregunta', '$num_pregunta', '$tiempo_respuesta', '$puntos_pregunta');";
	    //echo $query;
		$result = mysql_query($query) or die(mysql_error());
		echo "ok";

	}else{
		echo "error";
	}

	
?>