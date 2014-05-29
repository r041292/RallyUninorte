<?php

	include("conection.php"); 
	$numpregunta=0;
	$nivelpregunta=0;

	if(isset($_GET['numpregunta'])){
		$numpregunta= $_GET[numpista];
	}else{
		$numpregunta = rand(1,75);
	}

	if(isset($_GET['nivelpregunta'])){
		$nivelpregunta= $_GET[nivelpregunta];
		switch ($nivelpregunta) {
			case 1: $numpregunta = rand(1,7); break;
			case 2: $numpregunta = rand(8,24); break;
			case 3: $numpregunta = rand(25,52); break;
			case 4: $numpregunta = rand(53,65); break;
			case 5: $numpregunta = rand(66,75); break;
			
		}
	}else{
		$numpregunta = rand(1,75);
	}

	$query ="SELECT * FROM Pregunta WHERE id_pregunta = $numpregunta;";
	//echo $query;
	$result = mysql_query($query) or die(mysql_error());
	$info = array(); 
	while($preguntainfo = mysql_fetch_array($result)){
		$info["id_pregunta"] = $preguntainfo["id_pregunta"];
		$info["num_pregunta"] = $preguntainfo["num_pregunta"];
		$info["nivel_pregunta"] = $preguntainfo["nivel_pregunta"]; 
		$info["titulo_pregunta"] = $preguntainfo["titulo_pregunta"]; 
		$info["texto_1"] = $preguntainfo["texto_1"];
		$info["texto_2"] = $preguntainfo["texto_2"];
		$info["texto_3"] = $preguntainfo["texto_3"];
		$info["imagen_1"] = $preguntainfo["imagen_1"];
		$info["imagen_2"] = $preguntainfo["imagen_2"];
		$info["respuesta_a"] = $preguntainfo["respuesta_a"];
		$info["respuesta_b"] = $preguntainfo["respuesta_b"];
		$info["respuesta_c"] = $preguntainfo["respuesta_c"];
		$info["respuesta_d"] = $preguntainfo["respuesta_d"];
		$info["respuesta_correcta"] = $preguntainfo["respuesta_correcta"];
	}

	echo json_encode($info);

?>