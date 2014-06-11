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
var isPlaying = false;
var pistss = new Array(5);
var pisTotal = new Array(15);
var baseUrl = "http://uninorterally1.hol.es/";

//var para spinner
var spinner_pista;
var spinner_pregunta;
var spinner_resultados;
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

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

// alert dialog dismissed
function alertDismissed() {
  // do nothing
}

window.onload = function(){
  //instalacion de spinner
  var target = document.getElementById('spin_pista');
  spinner_pista = new Spinner(opts).spin(target);
  target = document.getElementById('spin_pregunta');
  spinner_pregunta = new Spinner(opts).spin(target);
  target = document.getElementById('spin_resultados');
  spinner_resultados = new Spinner(opts).spin(target);

  //No se repiten las pistas
  for (var i = 0; i < 15; i++) {
    pisTotal[i] = i+1;
  }

  for (var i = 0; i < 5; i++) {
    var t = Math.floor((Math.random() * pisTotal.length));
    pistss[i] = pisTotal[t];
    pisTotal.splice(t, 1);
  }

  showPista();
  for (var i = 0; i < numJugadores; i++) {
    ordenTurno[i] = i;
  }
}

$('#botonpista').click(function(){
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

function playAudio(src) {
  document.getElementById("ogg").play();
}
 
function success() {
  // ignore
}
 
function error_error(e) {
  alert('great error');
  alert(e.message);
}

function checkConection(){
  $.ajax({  //create an ajax request
    type: "GET",
    url: baseUrl+"checkConnection.php",             
    dataType: "html",   //expect html to be returned                
    success: function(response){                    
        checkConection_temp = true;
    },async:   false
  }).fail(function() {
    checkConection_temp = false;
  }); 
}

function showPista(){
  console.log(pistss);
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

  $.ajax({  //create an ajax request
    type: "GET",
    url: baseUrl+"getPista_Lugar.php?numpista="+pistss[0],             
    dataType: "html",   //expect html to be returned                
    success: function(response){                    
      //alert(response);      
      var pista = jQuery.parseJSON(response);
      $('#hidden_content1').html(pista.pista);
      PistaLat = parseFloat(pista.lat);
      PistaLong = parseFloat(pista.long);

      var rangoLugar =  0.0002;
      pistss.splice(0, 1);

      //detener spinner
      spinner_pista.stop();
      /*
      marcador2 = new google.maps.Marker( {
        position: new google.maps.LatLng(PistaLat, PistaLong),
        map:map
      });

      marcador3 = new google.maps.InfoWindow( {
        position: new google.maps.LatLng(PistaLat-rangoLugar, PistaLong),
         content: 'Your position1',
        map:map
      });


      marcador4 = new google.maps.InfoWindow( {
        position: new google.maps.LatLng(PistaLat+rangoLugar, PistaLong),
         content: 'Your position2',
        map:map
      });


      marcador5 = new google.maps.InfoWindow( {
        position: new google.maps.LatLng(PistaLat, PistaLong+rangoLugar),
         content: 'Your position3',
        map:map
      });


      marcador6 = new google.maps.InfoWindow( {
        position: new google.maps.LatLng(PistaLat, PistaLong-rangoLugar),
         content: 'Your position4',
        map:map
      });

      */
      //$('#destino').html('Destino: Lat: '+PistaLat+'  Long: '+PistaLong);
      //console.log("LAT-"+(PistaLat-rangoLugar) +"\nLAT+"+(PistaLat+rangoLugar)+"\nLONG+"+(PistaLong+rangoLugar)+"\nLONG-"+(PistaLong-rangoLugar));
    }
  }).fail(function() {
    alert( "Verifique su conexión a internet." );
  });
}

function showPregunta(){
  generarTurno();
  generarNivel();
  if (!fin) {
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

    $.ajax({  //create an ajax request to load_page.php
      type: "GET",
      url: baseUrl+"getPregunta.php?nivelpregunta="+level,             
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
        showRespuestas();

        $('#repuesta_correcta_pregunta').html(pregunta.respuesta_correcta);
        $('#nivel_pregunta').html("TURNO: "+turnoJugador+" Nombre: "+jugadoresArray[turnoJugador].nombre+" RONDA: "+ronda+" LEVEL: "+level);

        //Variable para verificacion de respuesta.
        correcta=(pregunta.respuesta_correcta);
        nivelPreguntaActual = pregunta.nivel_pregunta;  
        numPreguntaActual = pregunta.num_pregunta;

        //detener spinner

        spinner_pregunta.stop();
      }
    });
  }else {

    $('#nivel_pregunta').html("JUEGO TERMINADO!");

  }
}

function enviarRespuesta(codigo_est, nombre_est, fecha, hora, grupo_est, nivel_pregunta, num_pregunta, tiempo_respuesta, puntos_pregunta){
  $.ajax({  
      type: "GET",
      url: baseUrl+"getEnviarRespuesta.php?codigo_est="+codigo_est+"&fecha="+fecha+"&hora="+hora+"&nombre_est="+nombre_est+"&grupo_est="+grupo_est+"&nivel_pregunta="+nivel_pregunta+"&num_pregunta="+num_pregunta+"&tiempo_respuesta="+tiempo_respuesta+"&puntos_pregunta="+puntos_pregunta,
      dataType: "html",   //expect html to be returned                
      success: function(response){                    
        var respuesta = response;
          if(respuesta=="ok"){
            console.log("Resultados enviados para jugador: "+nombre_est);
          }else{
            console.log("Error al enviar los resultados");
          }
      }
  }).fail(function() {
    alert( "Verifique su conexión a internet." );
    enviarRespuesta(codigo_est, nombre_est, fecha, hora, grupo_est, nivel_pregunta, num_pregunta, tiempo_respuesta, puntos_pregunta);
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

//Seccion de preguntas  //

//Variables para ciclo de preguntas
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
var miLat;
var miLong;

function verificar(respuesta) {
  checkConection();
  if(checkConection_temp==true){
    if(correcta==respuesta) {
      hideRespuestas();
      alert("Respuesta Correcta para el jugador: "+turnoJugador+"");
      tiempoRespuesta = clock;
      stopClock();
      
      //clearPregunta();
      spinner_pregunta.spin();
      enviarRespuesta(jugadoresArray[turnoJugador].codigo,jugadoresArray[turnoJugador].nombre,d.yyyymmdd(),d.getHours(),idGrupo,nivelPreguntaActual, numPreguntaActual, tiempoRespuesta, ((puntos[turnoJugador]+1)- puntosPasados[turnoJugador]));

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
        alert("Ya participaron todos los jugadores. SIGUIENTE PISTA! :)");

        //Puntos sumados en cada ronda
        var s = "";
        for (var i = 0; i < numJugadores; i++) {
          s += puntos[i]+"  ";
        }

        s = "";
        for (var i = 0; i < numJugadores; i++) {
          s += puntos[i] - puntosPasados[i]+"  ";
          puntosPasados[i] = puntos[i];
        }

        presionoA = true;
        presionoB = true;
        presionoC = true;
        presionoD = true;
        

        if (ronda==5){
          $.mobile.navigate("#pagethree", {transition: "slide"});
          isPlaying = true;

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

          $.ajax({  //create an ajax request
            type: "GET",
            url: baseUrl+"sendMail.php?grupo="+idGrupo,             
            dataType: "html",   //expect html to be returned                
            success: function(){                    
              var resultados_string="";
              alert("YA PASARON LAS 5 RONDAS. SE HA TERMINADO EL JUEGO");
              for(var i=0;i < numJugadores; i++){
                resultados_string+="El Puntaje para el jugador #"+(i)+" "+jugadoresArray[i].nombre+" es "+puntos[i]+"<br>";
              }
              $('#game_finished').html(resultados_string);
              //detener spinner
              spinner_resultados.stop();

            }
          }).fail(function(){
            alert("Verifique su conexión a internet.");
          });
        }else{
          setTimeout(f, 2000);
          spinner_pista.spin();
          showPista();
          isPlaying = false;
          $.mobile.navigate("#pageone", {transition: "slide"});
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
var marcador, marcador2;
var watchID = null;

function initialize() {
  var mapOptions = {
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(pos);

        

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
  var options = { timeout: 600000, enableHighAccuracy: true };
  watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
  setTimeout(f, 3000);
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
    map.setCenter(options.position);
  }

  google.maps.event.addDomListener(window, 'load', initialize);

  
  function resetMap(m) {
    x = m.getZoom();
    c = m.getCenter();
    google.maps.event.trigger(m, 'resize');
    m.setZoom(x);
    m.setCenter(c);
  }

  function f() {
    resetMap(map);
    $('#myPosition').html('My Position: Lat: '+miLat+' Long: '+miLong);
    $('#destino').html('Destino: Lat: '+PistaLat+'  Long: '+PistaLong);
  }

  function onSuccess(ubicacion){
    var miubicacion = new google.maps.LatLng(ubicacion.coords.latitude, ubicacion.coords.longitude);
    pos = miubicacion;
    miLat=ubicacion.coords.latitude;
    miLong=ubicacion.coords.longitude;
    var rangoLugar =  0.00025;
    var rangoLugar2 =  0.00044;
    //alert(pos);
    map.setCenter(miubicacion);
    marcador.setPosition(miubicacion);

    if(!isPlaying){

      if((((PistaLat-rangoLugar2) < miLat)&&(miLat < (PistaLat + rangoLugar2))) &&
          (((PistaLong+rangoLugar2) > miLong)&&(miLong > (PistaLong-rangoLugar2)))){
        //Sonido
        //Para reproducir 
          document.getElementById("ogg").play();
      }

      if((((PistaLat-rangoLugar) < miLat)&&(miLat < (PistaLat + rangoLugar))) &&
          (((PistaLong+rangoLugar) > miLong)&&(miLong > (PistaLong-rangoLugar)))){
             //cargar ciclo de preguntas
            alert("Llegaste al lugar!");
            isPlaying = true;
            hideRespuestas();
            $.mobile.navigate("#pagetwo", {transition: "slide"});
            clearPregunta();
            spinner_pregunta.spin();
            showPregunta();
            startClock();
      }

    }

  } 

  function onError(){
    alert("No logramos localizarte :(. Regresaras al inicio de la aplicacion.");
      window.location.replace("index.html");
  }

  function hideRespuestas(){
    $('.respuesta-btn').hide();
  }

  function showRespuestas(){
    $('.respuesta-btn').show();
  }