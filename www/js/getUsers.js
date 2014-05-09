var jugadoresArray=[];

$('#button1').click(function(){
	var numUsers = $('#numeroUsuarios').val();
	
	if(numUsers>0 && numUsers<=7){
		alert("Se iniciara el juego con "+numUsers+" usuario(s)");
		var htmlToParse="<form>";
		for (var i=0;i<numUsers;i++){
			htmlToParse +="<label> <b>Informacion usuario"+(i+1)+"</b><br><b>Codigo: </b><input type=\"number\" id=\"codigoUsuario"+i+"\"><br><b>Email: </b><input type=\"text\" id=\"emailUsuario"+i+"\"></label> <br>";
		}
		htmlToParse +="<p class=\"button1\" id=\"button2\" onclick=\"cargarUsuarios("+i+")\">Enviar</p>";
		htmlToParse +="</form>";
		$('#numUsersForm').hide();
		$('#infUsersForm').html(htmlToParse);
	}else{
		alert("Lo siento numero invalido de usuarios");
	}

})

function cargarUsuarios(numUsers){
	var sw=1;
	for(var i=0;i<numUsers;i++){
		var tempStringCodigo= "#codigoUsuario"+i;
		var tempCodigo= $(tempStringCodigo).val();
		var tempStringEmail="#emailUsuario"+i;
		var tempEmail= $(tempStringEmail).val();
		if(isNumber(tempCodigo)){
			jugadoresArray.push({
				codigo:tempCodigo,
				email:tempEmail	});
		}else{
			jugadoresArray=[];
			alert("hay un error con alguno de los jugadores");break;
			sw=0;
		}
	}
	if(sw=1){
		(function (global) {
		global.localStorage.setItem("jugadoresArray", jugadoresArray);
		}(window));
		window.location.replace("map.html");
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}