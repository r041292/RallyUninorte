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