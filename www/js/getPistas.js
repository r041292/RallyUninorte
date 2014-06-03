var PistaLat;
var PistaLong;
var idGrupo=localStorage.getItem("idGrupo");
var jugadoresArray = JSON.parse(localStorage.getItem("jugadoresArray"));
var numJugadores = jugadoresArray.length;
var ordenTurno = new Array();
var turnoJugador = -1;
var ronda = 1;
var level = 1;
var fin = false;
var clock=0;
var clockInterval;
var online = navigator.onLine;
var d = new Date();
var checkConection_temp;

//generar fecha
Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };

//desbilitar back button
document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false );
}

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
  startClock();
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function checkConection(){
  $.ajax({  //create an ajax request
    type: "GET",
    url: "http://uninorterally1.hol.es/scriptBobo.php",             
    dataType: "html",   //expect html to be returned                
    success: function(response){                    
        checkConection_temp = true;
    },async:   false
  }).fail(function() {
    checkConection_temp = false;
  }); 
}

function showPista(){
  checkConection();
  var primerintento=true;
  var contador_intentos=1;
  while(checkConection_temp==false){
    sleep(3000);
    checkConection();
    console.log(checkConection_temp);
      if(primerintento){
        primerintento=false;
        alert("Tu conexión a internet esta fallando, favor verificar, cada 3 segundos la aplicacion verificara de nuevo.");
      }
      contador_intentos+=1;
  }

  if(contador_intentos==100){
      alert("Lo siento, el juego se reiniciara");
      window.location.replace("index.html");
  }

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
  }).fail(function() {
    alert( "Verifique su conexión a internet." );
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
        $('#nivel_pregunta').html("TURNO: "+turnoJugador+" Nombre: "+jugadoresArray[turnoJugador].nombre+" RONDA: "+ronda+" LEVEL: "+level);

        //Variable para verificacion de respuesta. Elias la usa
        correcta=(pregunta.respuesta_correcta);
        nivelPreguntaActual = pregunta.nivel_pregunta;  
        numPreguntaActual = pregunta.num_pregunta;
      }
    });
  }else {

    $('#nivel_pregunta').html("JUEGO TERMINADO!");

  }
} 

function enviarRespuesta(codigo_est, nombre_est, fecha, hora, grupo_est, nivel_pregunta, num_pregunta, tiempo_respuesta, puntos_pregunta){
  $.ajax({  
      type: "GET",
      url: "http://uninorterally1.hol.es/getEnviarRespuesta.php?codigo_est="+codigo_est+"&fecha="+fecha+"&hora="+hora+"&nombre_est="+nombre_est+"&grupo_est="+grupo_est+"&nivel_pregunta="+nivel_pregunta+"&num_pregunta="+num_pregunta+"&tiempo_respuesta="+tiempo_respuesta+"&puntos_pregunta="+puntos_pregunta,
      dataType: "html",   //expect html to be returned                
      success: function(response){                    
        var respuesta = response;
          if(respuesta=="ok"){
            console.log("Resultados enviados para jugador: "+nombre_est);
          }else{
            console.log("Error al enviar los resultados");
          }
      }


  });
}

function generarTurno() {
  console.log("Ronda: "+ronda);
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
var tiempoRespuesta;
var nivelPreguntaActual;
var numPreguntaActual;
var numeroRondas= 5;
var puntosPasados = new Array(numero_jugadores);
var arrayNuevo = new Array(numero_jugadores);
var largo = (numero_jugadores + 1);
var puntos = new Array(numero_jugadores);
        
for ( var l = 0; l < numJugadores; l++) {
  puntos[l]= 0;
  puntosPasados[l]= 0;
}

var rondaActual = 1;
var presionoA = true;
var presionoB = true;
var presionoC = true;
var presionoD = true;


//AQUI COMIENZA EL DESMADRE__________________________________________________________________________________-
function verificar(respuesta) {
  checkConection();
  if(checkConection_temp==true){
    if(correcta==respuesta) {
      alert("Respuesta Correcta para el jugador: "+turnoJugador+"");
      tiempoRespuesta = clock;
      //console.log("Tiempo de respuesta: "+ tiempoRespuesta);
      stopClock();

      
      enviarRespuesta(jugadoresArray[turnoJugador].codigo,jugadoresArray[turnoJugador].nombre,d.yyyymmdd(),d.getHours(),idGrupo,nivelPreguntaActual, numPreguntaActual, tiempoRespuesta, (puntos[turnoJugador]+1));

      if(ordenTurno.length!=0) {
        puntos[turnoJugador] = (puntos[turnoJugador] + 1) ;
        presionoA = true;
        presionoB = true;
        presionoC = true;
        presionoD = true;
        showPregunta();
        startClock();
      }else {//Respuesta correcta y es el ultimo jugador
        puntos[turnoJugador] = (puntos[turnoJugador] + 1) ;
        alert("Ya han participado los: "+numJugadores+" jugadores. SIGUIENTE PISTA! :)");

        //Puntos sumados en cada ronda
        var s = "";
        for (var i = 0; i < numJugadores; i++) {
          s += puntos[i]+"  ";
        }
        //alert("PUNTOS TOTAL: "+s);

        s = "";
        for (var i = 0; i < numJugadores; i++) {
          s += puntos[i] - puntosPasados[i]+"  ";
          puntosPasados[i] = puntos[i];
        }
        //alert("PUNTOS EN LA RONDA: "+s);
       
        presionoA = true;
        presionoB = true;
        presionoC = true;
        presionoD = true;
        clearPregunta();
        
        setTimeout(f, 2000);
        $.mobile.navigate("#pageone", {transition: "slide"});

        if (ronda==5){
          $.ajax({  //create an ajax request
            type: "GET",
            url: "http://uninorterally1.hol.es/sendMail.php?grupo="+idGrupo,             
            dataType: "html",   //expect html to be returned                
            success: function(){                    
              var resultados_string="";
              alert("YA PASARON LAS 5 RONDAS. SE HA TERMINADO EL JUEGO");
              for(var i=0;i < numJugadores; i++){
                resultados_string+="El Puntaje para el jugador #"+(i)+" "+jugadoresArray[i].nombre+" es "+puntos[i]+"<br>";
              }
              $('#game_finished').html(resultados_string);
              $.mobile.navigate("#pagethree", {transition: "slide"});
            }
          }).fail(function(){
            alert("Verifique su conexión a internet.");
          });
        }else{
          showPista();
          numeroRondas--;
        }
      }
    }else{//Respuesta Incorrecta
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
}else{
  alert("No hay conexión a internet");
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


//Cronometro
function startClock(){
  clockInterval = setInterval(OneSecondPassed, 1000);
}

function stopClock(){
  clearInterval(window.clockInterval);
}

function OneSecondPassed(){
  clock+=1;
}


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
  var options = { timeout: 10000 };
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
/*

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
*/