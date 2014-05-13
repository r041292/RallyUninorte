window.onload = function(){
	showPista();
}



$('#llegue').click(function(){
		showPista();
        showPregunta();
})


function showPista(){
	 $.ajax({    //create an ajax request
        type: "GET",
        url: "http://uninorterally1.hol.es/getPista_Lugar.php",             
        dataType: "html",   //expect html to be returned                
        success: function(response){                    
            //alert(response);
            $('#hidden_content1').html(response);

        	}

    	}); 
}

function showPregunta(){
    $.ajax({    //create an ajax request to load_page.php
        type: "GET",
        url: "http://uninorterally1.hol.es/getPregunta.php",             
        dataType: "html",   //expect html to be returned                
        success: function(response){                    
            //alert(response);
            var pregunta = jQuery.parseJSON( response );
            //alert( pregunta.texto_1 );
            $('#titulo_pregunta').html(pregunta.titulo_pregunta);
            $('#texto1_pregunta').html(pregunta.texto_1);
            $('#texto2_pregunta').html(pregunta.texto2);
            $('#texto3_pregunta').html(pregunta.texto3);
            $('#imagen1_pregunta').html("<img src=img/"+pregunta.imagen_1+">");
            $('#imagen2_pregunta').html(pregunta.imagen_2);
            $('#repuesta_a_pregunta').html(pregunta.respuesta_a);
            $('#repuesta_b_pregunta').html(pregunta.respuesta_b);
            $('#repuesta_c_pregunta').html(pregunta.respuesta_c);
            $('#repuesta_d_pregunta').html(pregunta.respuesta_d);
            $('#repuesta_correcta_pregunta').html(pregunta.respuesta_correcta);
            }

        });
}

//MAP JS

var map;
      
      function initialize() {
        var mapOptions = {
          zoom: 17
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        // Try HTML5 geolocation
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(pos);

            var infowindow = new google.maps.InfoWindow({
              map: map,
              position: pos,
              content: 'Your position'
            });

            map.setCenter(pos);
          }, function() {
            handleNoGeolocation(true);
          });
        } else {
          // Browser doesn't support Geolocation
          handleNoGeolocation(false);
        }
 
      }

      function handleNoGeolocation(errorFlag) {
        if (errorFlag) {
          var content = 'Error: The Geolocation service failed.';
        } else {
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
     
    resetMap(map);  })

    function resetMap(m) {
     x = m.getZoom();
     c = m.getCenter();
     alert(m.getCenter()); 
     google.maps.event.trigger(m, 'resize');
     m.setZoom(x);
     m.setCenter(c);
   }