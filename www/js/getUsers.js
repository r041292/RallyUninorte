//desbilitar back button
document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        document.addEventListener("backbutton", function (e) {
            e.preventDefault();
        }, false );
}

$.support.cors = true;
var jugadoresArray=[];
var numUsers
var cont = 0;

$('#button1').click(function(){
	numUsers = $('#numeroUsuarios').val();
	
	if(numUsers>0 && numUsers<=7){
		$.mobile.navigate("#pagetwo", {transition: "slide"});
	}else if (numUsers > 7){
		alert("Número máximo de jugadores: 7");
	}else{
		alert("Lo siento, número invalido de jugadores.");
	} 

})

$('#button2').click(function(){
	var tempCodigo= $('#idUsuario').val();
	var tempEmail= $('#nombreUsuario').val();

	if(isNumber(tempCodigo)) {
		jugadoresArray.push({
			codigo:tempCodigo,
			nombre:tempEmail,
			preguntas:[1, 2, 3, 4, 5]
		});
		cont+=1;
		alert("Usuario agregado con éxito.");
		if(cont<numUsers){
			$('#userinfoheader').html("<b>Informacion para Jugador "+(cont+1)+"</b>");
			$('#dataFromUsers_form')[0].reset();
		}else { 
			var d = new Date();
			var idGrupo = d.getTime() + "" + Math.floor((Math.random() * 5000) + 1);
			localStorage.setItem("idGrupo", idGrupo);
			localStorage.setItem("jugadoresArray", JSON.stringify(jugadoresArray));
			var control = true;
			localStorage.setItem("control", control);
			window.location.replace("map.html");
		}
	}else{
		alert("Ingrese un código válido.");
	}
})

function isNumber(n) {
  	return !isNaN(parseFloat(n)) && isFinite(n);
}