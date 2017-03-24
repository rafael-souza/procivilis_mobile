var map;

$(document).on("pageshow", "#loginPage", function(){    
    var remember_login = window.localStorage.getItem("remember_login");
    if (remember_login){
          $("#username").val(window.localStorage.getItem("user_login"));
          $("#password").val(window.localStorage.getItem("pass_login"));
          $("#remember-login").prop("checked", true);
    }
});

// evento que disparado ao exibir uma pÃ¡gina (se for a pagina de ediÃ§Ã£o de imÃ³veis)
$(document).on("pageshow", "#imovelEdit", function(){    
    // marcando que estÃ¡ editando um imÃ³vel
    editandoImovel = true;     
    novaUnidadeImovel = false;
    alterouDados = false;
    novaEdificacao = new Object();
    // inicializando o array de caracteristicas
    caracteristicasImovel = [];
    caracteristicasImovelNew = [];    
    // pegando as variaveis do local storage
    var idInscricaoImobiliariaEdit = window.localStorage.getItem("id_inscricao_imobiliaria");
    var idAtividadeEdit = window.localStorage.getItem("id_atividade"); 
    
    // armazenando o id da atividade para finalizar o imóvel      
    $("#idAtividade").val(idAtividadeEdit);            
    
    // escondendo os campos
    $("#idAtividade").hide();
    $("#idImovelEdit").hide();    
    
    // busca o imovel no banco
    visualizarImovel(idInscricaoImobiliariaEdit);

    // evento change paga colorir os textos ao alterar
    $(document).on('change', ".cw-target", function () {

      // verificando se o elemento é uma caracteristica      
      if ($(this).attr('id').indexOf('carac_edit') == 0){              
        // pegando o texto para comparar
        var labelCompleto = $('label[for="'+$(this).attr('id')+'"]').text();
        // quebrando pelo : para saber o valor original
        var labelValor = labelCompleto.split(':')[1];                 
        // verifica se é um select
        if ($(this).is("select")){          
          if (labelValor == " " + $(this).parents('.ui-select').find('span').text()){
            $(this).parents('.ui-select').find('span').removeClass('cw-alterado');                   
          } else {
            $(this).parents('.ui-select').find('span').addClass('cw-alterado');                                           
          }
        } else {          
          if (labelValor == " " + $(this).val()){            
            $(this).removeClass('cw-alterado');                        
          } else {
            $(this).addClass('cw-alterado');
          }
        }
      }
      alterouDados = true;
    });       
});

// evento que disparado ao exibir uma pÃ¡gina (se for a pagina de criaÃ§Ã£o de imÃ³veis)
$(document).on("pageshow", "#imovelNew", function(){
    // marcando que estÃ¡ editando um imÃ³vel
    editandoImovel = false;  
    novaUnidadeImovel = false;  
    alterouDados = false; 
    novaEdificacao = new Object();
    // inicializando o array de caracteristicas
    caracteristicasImovel = [];
    caracteristicasImovelNew = [];
    // limpando o local storage
    window.localStorage.removeItem("");
    window.localStorage.removeItem("");

    // inicializando as fotos
    document.getElementById('img_fachada').innerHTML = 
        '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';        
 
    document.getElementById('img_adicional1').innerHTML = 
        '<span>Adicional 1:</span><br/><img src="../../img/sem_imagem.jpg" />';

    document.getElementById('img_adicional2').innerHTML = 
          '<span>Adicional 2:</span><br/><img src="../../img/sem_imagem.jpg" />'; 

    // carregando as caracteristicas de acordo com a lista de caracteristicas    
    buscaCaracteristicasNovoImovel(false);    

    $(document).on('change', ".cw-target", function () {
        alterouDados = true;
    });     
});

// evento que disparado ao exibir uma pÃ¡gina (se for a pagina de ediÃ§Ã£o de imÃ³veis)
$(document).on("pageshow", "#imovelNewUnit", function(){
    // marcando que estÃ¡ editando um imÃ³vel
    editandoImovel = false;     
    novaUnidadeImovel = true;
    alterouDados = false;
    // inicializando o array de caracteristicas
    caracteristicasImovel = [];
    caracteristicasImovelNew = [];

    // setando os valores
    document.getElementById('inscricaoImobiliariaNew').value = novaEdificacao.inscricao_imobiliaria;
    document.getElementById('proprietarioImovelNew').value =  novaEdificacao.proprietario;
    document.getElementById('enderecoImovelNew').value = novaEdificacao.endereco_logradouro;
    document.getElementById('numeroImovelNew').value = novaEdificacao.endereco_numero;
    document.getElementById('bairroImovelNew').value = novaEdificacao.endereco_bairro;
    document.getElementById('complementoImovelNew').value = novaEdificacao.endereco_complemento;
    document.getElementById('cepImovelNew').value = novaEdificacao.endereco_cep;    

    // inicializando as fotos
    document.getElementById('imgNew_fachada').innerHTML = 
        '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';        
 
    document.getElementById('imgNew_adicional1').innerHTML = 
        '<span>Adicional 1:</span><br/><img src="../../img/sem_imagem.jpg" />';

    document.getElementById('imgNew_adicional2').innerHTML = 
          '<span>Adicional 2:</span><br/><img src="../../img/sem_imagem.jpg" />'; 

    // carregando as caracteristicas de acordo com a lista de caracteristicas    
    buscaCaracteristicasNovoImovel(true);        

    $(document).on('change', ".cw-target", function () {
        alterouDados = true;
    });  
});

// evento para tratar o backbutton do dispositivo
document.addEventListener("backbutton", function(e){
    $.mobile.activePage.find('.ui-btn-active').removeClass('ui-btn-active ui-focus');

    if($.mobile.activePage.is('#inicial') || $.mobile.activePage.is('#loginPage')){
        navigator.app.exitApp();
    } else if ($.mobile.activePage.is('#imovelNew') || $.mobile.activePage.is('#imovelEdit') 
      || $.mobile.activePage.is('#imovelNewUnit')){
      exibeAlertaAlteracao();
    } else {
      $.mobile.changePage("../inicial/inicial.html", { transition: "fade"});
    }
}, false);


// função para executar o select count para colocar alerta no navbar
$(document).on("pageshow",function(event, ui){    
    verificaImoveisEmAberto();
    verificaImoveisFinalizados(); 
    // removendo o active das paginas e colocando
    $.mobile.activePage.find('.ui-btn-active').removeClass('ui-btn-active');          
    // ajustando o active do navbar
    if($.mobile.activePage.is('#inicial')){      
      $.mobile.activePage.find('.ui-icon-navigation').addClass('ui-btn-active ui-focus');      
    } else if($.mobile.activePage.is('#sobre')){
      $.mobile.activePage.find('.ui-icon-info').addClass('ui-btn-active ui-focus');
    } else if($.mobile.activePage.is('#imovelSel')){
      $.mobile.activePage.find('.ui-icon-home').addClass('ui-btn-active ui-focus');
    }

    $(ui.prevPage).remove();
});



/*
* Evento ao iniciar a pagina Incial, pegando localizaÃ§Ã£o atual
* Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
* Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
*/
$(document).on("pageshow", "#inicial", function() {
  // limpando o local storage
  window.localStorage.removeItem("id_inscricao_imobiliaria");
  window.localStorage.removeItem("id_atividade"); 

  // verificando a conexÃ£o com a internet  
  var connectionType = checkConnection();  
  if (connectionType == "unknown" || connectionType == "none"){
    document.getElementById("map-canvas").innerHTML = '<p><h1><strong>Sem Conexão com a Internet</strong></h1>';
    return false;
  }
  var defaultLatLng = new google.maps.LatLng(-21.292855, -46.685126);  // Default to Formiga/MG, CA when no geolocation support -20.462245, -45.430365
  if ( navigator.geolocation ) {      
      function success(pos) {          
          // Location found, show map with these coordinates
          drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), 17);          
      }
      function fail(error) {          
        navigator.notification.alert('Não foi possível pegar sua posição através do GPS!\n' +
          'Código: ' + error.code + '\n' +
          'Mensagem: ' + error.message, function(){}, 'Atenção!', 'Fechar');

        drawMap(defaultLatLng,7);  // Failed to find location, show default map
      }
      // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
      navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 10000});
  } else {   
      navigator.notification.alert('Verifique se sua internet e seu GPS estão ativados!', function(){}, 'Atenção!', 'Fechar');
      drawMap(defaultLatLng, 7);  // No geolocation support, show default map
  }
  
  function drawMap(latlng, zoomSize) {
      var myOptions = {
          zoom: zoomSize,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };      
      map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

      // linhas abaixo colocadas para redimensionar os mapas
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);

      // Add an overlay to the map of current lat/lng      
      buscaEnderecoParaRota();
  }
});

// desenha a rota de acordo com os endereços listados
function desenharRota(transaction, result){    
  // verifica se teve retorno de dados
  if (result != null && result.rows != null) {    
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var enderecoInicial;
        
    // pegando a localização atual
    if (navigator.geolocation) { // Se o navegador do usuário tem suporte ao Geolocation         
       navigator.geolocation.getCurrentPosition(function (position) {           
          pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); // Com a latitude e longitude que retornam do Geolocation, criamos um LatLng
          map.setCenter(pontoPadrao);                 
          
          var geocoder = new google.maps.Geocoder();                 
          // passamos a latitude e longitude do geolocation, para pegarmos o endereço em formato de string
          geocoder.geocode({ 
             "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          },

          function(results, status) {               
             if (status == google.maps.GeocoderStatus.OK) {              
                enderecoInicial = results[0].formatted_address;                
                
                directionsDisplay.setMap(map);

                var ultimo = result.rows.item(result.rows.length -1);
                var enderecoFinal = ultimo.endereco_logradouro + ', ' + ultimo.endereco_numero + ' ' + ultimo.endereco_cidade;
                                  
                var waypts = [];
                for (var i = 0; i < result.rows.length -1 ; i++) {
                  var row = result.rows.item(i);      
                  var endereco = row.endereco_logradouro + ', ' + row.endereco_numero + ' ' + row.endereco_cidade + ' - MG, Brasil';                        
                  // concatenando os endereços para inserir nos pontos
                  waypts.push({location: endereco, stopover:true});     
                }     
                        
                var request = {
                  origin: enderecoInicial,
                  destination: enderecoFinal,
                  waypoints: waypts,      
                  travelMode: google.maps.TravelMode.WALKING
                };      
                                
                directionsService.route(request, function(result, status) {                  
                  if (status == google.maps.DirectionsStatus.OK) {        
                    directionsDisplay.setDirections(result);
                  } else {
                    navigator.notification.alert('Algum dos endereços não pode ser georeferenciado, não será possível traçar a rota de trabalho!', 
                        function(){}, 'Atenção!', 'Fechar');

                    var marker = new google.maps.Marker({
                        position: pontoPadrao,
                        title:"Você está aqui!"
                    });

                    // To add the marker to the map, call setMap();
                    marker.setMap(map);
                  }
                });
             }
          }); 
       });
    }      
  } 
}

// listando os imoveis de trabalho
$(document).on("pageshow", "#imovelSel", function() {    
  // limpando o local storage
  window.localStorage.removeItem("id_inscricao_imobiliaria");
  window.localStorage.removeItem("id_atividade"); 

  // realizando a listagem dos imoveis
  listaImovel();
  // comando para 
  $('#imovelSel').trigger('create');  
});

// verifica se estÃ¡ conectado a internet
function checkConnection() {  
  /*UNKNOWN: "unknown",
    ETHERNET: "ethernet",
    WIFI: "wifi",
    CELL_2G: "2g",
    CELL_3G: "3g",
    CELL_4G: "4g",
    CELL:"cellular",
    NONE: "none" */
    var networkState = navigator.connection.type;
    return networkState;        
}

// verifica se possui imóveis pendentes para serem sincronizados
function verificaPendente(){
  // pegando a quantidade de registros que falta para sincronizar
  var count = $('.cw-sinc').find('.ui-li-count').text();
  
  if (count > 0){
      // verificando qual o ponto o usuÃ¡rio deseja georreferenciar  
      navigator.notification.confirm(
          'Existem ' + count + ' imóvel(is) a serem sincronizados.\nDeseja sair assim mesmo?',  // message
          onConfirmSairSemSincronizar,              // callback to invoke with index of button pressed
          'Atenção',                            // title
          'Sim,Não'                                // buttonLabels
      );     
  } else {
    voltarIndex(); 
  }
}

function onConfirmSairSemSincronizar(buttonIndex){
  if (buttonIndex == 1){        
    voltarIndex();    
  } 
}

// mensagem de retorno do sucesso da atualização do imóvel
function atividadeFinalizadoSucesso(){  
  navigator.notification.alert('Imóvel finalizado com sucesso.', voltarImovelSel(), 'Atenção!', 'Fechar');

}

// verifica o retorno da pergunta
function onConfirmSincronizarImovel(buttonIndex){
  if (buttonIndex == 1){
    // verificando a conexÃ£o com a internet
    var connectionType = checkConnection();
    if (connectionType == "unknown" || connectionType == "none"){
      navigator.notification.alert('Não é possível enviar os dados.\nSem conexão com a internet.', function(){}, 'Atenção!', 'Fechar');          
    } else {
      navigator.notification.alert('Vai enviar dados do imóvel.', function(){}, 'Atenção!', 'Fechar');    
    }    
  }

}

// retorno do sucesso nas operações
function successCallBack(){  
  navigator.notification.alert('Operação realizada com sucesso!', function(){}, 'Atenção!', 'Fechar');
}

// retorno de sucesso nas operações que volta a seleção dos imóveis
function successImovelCallBack(){
  navigator.notification.alert('Operação realizada com sucesso!', function(){}, 'Atenção!', 'Fechar'); 
}

// retorno do erro nas operações
function errorHandler(error){  
    navigator.notification.alert(
        'Erro ao realizar a operação. \n'  +
        'Código: ' + error.code + '\n' +
        'Mensagem: ' + error.message,
        function(){},
        'Atenção!',
        'Fechar'
    );
}
