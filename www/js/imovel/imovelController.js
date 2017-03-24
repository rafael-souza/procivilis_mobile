// variaveis para armazenar imagens
var imagemURL_fachada;
var imagemURL_adicional1;
var imagemURL_adicional2;
var imagemURL_app_fachada;
var imagemURL_app_adicional1;
var imagemURL_app_adicional2;
var imagemDelete;
var pontoGeo;
var caracteristicasImovel = [];
var caracteristicasImovelNew = [];
// variavel de controle de ediÃ§Ã£o do imovel
var editandoImovel = false;
var novaUnidadeImovel = false;
// variavel de controle de alteração de dados
var alterouDados = false;

var novaEdificacao = new Object();

// captura os dados digitados e grava no banco
function gravarImovel(){    
    // criando o objeto e setado as informaÃ§Ãµes
    imovel = new Object();    
    
    //imovel.codigo = document.getElementById('codigoImovel').value;
    imovel.inscricao_imobiliaria = document.getElementById('inscricaoImobiliaria').value;
    imovel.proprietario = document.getElementById('proprietarioImovel').value;
    imovel.endereco_logradouro = document.getElementById('enderecoImovel').value;
    imovel.endereco_numero = document.getElementById('numeroImovel').value;
    imovel.endereco_bairro = document.getElementById('bairroImovel').value;
    imovel.endereco_complemento = document.getElementById('complementoImovel').value;
    imovel.endereco_cep = document.getElementById('cepImovel').value;

    imovel.latitude_ponto_um = document.getElementById('latitude1').value;
    imovel.longitude_ponto_um = document.getElementById('longitude1').value;
    imovel.latitude_ponto_dois = document.getElementById('latitude2').value;
    imovel.longitude_ponto_dois = document.getElementById('longitude2').value;
    imovel.latitude_ponto_tres = document.getElementById('latitude3').value;
    imovel.longitude_ponto_tres = document.getElementById('longitude3').value;

    imovel.foto_fachada = imagemURL_fachada;    
    imovel.foto_adicional1 = imagemURL_adicional1;
    imovel.foto_adicional2 = imagemURL_adicional2;

    imovel.foto_app_fachada = imagemURL_app_fachada;    
    imovel.foto_app_adicional1 = imagemURL_app_adicional1;
    imovel.foto_app_adicional2 = imagemURL_app_adicional2;


    // lista para armazenar as caracteristicas
    var listaImovelCaracteristicaNew = [];    

    // percorrendo o array das caracteristicas para armazená-las
    for (index = 0; index < caracteristicasImovelNew.length; index++) {
      
      // pegando o elemento
      carac = caracteristicasImovelNew[index];

      imovelCaracteristicaNew = new Object();  
      // armazenando o id da caracteristica
      imovelCaracteristicaNew.id = carac.idCaracteristica;
            
      // pegando o value do elemento
      imovelCaracteristicaNew.valor = $(carac.idCampo).val();

      // colocando elemento na lista
      listaImovelCaracteristicaNew.push(imovelCaracteristicaNew);
      
    }
    
    // gravando o registro no banco
    gravarImovelBd(imovel, listaImovelCaracteristicaNew);

    // desmarcando valor de alteração
    alterouDados = false;
}


function gravarNovaUnidade(){
    // criando o objeto e setado as informaÃ§Ãµes
    imovel = new Object();    
    
    //imovel.codigo = document.getElementById('codigoImovel').value;
    imovel.inscricao_imobiliaria = document.getElementById('inscricaoImobiliariaNew').value;
    imovel.proprietario = document.getElementById('proprietarioImovelNew').value;
    imovel.endereco_logradouro = document.getElementById('enderecoImovelNew').value;
    imovel.endereco_numero = document.getElementById('numeroImovelNew').value;
    imovel.endereco_bairro = document.getElementById('bairroImovelNew').value;
    imovel.endereco_complemento = document.getElementById('complementoImovelNew').value;
    imovel.endereco_cep = document.getElementById('cepImovelNew').value;

    imovel.latitude_ponto_um = document.getElementById('latitude1New').value;
    imovel.longitude_ponto_um = document.getElementById('longitude1New').value;
    imovel.latitude_ponto_dois = document.getElementById('latitude2New').value;
    imovel.longitude_ponto_dois = document.getElementById('longitude2New').value;
    imovel.latitude_ponto_tres = document.getElementById('latitude3New').value;
    imovel.longitude_ponto_tres = document.getElementById('longitude3New').value;

    imovel.foto_fachada = imagemURL_fachada;
    imovel.foto_adicional1 = imagemURL_adicional1;
    imovel.foto_adicional2 = imagemURL_adicional2;

    imovel.foto_app_fachada = imagemURL_app_fachada;    
    imovel.foto_app_adicional1 = imagemURL_app_adicional1;
    imovel.foto_app_adicional2 = imagemURL_app_adicional2;    

    // lista para armazenar as caracteristicas
    var listaImovelCaracteristicaNew = [];    

    // percorrendo o array das caracteristicas para armazená-las
    for (index = 0; index < caracteristicasImovelNew.length; index++) {
      
      // pegando o elemento
      carac = caracteristicasImovelNew[index];

      imovelCaracteristicaNew = new Object();  
      // armazenando o id da caracteristica
      imovelCaracteristicaNew.id = carac.idCaracteristica;
            
      // pegando o value do elemento
      imovelCaracteristicaNew.valor = $(carac.idCampo).val();

      // colocando elemento na lista
      listaImovelCaracteristicaNew.push(imovelCaracteristicaNew);
      
    }
    
    // gravando o registro no banco
    gravarImovelBd(imovel, listaImovelCaracteristicaNew);

    // desmarcando valor de alteração
    alterouDados = false;  
}

// captura os dados digitados e atualiza o banco
function atualizarImovel(){
    imovel = new Object();
    imovel.id = document.getElementById('idImovelEdit').value;
    imovel.codigo = document.getElementById('codigoImovelEdit').value;
    imovel.inscricao_imobiliaria = document.getElementById('inscricaoImobiliariaEdit').value;
    imovel.proprietario = document.getElementById('proprietarioImovelEdit').value;
    imovel.endereco_logradouro = document.getElementById('enderecoImovelEdit').value;
    imovel.endereco_numero = document.getElementById('numeroImovelEdit').value;
    imovel.endereco_bairro = document.getElementById('bairroImovelEdit').value;
    imovel.endereco_complemento = document.getElementById('complementoImovelEdit').value;
    imovel.endereco_cep = document.getElementById('cepImovelEdit').value;

    imovel.latitude_ponto_um = document.getElementById('latitude1Edit').value;
    imovel.longitude_ponto_um = document.getElementById('longitude1Edit').value;
    imovel.latitude_ponto_dois = document.getElementById('latitude2Edit').value;
    imovel.longitude_ponto_dois = document.getElementById('longitude2Edit').value;
    imovel.latitude_ponto_tres = document.getElementById('latitude3Edit').value;
    imovel.longitude_ponto_tres = document.getElementById('longitude3Edit').value;

    imovel.foto_fachada = imagemURL_fachada;
    imovel.foto_adicional1 = imagemURL_adicional1;
    imovel.foto_adicional2 = imagemURL_adicional2;

    imovel.foto_app_fachada = imagemURL_app_fachada;    
    imovel.foto_app_adicional1 = imagemURL_app_adicional1;
    imovel.foto_app_adicional2 = imagemURL_app_adicional2;    
    
    // lista para armazenar as caracteristicas
    var listaImovelCaracteristica = [];

    // percorrendo o array das caracteristicas para armazená-las
    for (index = 0; index < caracteristicasImovel.length; index++) {
      
      // pegando o elemento
      carac = caracteristicasImovel[index];

      imovelCaracteristica = new Object();  
      // armazenando o id da caracteristica
      imovelCaracteristica.id = carac.id;
            
      // pegando o value do elemento
      imovelCaracteristica.valor = $(carac.idCampo).val();
      

      if ($(carac.idCampo).is("select") && $(carac.idCampo).parents('.ui-select').find('span').hasClass("cw-alterado")){
          imovelCaracteristica.alterou = "S";        
      } else if ($(carac.idCampo).is("select") && !$(carac.idCampo).parents('.ui-select').find('span').hasClass("cw-alterado")){
          imovelCaracteristica.alterou = "N";
      } else if ($(carac.idCampo).hasClass("cw-alterado")){
          imovelCaracteristica.alterou = "S";
      } else {
          imovelCaracteristica.alterou = "N";
      }

      /*
      if ($(carac.idCampo).is("select") && $(carac.idCampo).parents('.ui-select').find('span').css('color') == 'rgb(255, 0, 0)'){
          imovelCaracteristica.alterou = "S";        
      } else if ($(carac.idCampo).css('color') == 'rgb(255, 0, 0)'){
          imovelCaracteristica.alterou = "S";
      }*/
      
      // colocando elemento na lista
      listaImovelCaracteristica.push(imovelCaracteristica);
      
    }
   
    atualizarImovelBd(imovel, listaImovelCaracteristica);

    // desmarcando valor de alteração
    alterouDados = false;
}

// evento que captura a imagem da camera
function capturarImagemFachada(){
  navigator.camera.getPicture(capturarSuccessFachada, capturarFail,
    {
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA
    });
}

// exibindo a imagem que foi capturada
function capturarSuccessFachada(imageCaminho) {   
    // capturando o valor base64 da imagem
    convertFileToDataURLviaFileReader(imageCaminho, function(dataUri) {
        imagemURL_app_fachada = dataUri;
    });
     
    imagemURL_fachada = imageCaminho;
    // verificando se estÃ¡ editando o imovel
    if (editandoImovel){
      img = document.getElementById('imgEdit_fachada');
    }  else if (novaUnidadeImovel){
      img = document.getElementById('imgNew_fachada');
    } else {
      img = document.getElementById('img_fachada');
    }
    img.innerHTML = '<span>Fachada:</span><br/><img src="' + imageCaminho + '" />';
}

// evento que captura a imagem da camera
function capturarImagemAdicional1(){
  navigator.camera.getPicture(capturarSuccessAdicional1, capturarFail,
    {
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA
    });
}

// exibindo a imagem que foi capturada
function capturarSuccessAdicional1(imageCaminho) {
  // capturando o valor base64 da imagem
  convertFileToDataURLviaFileReader(imageCaminho, function(dataUri) {
      imagemURL_app_adicional1 = dataUri;
  });
  imagemURL_adicional1 = imageCaminho;
  if (editandoImovel){
    img = document.getElementById('imgEdit_adicional1');
  } else if (novaUnidadeImovel) {
    img = document.getElementById('imgNew_adicional1');
  } else {
    img = document.getElementById('img_adicional1');
  }
  img.innerHTML = '<span>Adicional 1:</span><br/><img src="' + imageCaminho + '" />';
}

// evento que captura a imagem da camera
function capturarImagemAdicional2(){
  navigator.camera.getPicture(capturarSuccessAdicional2, capturarFail,
    {
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA
    });
}    

function capturarSuccessAdicional2(imageCaminho) {
  // capturando o valor base64 da imagem
  convertFileToDataURLviaFileReader(imageCaminho, function(dataUri) {
      imagemURL_app_adicional2 = dataUri;
  });    

  imagemURL_adicional2 = imageCaminho;
  if (editandoImovel){
    img = document.getElementById('imgEdit_adicional2');
  } else if (novaUnidadeImovel) {
    img = document.getElementById('imgNew_adicional2');
  } else {
    img = document.getElementById('img_adicional2');
  }
  img.innerHTML = '<span>Adicional 2:</span><br/><img src="' + imageCaminho + '" />';    
}

// erro de captura da foto
function capturarFail(message) {
  navigator.notification.alert(
      message,
      function(){},
      'Erro!',
      'Fechar'
  );
}


// tira ou remove a fotografia tirada
function manipulaFoto(element){
  // verificando se possui foto
  if ($(element).html().indexOf('file') > 0){    
    // armazenando qual imagem sera removida
    imagemDelete = element;
    // pergunta se deseja remover a foto
    navigator.notification.confirm(
        'Deseja remover a imagem?',  // message
        onConfirmDeleteImage,        // callback to invoke with index of button pressed
        'Atenção',                   // title
        'Sim,Não'                    // buttonLabels
    );    

  } else {
    // verificando qual foto Ã© para tirar
    if ($(element).html().indexOf('Fachada') > 0){
      capturarImagemFachada();
    } else if ($(element).html().indexOf('Adicional 1') > 0){
      capturarImagemAdicional1();
    } else if ($(element).html().indexOf('Adicional 2') > 0){
      capturarImagemAdicional2();
    }  
  }


}

// funÃ§Ã£o de retorno da confirmaÃ§Ã£o de remoÃ§Ã£o de imagem
function onConfirmDeleteImage(buttonIndex){  
  // verificando se deseja remover
  if (buttonIndex == 1){
      if ($(imagemDelete).html().indexOf('Fachada') > 0){
          // se esta editando o imÃ³vel 
          if (editandoImovel){
            document.getElementById('imgEdit_fachada').innerHTML = 
              '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';               
          } else if (novaUnidadeImovel){
            document.getElementById('imgNew_fachada').innerHTML = 
              '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';               
          } else {
            document.getElementById('img_fachada').innerHTML = 
              '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';            
          }          
          imagemURL_fachada = '';          
      } else if ($(imagemDelete).html().indexOf('Adicional 1') > 0){
          // se esta editando o imÃ³vel 
          if (editandoImovel){
            document.getElementById('imgEdit_adicional1').innerHTML = 
              '<span>Adicional 1:</span><br/><img src="../../img/sem_imagem.jpg" />';               
          } else if (novaUnidadeImovel){
            document.getElementById('imgNew_adicional1').innerHTML = 
              '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';               
          } else {
            document.getElementById('img_adicional1').innerHTML = 
              '<span>Adicional 1:</span><br/><img src="../../img/sem_imagem.jpg" />';            
          }
          imagemURL_adicional1 = '';
      } else if ($(imagemDelete).html().indexOf('Adicional 2') > 0){
          // se esta editando o imÃ³vel 
          if (editandoImovel){
            document.getElementById('imgEdit_adicional2').innerHTML = 
              '<span>Adicional 2:</span><br/><img src="../../img/sem_imagem.jpg" />';               
          } else if (novaUnidadeImovel){
            document.getElementById('imgNew_adicional2').innerHTML = 
              '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';                                     
          } else {
            document.getElementById('img_adicional2').innerHTML = 
              '<span>Adicional 2:</span><br/><img src="../../img/sem_imagem.jpg" />';            
          }
          imagemURL_adicional2 = '';
      } 
  }
}

// lista os registros do banco das atividades e imÃ³veis
function mostrarListaImovel(transaction, result){
  var listaAtividades = document.getElementById("listaAtividades");
  var lista = '';

  if (result != null && result.rows != null) {
    var fazer = 0;
    var feito = 0;
    var enviado = 0;
    var colocouSeparador = false;
    var colocouSeparadorEnv = false;
    lista = lista + "<li id='dividerTrabalhar' data-role='list-divider'><h1>Imóveis a Trabalhar</h1></li>";

    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);      

      if (row.status == 'ABE'){
        fazer++;          
      } else if (row.status == 'FIN'){
        feito++;
        if (!colocouSeparador){
          lista = lista + "<li id='dividerTrabalhado' data-role='list-divider'><h1>Imóveis Trabalhados</h1></li>";          
          colocouSeparador = true;
        }
      } else if (row.status == 'ENV'){
        enviado++;
        if (!colocouSeparadorEnv){
          lista = lista + "<li id='dividerEnviado' data-role='list-divider'><h1>Imóveis Enviados</h1></li>";          
          colocouSeparadorEnv = true;
        }
      }

      lista = lista + '<li class="ui-li-has-thumb">';      
      lista = lista + '<a class="ui-btn ui-btn-icon-right ui-icon-carat-r cw-ui-btn" data-transition="slide" ' +
        'href="#" onclick="vaiEditar('+ row.id_inscricao_imobiliaria + ', ' + row.id_atividade +')" >';
        
      var foto = row.foto_fachada;

      if (null != foto && foto.indexOf('file') == 0){    
        lista = lista + '<img src="' + row.foto_fachada + '" class="ui-li-thumb" />';        
      } else {
        lista = lista + '<img src="../../img/sem_imagem.jpg" class="ui-li-thumb" />';
      }
      
      lista = lista + '<h1><b>Inscrição Imobiliária:</b> ' + row.inscricao_imobiliaria + '</h1>';
      lista = lista + '<p><b>Prprietário:</b> ' + row.proprietario + '</p>';
      lista = lista + '<p><b>Endereço: </b>' + row.endereco_logradouro + ', ' + row.endereco_numero + '</p>';
      lista = lista + '</a></li>'; 
    }
    
    listaAtividades.innerHTML = lista; 
    $("#dividerEnviado").append("<span class='ui-li-count cw-listview-li-count'>" + enviado + "</span>");
    $("#dividerTrabalhado").append("<span class='ui-li-count cw-listview-li-count'>" + feito + "</span>");
    $("#dividerTrabalhar").append("<span class='ui-li-count cw-listview-li-count'>" + fazer + "</span>");

    $("#content").find("ul").listview("refresh");
  }  
  
}

// insere as variaveis em local storage e chama a tela de edição
function vaiEditar(id_inscricao_imobiliaria, id_atividade){    
    // colocando as variaveis no local storage
    window.localStorage.setItem("id_inscricao_imobiliaria", id_inscricao_imobiliaria);
    window.localStorage.setItem("id_atividade", id_atividade);
    // alterando para a pagina de edição
    $.mobile.changePage('imovelEdit.html', {transition: "slide"});
}

// exibe a anotaÃ§Ã£o na tela de ediÃ§Ã£o
function mostrarImovel(transaction, result) {  
  // setando os valores nos campos de ediÃ§Ã£o
  document.getElementById('idImovelEdit').value = result.rows.item(0).id;
  document.getElementById('codigoImovelEdit').value = result.rows.item(0).codigo;
  document.getElementById('inscricaoImobiliariaEdit').value = result.rows.item(0).inscricao_imobiliaria;
  document.getElementById('proprietarioImovelEdit').value = result.rows.item(0).proprietario;
  document.getElementById('enderecoImovelEdit').value = result.rows.item(0).endereco_logradouro;
  document.getElementById('numeroImovelEdit').value = result.rows.item(0).endereco_numero;
  document.getElementById('bairroImovelEdit').value = result.rows.item(0).endereco_bairro;
  document.getElementById('complementoImovelEdit').value = result.rows.item(0).endereco_complemento;
  document.getElementById('cepImovelEdit').value = result.rows.item(0).endereco_cep;
  document.getElementById('latitude1Edit').value = result.rows.item(0).latitude_ponto_um;
  document.getElementById('longitude1Edit').value = result.rows.item(0).longitude_ponto_um;
  document.getElementById('latitude2Edit').value = result.rows.item(0).latitude_ponto_dois;
  document.getElementById('longitude2Edit').value = result.rows.item(0).longitude_ponto_dois;
  document.getElementById('latitude3Edit').value = result.rows.item(0).latitude_ponto_tres;
  document.getElementById('longitude3Edit').value = result.rows.item(0).longitude_ponto_tres;    

  // pegando as imagens
  imagemURL_fachada =  result.rows.item(0).foto_fachada;
  imagemURL_adicional1 = result.rows.item(0).foto_adicional1;
  imagemURL_adicional2 = result.rows.item(0).foto_adicional2;

  imagemURL_app_fachada = result.rows.item(0).foto_app_fachada =
  imagemURL_app_adicional1 = result.rows.item(0).foto_app_adicional1;
  imagemURL_app_adicional2 = result.rows.item(0).foto_app_adicional2;
  
  if (null != imagemURL_fachada && imagemURL_fachada != 'undefined' && imagemURL_fachada != '' && imagemURL_fachada.indexOf('file') == 0){
      document.getElementById('imgEdit_fachada').innerHTML = 
        '<span>Fachada:</span><br/><img src="' + imagemURL_fachada + '" />';       
  } else {
      document.getElementById('imgEdit_fachada').innerHTML = 
        '<span>Fachada:</span><br/><img src="../../img/sem_imagem.jpg" />';        
  }

  if (null != imagemURL_adicional1 && imagemURL_adicional1 != 'undefined' && imagemURL_adicional1 != '' && imagemURL_adicional1.indexOf('file') == 0){        
      document.getElementById('imgEdit_adicional1').innerHTML = 
        '<span>Adicional 1:</span><br/><img src="' + imagemURL_adicional1 + '" />';
  } else {
      document.getElementById('imgEdit_adicional1').innerHTML = 
        '<span>Adicional 1:</span><br/><img src="../../img/sem_imagem.jpg" />';      
  }

  if (null != imagemURL_adicional2 && imagemURL_adicional2 != 'undefined' && imagemURL_adicional2 != '' && imagemURL_adicional2.indexOf('file') == 0){
      document.getElementById('imgEdit_adicional2').innerHTML = 
        '<span>Adicional 2:</span><br/><img src="' + imagemURL_adicional2 + '" />';
  } else {
      document.getElementById('imgEdit_adicional2').innerHTML = 
          '<span>Adicional 2:</span><br/><img src="../../img/sem_imagem.jpg" />';    
  }
  
  // buscando as caracteristicas
  buscaCaracteristicasImovel(result.rows.item(0).id);
     
}


// função que monta as caracteristicas
function montaCaracteristicas(transaction, result){
  var listaCaracteristicas = document.getElementById("caracteristicaEdit");
  var lista = '';
  
  if (result != null && result.rows != null) {
    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);
      // verificando se o valor esta nulo
      var valor = row.valor;
      if (valor == null){
        valor = '';        
      }      

      // verificando se o valor cti esta nulo
      var valor_cti = row.valor_cti;
      if (valor_cti == null){
        valor_cti = '';        
      }            

      if (row.tipo == "TEX"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target cw-alterado' value="+valor+"></div>";
        } else {
           lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target' value="+valor+"></div>";
        }        
      } else if (row.tipo == "DEC"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target cw-alterado' value="+valor+"></div>";
        } else {
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target' value="+valor+"></div>";          
        }        
      } else if (row.tipo == "MAR"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='checkbox' data-theme='c' class='cw-target cw-alterado' value="+valor+"></div>";
        } else {
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='checkbox' data-theme='c' class='cw-target' value="+valor+"></div>";          
        }          
      } else if (row.tipo == "LIS"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth' data-controltype='selectmenu'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
          "<select id='carac_edit_" + row.idCaracteristica + "' data-native-menu='false' data-theme='c' class='cw-target cw-alterado'></select></div>"                          
        } else {
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth' data-controltype='selectmenu'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
          "<select id='carac_edit_" + row.idCaracteristica + "' data-native-menu='false' data-theme='c' class='cw-target'></select></div>"                          
        }
        // busca a lista de valores para adicionar no select
        buscaCaracteristicaListaValor(row.idCaracteristica, false, false);        
      } else if (row.tipo == "NUM"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target cw-alterado' value="+valor+"></div>";
        } else {
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +
            "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target' value="+valor+"></div>";          
        }        
      } else if (row.tipo == "DAT"){
        if (row.alterado == 'S'){
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +        
          "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target cw-alterado' value="+valor+"></div>";        
        } else {
          lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_edit_" + row.idCaracteristica +">"+row.descricao+": <span class='cw-valor-cti'>" + valor_cti +"</span></label> " +        
          "<input id='carac_edit_" + row.idCaracteristica +"' type='text' data-clear-btn='true' class='cw-target' value="+valor+"></div>";        
        }
      }

      imovelCaracteristica = new Object();
      imovelCaracteristica.id = row.id;      
      imovelCaracteristica.idCampo = "#carac_edit_" + row.idCaracteristica;
      imovelCaracteristica.idCaracteristica = row.idCaracteristica;
      imovelCaracteristica.valor = valor;
      
      // armazenando o id das caracteristicas para salva-las em banco
      caracteristicasImovel.push(imovelCaracteristica);      

    }
    listaCaracteristicas.innerHTML = lista;

    // comando realizado para aplicar o estilo nos campos adicionados acima
    $("#imovelEdit").enhanceWithin();         
  }  
}

// colocando a lista de caracteristicas no combo
function montaCaracteristicaListaValor(transaction, result){  
  if (result != null && result.rows != null) {          
    // removendo possiveis valores    
    $("#carac_edit_" + result.rows.item(0).caracteristica).find('option').remove().end();
    // inserindo a opção [Selecione]
    $("#carac_edit_" + result.rows.item(0).caracteristica).append($("<option></option>").attr("value", 0).text("[Selecione]"));
    // inserindo os valores
    for (var i = 0; i < result.rows.length; i++){           
      $("#carac_edit_" + result.rows.item(0).caracteristica).append($("<option></option>")
        .attr("value", result.rows.item(i).id).text(result.rows.item(i).descricao));      
    }                
  
    // percorrendo as caracteristicas para setar o valor
    for (index = 0; index < caracteristicasImovel.length; index++) {    
      // pegando o elemento
      carac = caracteristicasImovel[index];        
      if (carac.idCaracteristica == result.rows.item(0).caracteristica && carac.valor != null && carac.valor != ''){        
        $("#carac_edit_" + result.rows.item(0).caracteristica).val(carac.valor);
        break;
      }
    }
    
    $("#carac_edit_" + result.rows.item(0).caracteristica).selectmenu("refresh");    
  }  
}

// montando a lista de caracteristicas para um novo imovel
function montaCaracteristicasNovoImovel(transaction, result){    
  var listaCaracteristicas = document.getElementById("caracteristicaNew");
  var lista = '';
  
  if (result != null && result.rows != null) {
    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);      
      
      if (row.tipo == "TEX"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_new_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_new_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";          
        
      } else if (row.tipo == "DEC"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_new_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_new_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";          
        
      } else if (row.tipo == "MAR"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_new_" + row.id +">"+row.descricao+"</label> " +
          "<input id='carac_new_" + row.id +"' type='checkbox' data-theme='c' class='cw-target'></div>";          
        
      } else if (row.tipo == "LIS"){ // arrumar lista
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth' data-controltype='selectmenu'> <label for=carac_new_" + row.id +">"+row.descricao+":</label> " +
        "<select id='carac_new_" + row.id + "' data-native-menu='false' data-theme='c' class='cw-target'></select></div>"                                  
        // busca a lista de valores para adicionar no select
        buscaCaracteristicaListaValor(row.id, true, false);        
      } else if (row.tipo == "NUM"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_new_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_new_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";
        
      } else if (row.tipo == "DAT"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_new_" + row.id +">"+row.descricao+":</label> " +        
          "<input id='carac_new_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";        
      }
    
      imovelCaracteristicaNew = new Object();      
      imovelCaracteristicaNew.idCampo = "#carac_new_" + row.id;
      imovelCaracteristicaNew.idCaracteristica = row.id;
      
      // armazenando o id das caracteristicas para salva-las em banco
      caracteristicasImovelNew.push(imovelCaracteristicaNew);      

    }
    listaCaracteristicas.innerHTML = lista;

    // comando realizado para aplicar o estilo nos campos adicionados acima
    $("#imovelNew").enhanceWithin();     
  }

}

// colocando a lista de caracteristicas no combo de um novo imóvel
function montaCaracteristicaListaValorNew(transaction, result){  
  if (result != null && result.rows != null) {          
    // removendo possiveis valores    
    $("#carac_new_" + result.rows.item(0).caracteristica).find('option').remove().end();
    // inserindo a opção [Selecione]
    $("#carac_new_" + result.rows.item(0).caracteristica).append($("<option></option>").attr("value", 0).text("[Selecione]"));
    // inserindo os valores
    for (var i = 0; i < result.rows.length; i++){           
      $("#carac_new_" + result.rows.item(0).caracteristica).append($("<option></option>")
        .attr("value", result.rows.item(i).id).text(result.rows.item(i).descricao));      
    }                
  
    // percorrendo as caracteristicas para setar o valor
    for (index = 0; index < caracteristicasImovel.length; index++) {    
      // pegando o elemento
      carac = caracteristicasImovel[index];        
      if (carac.idCaracteristica == result.rows.item(0).caracteristica && carac.valor != null && carac.valor != ''){        
        $("#carac_new_" + result.rows.item(0).caracteristica).val(carac.valor);
        break;
      }
    }
    
    $("#carac_new_" + result.rows.item(0).caracteristica).selectmenu("refresh");    
  }  
}

// atualiza o valor do count de imoveis em aberto
function montaImoveisEmAberto(transaction, result){  
  if (result != null && result.rows != null) {    
    if (result.rows.item(0).aberto > 0){
      $('.cw-home').append("<span class='ui-li-count cw-li-count'>" + result.rows.item(0).aberto + "</span>");      
    }
  }
}

// atualiza o valor do count de imoveis em aberto
function montaImoveisFinalizado(transaction, result){  
  if (result != null && result.rows != null) {    
    if (result.rows.item(0).finalizado > 0){
      $('.cw-sinc').append("<span class='ui-li-count cw-li-count'>" + result.rows.item(0).finalizado + "</span>");      
    }      
  }
}

// armazena o local atual
function georreferenciar(){
  // verificando a conexÃ£o com a internet
  var connectionType = checkConnection();
  if (connectionType == "unknown" || connectionType == "none"){
      navigator.notification.alert(
          'Sem conexão com a Internet, não é possível Georreferenciar o imóvel.',
          function(){},
          'Atenção',
          'Fechar'
      );
      return false;
  }

  // verificando qual o ponto o usuÃ¡rio deseja georreferenciar  
  navigator.notification.confirm(
      'Você pode georreferenciar até 3 pontos.\nSelecione o ponto desejado!',  // message
      onConfirmGeorreferenciar,              // callback to invoke with index of button pressed
      'Atenção',                            // title
      '3,2,1'                                // buttonLabels
  ); 

}

function onConfirmGeorreferenciar(buttonIndex) {
    pontoGeo = buttonIndex;
    navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation, 
      {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});  
}

// funÃ§Ã£o de sucesso ao geolocalizar o imÃ³vel
function onSuccessGeolocation(position){
  // verifica qual o ponto escolhido
  if (pontoGeo == 3){
    // verifica se esta editando o imovel
    if (editandoImovel){
        document.getElementById('latitude1Edit').value = position.coords.latitude;
        document.getElementById('longitude1Edit').value = position.coords.longitude;
    } if (novaUnidadeImovel){
        document.getElementById('latitude1New').value = position.coords.latitude;
        document.getElementById('longitude1New').value = position.coords.longitude;
    } else {
        document.getElementById('latitude1').value = position.coords.latitude;
        document.getElementById('longitude1').value = position.coords.longitude;
    }
  } else if (pontoGeo == 2){
    // verifica se esta editando o imovel
    if (editandoImovel){
        document.getElementById('latitude2Edit').value = position.coords.latitude;
        document.getElementById('longitude2Edit').value =  position.coords.longitude;
    } if (novaUnidadeImovel){
        document.getElementById('latitude2New').value = position.coords.latitude;
        document.getElementById('longitude2New').value =  position.coords.longitude;      
    } else {
        document.getElementById('latitude2').value = position.coords.latitude;
        document.getElementById('longitude2').value =  position.coords.longitude;      
    }
  } else if (pontoGeo == 1){
    // verifica se esta editando o imovel
    if (editandoImovel){
        document.getElementById('latitude3Edit').value = position.coords.latitude;
        document.getElementById('longitude3Edit').value = position.coords.longitude;  
    } if (novaUnidadeImovel){
        document.getElementById('latitude3New').value = position.coords.latitude;
        document.getElementById('longitude3New').value = position.coords.longitude;  
    } else {
        document.getElementById('latitude3').value = position.coords.latitude;
        document.getElementById('longitude3').value = position.coords.longitude;        
    }    
  }

  navigator.notification.alert(
      'Ponto georreferenciado com sucesso!\n'+
      'Latitude: ' + position.coords.latitude + '\n'+
      'Longitude: ' + position.coords.longitude,
      function(){},
      'Atenção!',
      'Fechar'
  );  

/* demais atributos do position caso necessario
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');  */
}

// funÃ§Ã£o de erro ao geolocalizar o imÃ³vel
function onErrorGeolocation(error){
    navigator.notification.alert(
        'Erro ao Georreferenciar o imóvel. \n'  +
        'Código: ' + error.code + '\n' +
        'Mensagem: ' + error.message,
        function(){},
        'Erro!',
        'Fechar'
    );
}

// verifica se teve alteração de dados
function exibeAlertaAlteracao(){
  if (alterouDados){
    // pergunta se deseja remover a foto
    navigator.notification.confirm(
        'Deseja realmente sair?',  // message
        onConfirmSair,        // callback to invoke with index of button pressed
        'Atenção',                   // title
        'Sim,Não'                    // buttonLabels
    );    
  } else {
    voltarImovelSel();    
  }
}

// retorno da pergunta de alteração de dados
function onConfirmSair(buttonIndex){
  if (buttonIndex == 1){
    voltarImovelSel();
  }
}

// volta para a pagina de seleção do imovel
function voltarImovelSel(){
  $.mobile.changePage("imovelSel.html", { direction: "reverse"});
}


// armazenando dados do lote
function mostraNovaEdificacao(){  
  if (alterouDados){
    // pergunta se deseja remover a foto
    navigator.notification.confirm(
        'Você alterou alguns dados e não salvou.\nDeseja realmente criar nova unidade?',  // message
        onConfirmNovaUnidade,        // callback to invoke with index of button pressed
        'Atenção',                   // title
        'Sim,Não'                    // buttonLabels
    );    
  } else {
    abrePaginaNovaEdificacao();
  }  
}

function onConfirmNovaUnidade(buttonIndex){
  if (buttonIndex == 1){
    abrePaginaNovaEdificacao();
  }  
}

// exibe a tela para inserção de uma nova edificação
function abrePaginaNovaEdificacao(){
  novaEdificacao.inscricao_imobiliaria = document.getElementById('inscricaoImobiliariaEdit').value;  
  novaEdificacao.proprietario = document.getElementById('proprietarioImovelEdit').value;
  novaEdificacao.endereco_logradouro = document.getElementById('enderecoImovelEdit').value;
  novaEdificacao.endereco_numero = document.getElementById('numeroImovelEdit').value;
  novaEdificacao.endereco_bairro = document.getElementById('bairroImovelEdit').value;
  novaEdificacao.endereco_complemento = document.getElementById('complementoImovelEdit').value;
  novaEdificacao.endereco_cep = document.getElementById('cepImovelEdit').value;

  $.mobile.changePage("imovelNewUnit.html", {transition: "pop"});  
}


// montando a lista de caracteristicas para um novo imovel
function montaCaracteristicasNovaUnidade(transaction, result){    
  var listaCaracteristicas = document.getElementById("caracteristicaNewUnit");
  var lista = '';
  
  if (result != null && result.rows != null) {
    for (var i = 0; i < result.rows.length; i++) {
      var row = result.rows.item(i);      
      
      if (row.tipo == "TEX"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_newUnit_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_newUnit_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";          
        
      } else if (row.tipo == "DEC"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_newUnit_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_newUnit_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";          
        
      } else if (row.tipo == "MAR"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_newUnit_" + row.id +">"+row.descricao+"</label> " +
          "<input id='carac_newUnit_" + row.id +"' type='checkbox' data-theme='c' class='cw-target'></div>";          
        
      } else if (row.tipo == "LIS"){ // arrumar lista
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth' data-controltype='selectmenu'> <label for=carac_newUnit_" + row.id +">"+row.descricao+":</label> " +
        "<select id='carac_newUnit_" + row.id + "' data-native-menu='false' data-theme='c' class='cw-target'></select></div>"                                  
        // busca a lista de valores para adicionar no select
        buscaCaracteristicaListaValor(row.id, false, true);        
      } else if (row.tipo == "NUM"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_newUnit_" + row.id +">"+row.descricao+":</label> " +
          "<input id='carac_newUnit_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";
        
      } else if (row.tipo == "DAT"){
        lista = lista + "<div class='ui-block-c cw-dynamic-heigth'> <label for=carac_newUnit_" + row.id +">"+row.descricao+":</label> " +        
          "<input id='carac_newUnit_" + row.id +"' type='text' data-clear-btn='true' class='cw-target'></div>";        
      }
    
      imovelCaracteristicaNew = new Object();      
      imovelCaracteristicaNew.idCampo = "#carac_newUnit_" + row.id;
      imovelCaracteristicaNew.idCaracteristica = row.id;
      
      // armazenando o id das caracteristicas para salva-las em banco
      caracteristicasImovelNew.push(imovelCaracteristicaNew);      

    }
    listaCaracteristicas.innerHTML = lista;

    // comando realizado para aplicar o estilo nos campos adicionados acima
    $("#imovelNewUnit").enhanceWithin();     
  }

}

// colocando a lista de caracteristicas no combo de um novo imóvel
function montaCaracteristicaListaValorNewUnit(transaction, result){  
  if (result != null && result.rows != null) {          
    // removendo possiveis valores    
    $("#carac_newUnit_" + result.rows.item(0).caracteristica).find('option').remove().end();
    // inserindo a opção [Selecione]
    $("#carac_newUnit_" + result.rows.item(0).caracteristica).append($("<option></option>").attr("value", 0).text("[Selecione]"));
    // inserindo os valores
    for (var i = 0; i < result.rows.length; i++){           
      $("#carac_newUnit_" + result.rows.item(0).caracteristica).append($("<option></option>")
        .attr("value", result.rows.item(i).id).text(result.rows.item(i).descricao));      
    }                
  
    // percorrendo as caracteristicas para setar o valor
    for (index = 0; index < caracteristicasImovel.length; index++) {    
      // pegando o elemento
      carac = caracteristicasImovel[index];        
      if (carac.idCaracteristica == result.rows.item(0).caracteristica && carac.valor != null && carac.valor != ''){        
        $("#carac_newUnit_" + result.rows.item(0).caracteristica).val(carac.valor);
        break;
      }
    }
    
    $("#carac_newUnit_" + result.rows.item(0).caracteristica).selectmenu("refresh");    
  }  
}

/*
* realiza a conversao para base64 da imagem
*/
function convertFileToDataURLviaFileReader(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

