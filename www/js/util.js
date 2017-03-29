/**
*   Volta para a página principal do sistema
*   29/06/15 - Rafael
*/
function voltarIndex(){
  habilitaLogin();
  // direcionando para a pagina principal                            
  $.mobile.changePage("../../index.html", { transition: "fade"});    
}

  /**
  *
  */  
function _GET(nome, urlEntrada){
  if (urlEntrada != null) {
    urlEntrada = urlEntrada.slice(47);
    var url   = urlEntrada.replace("?", "");
    var itens = url.split("&");

    for(n in itens){
        if( itens[n].match(nome) ){            
            return decodeURIComponent(itens[n].replace(nome+"=", ""));
        }
    }
    return null;
  }
}


/** gera o token para sincronizaão dos dados */
function gerarTokenSync(loginUsuario, senhaUsuario){
  // cripitografando a senha informada pelo usuario
  var senhaCrip = $.md5(senhaUsuario);

  // concatenando a data atual no formato esperado yyyyMMddHH
  var dataAtual = getDataAtual(false, true);

  // retorna o token critptografado
  return $.md5(loginUsuario + senhaCrip.toUpperCase() + dataAtual);
}

// retorna a data atual de acordo com os parametros informados
function getDataAtual(exibeSeparador, exibeHoras){
  // ajustando a data atual
  var fullDate = new Date();
  // acrescenta o 0 caso o mes for menor que 10
  var mes = ("0" + (fullDate.getMonth() + 1)).slice(-2);
  // acrescenta o 0 caso o dia for menor que 10
  var dia = ("0" + fullDate.getDate()).slice(-2);
  // acrescenta o 0 caso a hora for menor que 10
  var horas =  ("0" + fullDate.getHours()).slice(-2);

  if (exibeHoras){
    return fullDate.getFullYear() + mes + dia;//  + horas;
  }

  if (exibeSeparador){
    return fullDate.getFullYear() + '-' + mes + '-' + dia;
  } 
}