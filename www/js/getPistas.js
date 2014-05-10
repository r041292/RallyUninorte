window.onload = function(){
                
	showPista();
     
	 
}

$('#llegue').click(function(){
		showPista();
})


function showPista(){
	 $.ajax({    //create an ajax request to load_page.php
        type: "GET",
        url: "getPista_Lugar.php",             
        dataType: "html",   //expect html to be returned                
        success: function(response){                    
            //$("#responsecontainer").html(response); 
            //alert(response);
            $('#hidden_content1').html(response);

        	}

    	});
}
