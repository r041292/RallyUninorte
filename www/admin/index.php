<? 
  session_start();
  $_SESSION['shouldPass'] = false; 
  $secreto=0;
  if(isset($_GET['shh'])){
    $secreto= $_GET[shh];
    if($secreto != "csXE6Kgm930HjPOlk82oSa1P3zIJI8PiXvSJy63LDsRJI3uw2b8rUDLhe02u"){
        header("Location: http://uninorterally1.hol.es");
        exit;
    }else{
      $_SESSION['shouldPass'] = true; 
    }

  }else{
    header("Location: http://uninorterally1.hol.es");
    exit;
  }

  


?>

<html>
  <head>
    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
    <meta name="viewport" content="initial-scale=1, target-densitydpi=device-dpi" />
    <link  rel="stylesheet" type="text/css" href="../css/jquery.mobile-1.4.2.css" />
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" href="../css/themes/tema1.css" />
    <title>UninorteRally - ADMINISTRADOR</title>
  </head>
  <body> 
    <div data-role="page" id="pageone" >
      <div data-role="header">
          <p class="jquery_header" >UninorteRally - ADMINISTRADOR</p>
      </div>

      <div data-role="main" class="ui-content">
           <a href="list_pregunta.php"class="ui-btn" rel="external">Administrar Preguntas</a>
           <a href="list_lugar.php"  class="ui-btn" rel="external" >Administrar Lugares</a>
           <a href="list_pista.php"  class="ui-btn" rel="external" >Administrar Pistas</a>
           <a href="list_resultados.php"  class="ui-btn" rel="external" >Administrar Resultados</a>
      </div>

      <div data-role="footer" data-position="fixed">
          <p class="jquery_header">Uninorte Rally</p>
      </div>
    </div>

    <script type="text/javascript" src="../js/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../js/jquery.mobile-1.4.2.min.js"></script>   
  </body>
</html>