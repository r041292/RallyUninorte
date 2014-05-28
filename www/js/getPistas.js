var PistaLat;
var PistaLong;

window.onload = function(){
	showPista();
}

$('#llegue').click(function(){
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
  $.ajax({  //create an ajax request to load_page.php
    type: "GET",
    url: "http://uninorterally1.hol.es/getPregunta.php",             
    dataType: "html",   //expect html to be returned                
    success: function(response){                    
      //alert(response);
      var pregunta = jQuery.parseJSON( response );
      //alert( pregunta.texto_1 );
      $('#titulo_pregunta').html(pregunta.titulo_pregunta);
      $('#texto1_pregunta').html(pregunta.texto_1);
      $('#texto2_pregunta').html(pregunta.texto_2);
      $('#texto3_pregunta').html(pregunta.texto_3);
      if(pregunta.imagen_1!=null){
      $('#imagen1_pregunta').html("<img src=img/"+pregunta.imagen_1+">");}
       if(pregunta.imagen_2!=null){
      $('#imagen2_pregunta').html("<img src=img/"+pregunta.imagen_2+">");}
      $('#repuesta_a_pregunta').html("A. "+pregunta.respuesta_a);
      $('#repuesta_b_pregunta').html("B. "+pregunta.respuesta_b);
      $('#repuesta_c_pregunta').html("C. "+pregunta.respuesta_c);
      $('#repuesta_d_pregunta').html("D. "+pregunta.respuesta_d);
      $('#repuesta_correcta_pregunta').html(pregunta.respuesta_correcta);
    }
  });
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