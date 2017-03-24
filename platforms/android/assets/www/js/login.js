/***************************************************************************
*   Função que ao iniciar o sistema verificará o clique no botão de login
*   29/06/15 - Rafael
*/
function realizaLogin() {
    //$("#loginForm").on("submit",function(e) {                 
        // desabilita o botão de login
        $("#login",this).attr("disabled","disabled");
            
        // verficia se informou algum valor
        if($("#username").val() != '' && $("#password").val() != '') {
            //$.mobile.changePage("html/inicial/inicial.html", {transition: "fade"});
            // verificando se o dia ja foi sincronizado
            isDiaSincronizado();                            
        } else {
            // solicita ao usuário informar um login e uma senha                
            navigator.notification.alert(
                'Você deve informar um Login e uma Senha!',
                function(){},
                'Atenção!',
                'Fechar');
            
            // habilita o botão
            $("#login").removeAttr("disabled");
        }
        return false;
   // });
}


// função de retorno da busca pelo dia sincronizado
function realizaSincronizacaoLogin(transition,result){     
    // se encontrou o usuário
    if (result.rows.length > 0){  
        // se for maior que zero o resultado é porque já fez a sincronização
        if (result.rows.item(0).contador > 0){            
            buscaUsuario($("#username").val());
        } else {        
            verificaUsuarioCadastrado($("#username").val());        
        }
    }
}

/**
* Habilita o botão de login e limpa os campos da tela
*/
function habilitaLogin(){
    // limpando o valor dos campos 
    $("#username").val('');
    $("#password").val('');
    // removendo o disabled do botão login
    $("#login").removeAttr("disabled");
}

// verificando se o usuario ja esta cadastrado e não tem atividades para o dia
function validaLoginUsuarioCadastrado(transition,result){     
    // se encontrou o usuário
    if (result.rows.length > 0){
        // encriptografando a senha      
        var senhaUsuario = $("#password").val();                
        var senhaCrip = $.md5(senhaUsuario);                        
        // verificando a senha informada com a armazenada
        if (result.rows.item(0).senha.toUpperCase() == senhaCrip.toUpperCase()){   
        
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
            // pergunta se deseja sincronizar os dados com o usuario informado
            navigator.notification.confirm(
                'Atividades de hoje ainda não foram sincronizadas!\nDeseja sincronizar os dados?',  // message
                onConfirmDiaNaoEncontrado,  // callback to invoke with index of button pressed
                'Atenção',                      // title
                'Sim,Não'                       // buttonLabels        
            );        
        } else {
            habilitaLogin();
            // senha inválida
            navigator.notification.alert(
                'Senha inválida!',
                function(){},
                'Atenção!',
                'Fechar');            
        }        
        
    } else {
        // pergunta se deseja sincronizar os dados com o usuario informado
        navigator.notification.confirm(
            'Usuário não encontrado!\nVocê pode sincronizar os dados desse usuário, porém os dados sincronizados anteriormente serão perdidos.\nDeseja sincronizar os dados?',  // message
            onConfirmUsuarioNaoEncontrado,  // callback to invoke with index of button pressed
            'Atenção',                      // title
            'Sim,Não'                       // buttonLabels        
        );       
    }
}

// realiza a validação dos dados informados no login
function validaLogin(transition,result){     
    // se encontrou o usuário
    if (result.rows.length > 0){           
        // encriptografando a senha      
        var senhaUsuario = $("#password").val();                
        var senhaCrip = $.md5(senhaUsuario);                        
        // verificando a senha informada com a armazenada
        if (result.rows.item(0).senha.toUpperCase() == senhaCrip.toUpperCase()){   

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

            // direcionando para a pagina principal                 
            $.mobile.changePage("html/inicial/inicial.html", {transition: "fade"});            
        } else {
            habilitaLogin();
            // senha inválida
            navigator.notification.alert(
                'Senha inválida!',
                function(){},
                'Atenção!',
                'Fechar');            
        }

    } else {        
        // pergunta se deseja sincronizar os dados com o usuario informado
        navigator.notification.confirm(
            'Usuário não encontrado!\nVocê pode sincronizar os dados desse usuário, porém os dados sincronizados anteriormente serão perdidos.\nDeseja sincronizar os dados?',  // message
            onConfirmUsuarioNaoEncontrado,  // callback to invoke with index of button pressed
            'Atenção',                      // title
            'Sim,Não'                       // buttonLabels        
        );
    }
}

// retorno da pergunta quando não encontrou o usuário
function onConfirmUsuarioNaoEncontrado(buttonIndex){
    if (buttonIndex == 1){
        sincronizarDados();
    }
}

function onConfirmDiaNaoEncontrado(buttonIndex){
    if (buttonIndex == 1){
        sincronizarDadosDia();
    }
}