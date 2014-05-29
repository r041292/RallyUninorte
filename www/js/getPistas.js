var PistaLat;
var PistaLong;
var jugadoresArray = JSON.parse(localStorage.getItem("jugadoresArray"));
var numJugadores = jugadoresArray.length;
var ordenTurno = new Array();
var turnoJugador = -1;
var ronda = 1;
var level = 1;
var fin = false;

window.onload = function(){
	showPista();
  for (var i = 0; i < numJugadores; i++) {
    ordenTurno[i] = i;
  }
}

$('#llegue').click(function(){
	showPista();
  clearPregunta();
  showPregunta();
})

$('#botonpista').click(function(){
  showPista();
  clearPregunta();
  showPregunta();
})

function clearPregunta(){
  $('#titulo_pregunta').html("");
  $('#texto1_pregunta').html("");
  $('#texto2_pregunta').html("");
  $('#texto3_pregunta').html("");
  $('#imagen1_pregunta').html("");
  $('#imagen2_pregunta').html("");
  $('#repuesta_a_pregunta').html("");
  $('#repuesta_b_pregunta').html("");
  $('#repuesta_c_pregunta').html("");
  $('#repuesta_d_pregunta').html("");
  $('#repuesta_correcta_pregunta').html("");
  $('#nivel_pregunta').html("");
}

function showPista(){
  $.ajax({  //create an ajax request
    type: "GET",
    url: "http://uninorterally1.hol.es/getPista_Lugar.php",             
    dataType: "html",   //expect html to be returned                
    success: function(response){                    
      //alert(response);      
      var pista = jQuery.parseJSON(response);
      $('#hidden_content1').html(pista.pista);
      PistaLat = pista.lat;
      PistaLong = pista.long;
    }
  }); 
}

function showPregunta(){
  generarTurno();
  generarNivel();
  if (!fin) {
    $.ajax({  //create an ajax request to load_page.php
      type: "GET",
      url: "http://uninorterally1.hol.es/getPregunta.php?nivelpregunta="+level,             
      dataType: "html",   //expect html to be returned                
      success: function(response){                    
        //alert(response);
        var pregunta = jQuery.parseJSON( response );
        //alert( pregunta.texto_1 );
        $('#titulo_pregunta').html(pregunta.titulo_pregunta);
        $('#texto1_pregunta').html(pregunta.texto_1);
        $('#texto2_pregunta').html(pregunta.texto_2);
        $('#texto3_pregunta').html(pregunta.texto_3);
        if(pregunta.imagen_1!=null) {
          $('#imagen1_pregunta').html("<img src=img/"+pregunta.imagen_1+">");
        }
        if(pregunta.imagen_2!=null) {
          $('#imagen2_pregunta').html("<img src=img/"+pregunta.imagen_2+">");
        }
        $('#repuesta_a_pregunta').html("A. "+pregunta.respuesta_a);
        $('#repuesta_b_pregunta').html("B. "+pregunta.respuesta_b);
        $('#repuesta_c_pregunta').html("C. "+pregunta.respuesta_c);
        $('#repuesta_d_pregunta').html("D. "+pregunta.respuesta_d);
        $('#repuesta_correcta_pregunta').html(pregunta.respuesta_correcta);
        $('#nivel_pregunta').html("TURNO: "+turnoJugador+"Nombre: "+jugadoresArray[turnoJugador].nombre+" RONDA: "+ronda+" LEVEL: "+level);

        //Variable para verificacion de respuesta. Elias la usa
        correcta=(pregunta.respuesta_correcta);
      }
    });
  }else {
    $('#nivel_pregunta').html("JUEGO TERMINADO!");
  }
} 

function enviarRespuesta(codigo_est, nombre_est, nivel_pregunta, num_pregunta, titulo_pregunta, puntos_pregunta){
  $.ajax({  
      type: "GET",
      url: "http://uninorterally1.hol.es/getEnviarRespuesta.php?codigo_est="+codigo_est+"&nombre_est="+nombre_est+"&nivel_pregunta="+nivel_pregunta+"&num_pregunta="+num_pregunta+"&tiempo_respuesta="+tiempo_respuesta+"&puntos_pregunta="+puntos_pregunta;
      dataType: "html",   //expect html to be returned                
      success: function(response){                    
        var respuesta = jQuery.parseJSON(response);
          if(respuesta=="ok"){
            //Resultados enviados : )
          }else{
            //Error al enviar los resultados
          }
      }


  });
}

function generarTurno() {
  console.log(ronda);
  if (ronda < 6 ) {
    if(!(ronda == 5 && ordenTurno.length == 0)){
      if(ordenTurno.length == 0) { //Si faltan usuarios por jugar la ronda
        //jugadoresArray[turnoTemp].preguntas[ronda] = false;
        ronda+=1;
        for (var i = 0; i < numJugadores; i++) {
          ordenTurno[i] = i;  
        }
      }
      var turnoTemp = Math.floor((Math.random() * ordenTurno.length)); // Numero del jugador en turno
      turnoJugador = ordenTurno[turnoTemp];
      ordenTurno.splice(turnoTemp, 1);
    }else{
      fin = true;
    }
  }else {
    fin = true;
  }
}

function generarNivel() {
  var levelTemp = Math.floor((Math.random() * jugadoresArray[turnoJugador].preguntas.length)); // Numero del jugador en turno
  level = jugadoresArray[turnoJugador].preguntas[levelTemp];
  jugadoresArray[turnoJugador].preguntas.splice(levelTemp, 1);
}

//Seccion de preguntas - Elias //

//B¡VARIABLES NECESARIAS PARA VARIAS COSAS____________________________________________________-
var correcta;
var numero_jugadores=numJugadores;
var i=1;

var numeroRondas= 5;
var arrayViejo = new Array(numero_jugadores);
var arrayNuevo = new Array(numero_jugadores);
var largo = (numero_jugadores + 1);

for ( var l = 1; l < largo; l++) {
  arrayViejo[l]= 0;
}

var puntos = new Array(numero_jugadores);
        
for ( var l = 0; l < numJugadores; l++) {
  puntos[l]= 0;
}

var rondaActual = 1;
var multidimencional = new Array(new Array (0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0));
var presionoA = true;
var presionoB = true;
var presionoC = true;
var presionoD = true;


//AQUI COMIENZA EL DESMADRE__________________________________________________________________________________-
function verificar(respuesta) {
  if(correcta==respuesta) {
    alert("Respuesta Correcta para el jugador: "+turnoJugador+"");

    if(ordenTurno.length!=0) {
      puntos[turnoJugador] = (puntos[turnoJugador] + 1) ;
      presionoA = true;
      presionoB = true;
      presionoC = true;
      presionoD = true;
      showPregunta();
    }else {//ESTO SUCEDE SI LA RESPUESTA ES CORRECTA Y ADEMAS ES EL ULTIMO JUGADOR____________________________________________
      puntos[turnoJugador] = (puntos[turnoJugador] + 1) ;
      alert("Ya han participado los: "+numJugadores+" jugadores. SIGUIENTE PISTA! :)");

      //Puntos sumados en cada ronda
      var s = "";
      for (var i = 0; i < numJugadores; i++) {
        s += puntos[i]+"  ";
      }
      alert("PUNTOS TOTAL: "+s);        
      /*
      for ( var j = 1; j < largo; j++) {
        arrayNuevo[j] = puntos[j] - arrayViejo[j];
      }

      for ( var p = 1; p < largo; p++) {
        arrayViejo[p] = puntos[p];      
      }

      //Puntos por cada ronda
      alert("Puntos conseguidos en la ronda: "+arrayNuevo[1]+","+arrayNuevo[2]+","+arrayNuevo[3]+","+arrayNuevo[4]+".");
      
      for(s=0; s<numero_jugadores; s++) {
        multidimencional[rondaActual-1][s]=arrayNuevo[s+1];
      }

      alert(""+multidimencional[0]+"___"+multidimencional[1]+"___"+multidimencional[2]+"");
      rondaActual= rondaActual + 1;
      //alert(rondaActual);*/

      presionoA = true;
      presionoB = true;
      presionoC = true;
      presionoD = true;
      clearPregunta();
      
      setTimeout(f, 2000);
      $.mobile.navigate("#pageone", {transition: "slide"});

      if (ronda==5){
        alert("YA PASARON LAS X RONDAS. SE HA TERMINADO");
        window.location.replace("index.html");
      }else{
        showPista();
      }
      numeroRondas--;
    }
  }else{//A PARTIR DE AQUI SOLO SUCEDE SI LA RESPUESTA QUE DIO EL WEY ES INCORRECTA_________________________________________
    if(respuesta == "a") {
      if(presionoA == false) {
        alert("Ya intentaste con esa respuesta.");
      }else {
        presionoA = false;
        alert("Respuesta Incorrecta para el jugador: "+turnoJugador+"");
        puntos[turnoJugador] = (puntos[turnoJugador] - 1) ;
      } 
    }
    
    if(respuesta == "b") {
      if (presionoB == false) {
        alert("Ya intentaste con esa respuesta");
      }else {
        presionoB = false;
        alert("Respuesta Incorrecta para el jugador: "+turnoJugador+"");
        puntos[turnoJugador] = (puntos[turnoJugador] - 1) ;
      } 
    }

    if(respuesta == "c") {
      if (presionoC == false) {
        alert("Ya intentaste con esa respuesta");
      }else {
        presionoC = false;
        alert("Respuesta Incorrecta para el jugador: "+turnoJugador+"");
        puntos[turnoJugador] = (puntos[turnoJugador] - 1) ;
      } 
    }

    if(respuesta == "d") {
      if (presionoD == false) {
        alert("Ya intentaste con esa respuesta");
      }else {
        presionoD = false;
        alert("Respuesta Incorrecta para el jugador: "+turnoJugador+"");
        puntos[turnoJugador] = (puntos[turnoJugador] - 1) ;
      } 
    }
  }
}

$('#repuesta_a_pregunta').click(function(){
  verificar("a");
})

$('#repuesta_b_pregunta').click(function(){
  verificar("b");

})
$('#repuesta_c_pregunta').click(function(){
  verificar("c");

})
$('#repuesta_d_pregunta').click(function(){
  verificar("d");
})


//MAP JS

var map;
var pos;
var marcador;
var watchID = null;

function initialize() {
  var mapOptions = {
    zoom: 17
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(pos);

        var infowindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Your position'
        });

        map.setCenter(pos);
        }, 
      function() {
        handleNoGeolocation(true);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }

  marcador = new google.maps.Marker( {
    position: pos,
    map:map
  });

  //Location Changed
  var options = { timeout: 2000 };
  watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
  setTimeout(f, 1000);
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  }else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  $('#botonmapa').click(function(){
    //setTimeout(resetMap(map),30000);  
    setTimeout(f, 1000);
  })

  function resetMap(m) {
    x = m.getZoom();
    c = m.getCenter();
    //alert(m.getCenter()); 
    google.maps.event.trigger(m, 'resize');
    m.setZoom(x);
    m.setCenter(c);
  }

  function f() {
    resetMap(map);
  }

  function onSuccess(ubicacion){
    var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
    pos = miubicacion;
    var miLat=ubicacion.coords.latitude;
    var miLong=ubicacion.coords.longitude;
    var rangoLugar =  0.0002;
    //alert(pos);
    map.setCenter(miubicacion);
    marcador.setPosition(miubicacion);
    if((((PistaLat-rangoLugar) < miLat)&&(miLat < (PistaLat + rangoLugar))) &&
        (((PistaLong+rangoLugar) > miLong)&&(miLong > (PistaLong-rangoLugar)))){
      //cargar ciclo de preguntas
    }
  } 

  function onError(){
    alert("No puedo encontrarte :(");
  }

//Hammer -- pinch to zoom  //

if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
   Hammer.plugins.showTouches();
}

if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
   Hammer.plugins.fakeMultitouch();
}

var hammertime = Hammer(document.getElementById('zoomwrapper1'), {
    transform_always_block: false,
    transform_min_scale: 0.5,
    drag_block_horizontal: false,
    drag_block_vertical: false,
    drag_min_distance: 0
  });

var elemRect;
var posX=0, posY=0,
lastPosX=0, lastPosY=0,
bufferX=0, bufferY=0,
scale=1, last_scale,
rotation= 1, last_rotation, dragReady=0;

hammertime.on('touch drag dragend transform', function(ev) {
    elemRect = document.getElementById('imagen1_pregunta');
    manageMultitouch(ev);
  });

function manageMultitouch(ev){
  switch(ev.type) {
    case 'touch':
      last_scale = scale;
      last_rotation = rotation;
      break;
    
    case 'drag':
      posX = ev.gesture.deltaX + lastPosX;
      posY = ev.gesture.deltaY + lastPosY;
      break;

    case 'transform':
      rotation = last_rotation + ev.gesture.rotation;
      scale = Math.max(1, Math.min(last_scale * ev.gesture.scale, 5));
      break;

    case 'dragend':
      lastPosX = posX;
      lastPosY = posY;
      break;
  }

  var transform =
    "translate3d("+0+"px,"+0+"px, 0) " +
    "scale3d("+scale+","+scale+", 0) " +
    "rotate("+0+"deg) ";

  elemRect.style.transform = transform;
  elemRect.style.oTransform = transform;
  elemRect.style.msTransform = transform;
  elemRect.style.mozTransform = transform;
  elemRect.style.webkitTransform = transform;
}