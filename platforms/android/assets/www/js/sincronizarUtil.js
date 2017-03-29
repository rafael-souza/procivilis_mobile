var token;
var retornoRequest = [];
var retornoEnvio = [];
//var listaCaracteristicas = [];

// realiza o sincronismo das atividades do dia para o usuario preservando as atividaes anteriores
function sincronizarDadosDia(){
    // exibindo a tela de espera
    $.mobile.loading( "show", {
        text: "Aguarde! Sincronizando dados...",
        textVisible: true,
        theme: "d",
        textonly: false,
        html: ""
    });

    // gerando o token para o acesso ao servidor
    token = gerarTokenSync($("#username").val(), $("#password").val());

    // 00 - LIMPA O BANCO DE DADOS caso seja necessário
    iniciarBanco();

    // 04 - SINCRONIZANDO A INSCRICAO IMOBILIARIA
    var urlSyncCarc = urlSync + "rmbinscricaoimobiliaria?token=" + token + "(" + $("#username").val() + ")" ;            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {         
            if (data.rmbinscricaoimobiliaria != null && data.rmbinscricaoimobiliaria.length > 0){
                retornoRequest = data.rmbinscricaoimobiliaria;             
                db.transaction(populateInscricaoDB, errorHandler, sincronizarInscricaoImobiliariaCaracteristica);
            } else if (data.rmbinscricaoimobiliaria != null && data.rmbinscricaoimobiliaria.length == 0){
                // exibindo mensagem que informa que não possui nenhuma atividade para hoje 
                // e direcionando para a pagina principal
                navigator.notification.alert(
                    'Não existe nenhuma atividade definida para o dia de hoje',
                    redirecionarPaginaInicial,
                    'Atenção!',
                    'Fechar');                                  
            } else {                
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });


}

// chamada principal da sincronização dos dados
function sincronizarDados(){    
    // exibindo a tela de espera
    $.mobile.loading( "show", {
        text: "Aguarde! Sincronizando dados...",
        textVisible: true,
        theme: "d",
        textonly: false,
        html: ""
    });

    // gerando o token para o acesso ao servidor
    token = gerarTokenSync($("#username").val(), $("#password").val());

    // 00 - LIMPA O BANCO DE DADOS caso seja necessário
    iniciarBanco();    
    db.transaction(clearDataBase, errorHandler, function(){});    

    //--------------------------------------------------------------------------------------------------------
    // 01 - SINCRONIZANDO O USUÃ�RIO
    var urlSyncUser = urlSync + "segusuario?token=" + token + "(" + $("#username").val() + ")";
    
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncUser,
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,        
        // retorno de sucesso da chamada
        success: function( data ) {
            if (data.segusuario != null){
                retornoRequest = data.segusuario;
                db.transaction(populateUserDB, errorHandler, sincronizarCaracteristicas);
            } else {
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;          
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });

}

function populateUserDB(tx){
    // vai inserir usuario no banco            
    tx.executeSql('INSERT INTO mob_usuario(id, login, senha) VALUES (?,?,?) ',
        [retornoRequest[0].id, retornoRequest[0].loginUsuario, 
        retornoRequest[0].senhaUsuario]);                
}

/**
* Realiza o sincronismo das caracteristicas
*/
function sincronizarCaracteristicas(){
var urlSyncCarc = urlSync + "rmbcaracteristica?token=" + token + "(" + $("#username").val() + ")";            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {                             
            if (data.rmbcaracteristica != null && data.rmbcaracteristica.length > 0){              
                retornoRequest = data.rmbcaracteristica;
                db.transaction(populateCaracteristicaDB, errorHandler, sincronizaValorCaracteristicas);                           
            } else {
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });  
}

function populateCaracteristicaDB(tx){
    // percorrendo o vetor de caracteristicas para inserção  
    for ( var i = 0; i < retornoRequest.length; i++ ) {               
        var caracteristica = retornoRequest[i];    
        tx.executeSql('INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (?,?,?,?) ',
            [caracteristica.id, caracteristica.tipoCaracteristica.id, 
            caracteristica.nome, caracteristica.codigo]);    
    }
}


/**
* Realiza o sincronismo do valor das caracteristicas
*/
function sincronizaValorCaracteristicas(){
    // 03 - SINCRONIZANDO A CARACTERISTICA LISTA VALOR
    var urlSyncCarc = urlSync + "rmbcaracteristicalistavalor?token=" + token + "(" + $("#username").val() + ")" ;            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {         
            if (data.rmbcaracteristicalistavalor != null && data.rmbcaracteristicalistavalor.length > 0){       
                retornoRequest = data.rmbcaracteristicalistavalor;             
                db.transaction(populateCaracteristicaValorDB, errorHandler, sincronizarInscricaoImobiliaria);                     
            } else {                
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });
}

function populateCaracteristicaValorDB(tx){
    // percorrendo o vetor de caracteristicas para inserção  
    for ( var i = 0; i < retornoRequest.length; i++ ) {                     
      var valor = retornoRequest[i];    
      tx.executeSql('INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (?,?,?) ',
        [valor.id, valor.nome, valor.caracteristica.id]);    
    } 
}

/**
* Realiza o sincronismo das inscrições imobiliarias
*/
function sincronizarInscricaoImobiliaria(){
 // 04 - SINCRONIZANDO A INSCRICAO IMOBILIARIA
    var urlSyncCarc = urlSync + "rmbinscricaoimobiliaria?token=" + token + "(" + $("#username").val() + ")" ;            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {         
            if (data.rmbinscricaoimobiliaria != null && data.rmbinscricaoimobiliaria.length > 0){
                retornoRequest = data.rmbinscricaoimobiliaria;             
                db.transaction(populateInscricaoDB, errorHandler, sincronizarInscricaoImobiliariaCaracteristica);
            } else if (data.rmbinscricaoimobiliaria != null && data.rmbinscricaoimobiliaria.length == 0){                
                // exibindo mensagem que informa que não possui nenhuma atividade para hoje 
                // e direcionando para a pagina principal
                navigator.notification.alert(
                    'Não existe nenhuma atividade definida para o dia de hoje',
                    redirecionarPaginaInicial,
                    'Atenção!',
                    'Fechar');                                  
                
            } else {                
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });
}

function populateInscricaoDB(tx){
    // percorrendo o vetor de inscrições para inserção  
    for ( var i = 0; i < retornoRequest.length; i++ ) {                     
      var inscricao = retornoRequest[i];    
      tx.executeSql('INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, ' +
            'endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade, endereco_complemento, endereco_cep, id_atividade) VALUES (?,?,?,?,?,?,?,?,?,?,?) ',
        [inscricao.id, inscricao.id, inscricao.inscricaoImobiliaria, inscricao.proprietarios,
        inscricao.nomeLogradouro, inscricao.endereco.numero, inscricao.nomeBairro, 
        inscricao.nomeCidade,inscricao.endereco.complemento, inscricao.descricaoCep, inscricao.idAtividade]);    
    }
}


function sincronizarInscricaoImobiliariaCaracteristica(){
    // 05 - SINCRONIZANDO INSCRICAO IMOBILIARIA  CARACTERISTICA
    var urlSyncCarc = urlSync + "rmbinscricaoimobiliariaorigemdadoscaracteristica?token=" + token + "(" + $("#username").val() + ")" ;            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {         
            if (data.rmbinscricaoimobiliariaorigemdadoscaracteristica != null && data.rmbinscricaoimobiliariaorigemdadoscaracteristica.length > 0){    
                retornoRequest = data.rmbinscricaoimobiliariaorigemdadoscaracteristica;
                db.transaction(populateInscricaoCaracteristicaDB, errorHandler, sincronizarAtividades);                   
            } else {                
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });
}

function populateInscricaoCaracteristicaDB(tx){
    // percorrendo o vetor de caracteristicas para inserção  
    for ( var i = 0; i < retornoRequest.length; i++ ) {                     
      var caracteristica = retornoRequest[i];    
      tx.executeSql('INSERT INTO mob_inscricao_imobiliaria_caracteristica ' +
        '(valor_cti,caracteristica,inscricao_imobiliaria) VALUES (?,?,?) ',
        [caracteristica.valorCti, caracteristica.idCaracteristica, 
        caracteristica.idInscricaoImobiliaria]);    
    } 
}

function sincronizarAtividades(){
  // 05 - SINCRONIZANDO INSCRICAO IMOBILIARIA  CARACTERISTICA
    var urlSyncCarc = urlSync + "rmbatividadeequipe?token=" + token + "(" + $("#username").val() + ")" ;            
    // realiza a chamada no servidor
    $.ajax({
        url: urlSyncCarc,                
        type: 'GET',
        async: false,
        cache: false,
        timeout: 90000,
        // retorno de sucesso da chamada
        success: function( data ) {         
            if (data.rmbatividadeequipe != null && data.rmbatividadeequipe.length > 0){ 
                retornoRequest = data.rmbatividadeequipe;  
                db.transaction(populateAtividadesDB, errorHandler, finalizarSincronismo);            
            } else {                
                data = $.parseJSON(data);
                exibeErroSincronizar(data);
                return;
            }
        },

        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return;
        }
    });
}

function populateAtividadesDB(tx){
    // percorrendo o vetor de caracteristicas para inserção  
    for ( var i = 0; i < retornoRequest.length; i++ ) {                     
        var atividade = retornoRequest[i];    
        tx.executeSql('INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, '+
            'inscricao_imobiliaria, id_atividade_original) VALUES  (?,?,?,?,?,?,?) ',
            [atividade.id, atividade.descricao,atividade.statusAtividadeMobile, 
            atividade.dataInicial,atividade.sequencia,atividade.inscricaoImobiliaria.id,
            atividade.idAtividadeOriginal]);     
    } 
}

/*
* Finaliza o sincronismo dos dados
*/ 
function finalizarSincronismo(){
    db.transaction(populateSincronismoDB, errorHandler, redirecionarPaginaInicial);                
}

/*
* Inserindo o registro de sincronismo do dia
*/
function populateSincronismoDB(tx){
    loginUsuario = $("#username").val();
    // pegando a data atual para salvar o sincronismo do dia
    var dataAtual = getDataAtual(true,false);
    tx.executeSql('INSERT INTO mob_controle_sinc(login, data_atividade) VALUES (?,?) ',
        [loginUsuario, dataAtual]);
}

/*
* Redirecionando para a página principal
*/
function redirecionarPaginaInicial(){
    // escondendo o loading
    $.mobile.loading( "hide" );     
    
    window.localStorage.setItem("usuario_logado", $("#username").val());
    window.localStorage.setItem("senha_usuario_logado", $("#password").val());

    // verificando se é para lembrar usuario e senha
    if ($("#remember-login").prop('checked')){
        window.localStorage.setItem("remember_login", true);
        window.localStorage.setItem("user_login", $("#username").val());
        window.localStorage.setItem("pass_login", $("#password").val());
    } else {
        window.localStorage.setItem("remember_login", false);
        window.localStorage.setItem("user_login", "");
        window.localStorage.setItem("pass_login", "");
    }

    // apÃ³s a sincronização total direciona a pagina inical do app     
    $.mobile.changePage("html/inicial/inicial.html", {transition: "fade"});     
}

/* 
* Exibe o erro ao realizar a sincronização
*/
function exibeErroSincronizar(data){

    // escondendo o loading
    $.mobile.loading( "hide" ); 

    navigator.notification.alert(
        'Erro ao realizar a sincronização dos dados!\n' +
        'Mensagem: ' + data.messages.erro,
        function(){},
        'Atenção!',
        'Fechar');                  
}

// tratamento de erro ao realizar a sincronização
function trataErroSincronizacao(jqXHR, exception){
    
    // escondendo o loading
    $.mobile.loading( "hide" ); 

    var mensagem;
    if (jqXHR.status === 0) {
        mensagem = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        mensagem = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {   
        mensagem = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        mensagem = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        mensagem = 'Time out error.';
    } else if (exception === 'abort') {
        mensagem = 'Ajax request aborted.';
    } else {
        mensagem = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    // exibe o erro
    navigator.notification.alert(
        'Erro ao realizar a sincronização dos dados!\n' +
        'Mensagem: ' + mensagem,
        function(){},
        'Atenção!',
        'Fechar');  
}


//---------------funções abaixo são referentes ao envio dos dados para o sistema! --------------//

/**
* Exibe mensagem de confirmação para enviar os dados
*/
function enviarDados(){
  // pegando a quantidade de registros que falta para sincronizar
  var count = $('.cw-sinc').find('.ui-li-count').text();
  
  if (count > 0){
      // verificando qual o ponto o usuÃ¡rio deseja georreferenciar  
      navigator.notification.confirm(
          'Existem ' + count + ' imóvel(is) a serem sincronizados.\nDeseja enviar os dados agora?',  // message
          onConfirmEnviarDados,              // callback to invoke with index of button pressed
          'Atenção',                            // title
          'Sim,Não'                                // buttonLabels
      ); 
    
  } else {
    // informando que não existem dados a serem enviados
    navigator.notification.alert(
        'Não existem imóvies a serem sincronizados',
        function(){},
        'Atenção!',
        'Fechar');      
  }
}

/*
* Verifica o retorno da cofirmação do envio dos dados
*/
function onConfirmEnviarDados(buttonIndex){
 if (buttonIndex == 1){
    // verificando a conexÃ£o com a internet
    var connectionType = checkConnection();
    if (connectionType == "unknown" || connectionType == "none"){
        navigator.notification.alert('Não é possível enviar os dados.\nSem conexão com a internet.', function(){}, 'Atenção!', 'Fechar');          
    } else {
        realizarEnvioDados();
    }    
  }
}

/*
* Realizando a busca dos dados para o envio
*/
function realizarEnvioDados(){

    // exibindo a tela de espera
    $.mobile.loading( "show", {
        text: "Aguarde! Enviando dados...",
        textVisible: true,
        theme: "d",
        textonly: false,
        html: ""
    });
    
    // 00 - iniciando o banco de dados para pesquisa dos imoveis que serão sincronizados
    iniciarBanco();

    db.transaction(function(transaction) {
        transaction.executeSql("select " +
            "ins.id, "+
            "ins.codigo, "+
            "ins.inscricao_imobiliaria, "+
            "ins.proprietario, " +
            "ins.endereco_logradouro, "+
            "ins.endereco_numero, "+
            "ins.endereco_bairro, "+
            "ins.endereco_complemento, "+
            "ins.endereco_cep, "+
            "ins.endereco_cidade, "+
            "ins.foto_adicional1, "+
            "ins.foto_adicional2, "+
            "ins.foto_app_fachada, " +
            "ins.foto_app_adicional1, " +
            "ins.foto_app_adicional2, " +
            "ins.foto_fachada, "+
            "ins.latitude_ponto_um, "+
            "ins.longitude_ponto_um, "+
            "ins.latitude_ponto_dois, "+
            "ins.longitude_ponto_dois, "+
            "ins.latitude_ponto_tres, "+
            "ins.longitude_ponto_tres, "+
            "ins.id_atividade "+
            "from mob_atividade atv inner join mob_inscricao_imobiliaria ins  " +
            "on (atv.inscricao_imobiliaria = ins.id)  " +
            "where  " +
            "atv.status = 'FIN' ", [],
          buscarCaracterisciasImovies, errorHandler);
      });
}

/**
* Buscando as caracteristicas dos imóveis para o envio dos dados 
*/
function buscarCaracterisciasImovies(transaction, result){
    retornoEnvio = [];
     // percorrendo os imoveis para enviar um a um
    if (result != null && result.rows != null) {
        // adicionando os registro no array de retornoRequest
        for (var i = 0; i < result.rows.length; i++) {          
          retornoEnvio.push(result.rows.item(i));
        }
        
        // buscando as caracteristicas dos imoveis
        db.transaction(function(transaction) {
        transaction.executeSql("select " +
            "ins.id as idInscricaoImobiliaria, " +
            "inscar.valor as valorCaracteristica, "+
            "car.tipo as tipoCaracteristica, " +
            "car.id as idCaracteristica " +
            "from mob_atividade atv " + 
            "inner join mob_inscricao_imobiliaria ins  " +
            "on (atv.inscricao_imobiliaria = ins.id)  " +
            "inner join mob_inscricao_imobiliaria_caracteristica inscar " +
            "on (inscar.inscricao_imobiliaria = ins.id) " +
            "inner join mob_caracteristica car " +
            "on (car.id = inscar.caracteristica) " +
            "where  " +
            "atv.status = 'FIN' order by ins.id ", [],
            montarDadosParaEnvio, errorHandler);
        });
    }
}

/**
* Montando os dados de mestre/detalhe para envio das informações
*/
function montarDadosParaEnvio(transaction, result){
    // verificando se teve algum resultado na pesquisa
    if (result != null && result.rows != null) {
        // percorrendo os imoveis e coletando suas caracteristicas            
        for ( var i = 0; i < retornoEnvio.length; i++ ) {                     
            var inscricao = retornoEnvio[i];
            inscricao.inscricaoImobiliariaCaracteristica = [];
            // percorrendo as caracteristicas para atribui-las ao seu imóvel
            for (var j = 0; j < result.rows.length; j++) {
                var caracteristica = result.rows.item(j);
                if (inscricao.id == caracteristica.idInscricaoImobiliaria){
                    inscricao.inscricaoImobiliariaCaracteristica.push(caracteristica);
                }
            }
        }

        enviarImoveis();
    }
}

/**
* Realiza o envio dos dados
*/
function enviarImoveis(){    
    // pegando o nome e senha do usuario
    var usuario = window.localStorage.getItem("usuario_logado");
    var senha = window.localStorage.getItem("senha_usuario_logado");        
    // gerando o token para o acesso ao servidor
    token = gerarTokenSync(usuario, senha);    

    // gerando a url de envio dos dados
    var urlSyncImo = urlSync + "mobapuradomobile?token=" + token + "(" + usuario + ")";

    // ajustando os dados para o envio
    var listaInscricaoImobiliaria = listaInscricaoImobiliaria = ajustaInscricaoParaEnviar(retornoEnvio); 
    
    // transformando o objeto em uma string json
    var obj = JSON.stringify({ mobapuradomobile: listaInscricaoImobiliaria });            
    // enviando os dados
    $.ajax({
        url: urlSyncImo,
        type: 'POST',
        contentType: "application.mob/json; charset=utf-8",
        data: obj,
        dataType: 'json',        
        success: function (data) {
            // atualizando os dados dos imóveis para o status ENVIADO
            atualizaStatusImovelFinalizado();                     
        },
        
        // retorno de erro da chamada
        error: function(jqXHR, exception) {
            trataErroSincronizacao(jqXHR, exception);
            return false;
        }

    });   
}

/*
* Ajustando as incrições para receberem mestre-detalhe
*/
function ajustaInscricaoParaEnviar(retornoEnvio){
    // criando o objeto de retorno
    var listaInscricaoImobiliaria = [];
    // percorrendo a lista de objeos populada
    for ( var i = 0; i < retornoEnvio.length; i++ ) {                     
        // pegando o objeto atual
        var inscricaoImobiliaria = retornoEnvio[i];
        // criando um novo objeto
        var inscricao = new Object();
        // alimentando os dados do novo objeto para o padrão desejado
        //inscricao.id = inscricaoImobiliaria.id;
        inscricao.codigo = inscricaoImobiliaria.codigo;
        inscricao.mobInscricaoImobiliaria = inscricaoImobiliaria.inscricao_imobiliaria;
        inscricao.proprietario = inscricaoImobiliaria.proprietario;
        inscricao.enderecoLogradouro = inscricaoImobiliaria.endereco_logradouro;
        inscricao.enderecoNumero = inscricaoImobiliaria.endereco_numero;
        inscricao.enderecoBairro = inscricaoImobiliaria.endereco_bairro;
        inscricao.enderecoComplemento = inscricaoImobiliaria.endereco_complemento;
        inscricao.enderecoCep = inscricaoImobiliaria.endereco_cep;
        inscricao.enderecoCidade = inscricaoImobiliaria.endereco_cidade;    
        inscricao.latitudePontoUm = inscricaoImobiliaria.latitude_ponto_um;
        inscricao.longitudePontoUm = inscricaoImobiliaria.longitude_ponto_um;
        inscricao.latitudePontoDois = inscricaoImobiliaria.latitude_ponto_dois;
        inscricao.longitudePontoDois = inscricaoImobiliaria.longitude_ponto_dois;
        inscricao.latitudePontoTres = inscricaoImobiliaria.latitude_ponto_tres;
        inscricao.longitudePontoTres = inscricaoImobiliaria.longitude_ponto_tres;
        inscricao.idAtividade = inscricaoImobiliaria.id_atividade;
        // declarando o array de caracteristicas
        inscricao.inscricaoImobiliariaCaracteristica = [];

        // ajustando as caracteristicas
        for ( var j = 0; j < inscricaoImobiliaria.inscricaoImobiliariaCaracteristica.length; j++ ) {                     
            var carac = inscricaoImobiliaria.inscricaoImobiliariaCaracteristica[j];
            var inscricaoImobiliariaCaracteristica = new Object();
            // alimentando o id da inscrição imobiliaria
            inscricaoImobiliariaCaracteristica.inscricaoImobiliaria =  carac.idInscricaoImobiliaria;
            // verifcando o tipo da caracteristica e alimentando o valor devido
            switch(carac.tipoCaracteristica) {                
                case 'TEX':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){
                        inscricaoImobiliariaCaracteristica.valorTexto = carac.valorCaracteristica;
                    } else {
                        inscricaoImobiliariaCaracteristica.valorTexto = null;
                    }
                    break;
                case 'NUM':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){
                        inscricaoImobiliariaCaracteristica.valorNumerico = carac.valorCaracteristica;
                    } else {
                        inscricaoImobiliariaCaracteristica.valorNumerico = null;
                    }
                    break;               
                case 'DEC':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){
                        inscricaoImobiliariaCaracteristica.valorDecimal = carac.valorCaracteristica;
                    } else {
                        inscricaoImobiliariaCaracteristica.valorDecimal = null;
                    }
                    break;               
                case 'DAT':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){
                        inscricaoImobiliariaCaracteristica.valorData = carac.valorCaracteristica;
                    } else {
                        inscricaoImobiliariaCaracteristica.valorData = null;
                    }
                    break;               
                case 'MAR':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){
                        inscricaoImobiliariaCaracteristica.valorMarcacao = carac.valorCaracteristica;
                    } else {
                        inscricaoImobiliariaCaracteristica.valorMarcacao = null;
                    }
                    break;               
                case 'LIS':
                    if (carac.valorCaracteristica != null && carac.valorCaracteristica != ''){  
                        inscricaoImobiliariaCaracteristica.valorLista = carac.valorCaracteristica;  
                    } else {
                        inscricaoImobiliariaCaracteristica.valorLista = null;
                    }
                    break;               
            }

            // verificando o tipo da caracteristica                                                    
            inscricaoImobiliariaCaracteristica.caracteristica = carac.idCaracteristica;

            inscricao.inscricaoImobiliariaCaracteristica.push(inscricaoImobiliariaCaracteristica);
        }


        if (inscricaoImobiliaria.foto_app_adicional1 != null){            
            inscricao.fotoAppAdicional1 = inscricaoImobiliaria.foto_app_adicional1;                    
        }

        if (inscricaoImobiliaria.foto_app_adicional2 != null){
            inscricao.fotoAppAdicional2 = inscricaoImobiliaria.foto_app_adicional2;
        }

        if (inscricaoImobiliaria.foto_app_fachada != null){
            inscricao.fotoAppFachada = inscricaoImobiliaria.foto_app_fachada;            
        }

        inscricao.usuarioColeta = window.localStorage.getItem("usuario_logado");
        inscricao.fotoImportada = false;
        inscricao.coletaCriada = false;

        // inserindo o novo objeto na lista
        listaInscricaoImobiliaria.push(inscricao);

    }
    // retornando a lista com os dados ajustados
    return listaInscricaoImobiliaria;
}

/*
* Atualizando as atividades para o status ENVIADO
*/
function atualizaStatusImovelFinalizado(){
   
    iniciarBanco();
     // buscando as caracteristicas dos imoveis
    db.transaction(function(transaction) {
        transaction.executeSql("update mob_atividade set status = 'ENV' where status = 'FIN' ", [],
            informaEnvioSucesso, errorHandler);
    });
}

/*
* Esconde o loading e informa que o envio foi realizado com sucesso
*/
function informaEnvioSucesso(){
    // escondendo o loading
    $.mobile.loading( "hide" );

    // informando que os dados foram enviados com sucesso
    navigator.notification.alert(
        'Dados enviados com sucesso!',
        function(){},
        'Atenção!',
        'Fechar');    

    // ajustando o active do navbar
    if($.mobile.activePage.is('#inicial')){      
        $.mobile.changePage("../imovel/imovelSel.html", {transition: "fade"});
    } else {      
        $.mobile.changePage("../inicial/inicial.html", { transition: "fade"});
    } 
}
