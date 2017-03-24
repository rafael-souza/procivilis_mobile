
// lista os valores inseridos no banco
function listaImovel() {  
  iniciarBanco();
  db.transaction(function(transaction) {
    transaction.executeSql("select " +
    		"atv.id as id_atividade,  " +
        "atv.status, " +
    		"ins.id as id_inscricao_imobiliaria,  " +
    		"ins.inscricao_imobiliaria, " +
    		"ins.foto_fachada, " +
    		"ins.proprietario, " +
    		"ins.endereco_logradouro, " +
    		"ins.endereco_numero " +
    		"from mob_atividade atv inner join mob_inscricao_imobiliaria ins  " +
    		"on (atv.inscricao_imobiliaria = ins.id)  " +
//    		"where  " +
  //  		"atv.data_atividade = date()  " +
        "order by atv.status, atv.ordem asc ", [],
      mostrarListaImovel, errorHandler);
  });  
  return;
}

// visualizando um imovel
function visualizarImovel(id){  
  iniciarBanco();
  db.transaction(function(transaction) {
    transaction.executeSql('SELECT * FROM mob_inscricao_imobiliaria WHERE id = ?',[id], mostrarImovel, errorHandler);
  });
}

// buscando a lista de inscricao_imobiliaria_caracteristica
function buscaCaracteristicasImovel(id){
  iniciarBanco();
  db.transaction(function(transaction) {
    transaction.executeSql(" SELECT ic.id, ic.valor_cti, ic.valor, ca.tipo, ca.id as idCaracteristica, ca.descricao, ic.alterado FROM " +
      "mob_inscricao_imobiliaria_caracteristica ic  left outer join mob_caracteristica ca " + 
      "on (ic.caracteristica = ca.id) WHERE ic.inscricao_imobiliaria = ? order by ca.ordem ", [id], 
      montaCaracteristicas, errorHandler);
  }); 
}

// busca as caracteristicas lista valor da caracteristica passada por parametro
function buscaCaracteristicaListaValor(id, novoImovel, novaUnidade){  
  iniciarBanco();  
  if (novoImovel){
    db.transaction(function(transaction) {
      transaction.executeSql(" SELECT * FROM mob_caracteristica_lista WHERE caracteristica = ?", [id],
        montaCaracteristicaListaValorNew, errorHandler);
    });
  } else if (novaUnidade){
    db.transaction(function(transaction) {
      transaction.executeSql(" SELECT * FROM mob_caracteristica_lista WHERE caracteristica = ?", [id],
        montaCaracteristicaListaValorNewUnit, errorHandler);
    });
  } else {
    db.transaction(function(transaction) {
      transaction.executeSql(" SELECT * FROM mob_caracteristica_lista WHERE caracteristica = ?", [id],
        montaCaracteristicaListaValor, errorHandler);
    });
  }
}


// grava uma imóvel no banco
function gravarImovelBd(imovel, listaImovelCaracteristicaNew) {    

    db.transaction(function(transaction) {

      transaction.executeSql('INSERT INTO mob_inscricao_imobiliaria('+          
          'inscricao_imobiliaria, '+
          'proprietario, '+
          'endereco_logradouro, '+
          'endereco_numero, '+
          'endereco_bairro, '+
          'endereco_complemento, '+
          'endereco_cep, '+ 
          'latitude_ponto_um, '+
          'longitude_ponto_um, '+
          'latitude_ponto_dois, '+
          'longitude_ponto_dois, '+
          'latitude_ponto_tres, '+
          'longitude_ponto_tres, ' +
          'foto_adicional1, '+
          'foto_adicional2, '+
          'foto_fachada, '+
          'foto_app_fachada, '+
          'foto_app_adicional1, '+
          'foto_app_adicional2) '+ 
          'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ',
        [imovel.inscricao_imobiliaria, imovel.proprietario, imovel.endereco_logradouro, 
          imovel.endereco_numero, imovel.endereco_bairro, imovel.endereco_complemento,
          imovel.endereco_cep, imovel.latitude_ponto_um, imovel.longitude_ponto_um,
          imovel.latitude_ponto_dois, imovel.longitude_ponto_dois, imovel.latitude_ponto_tres,
          imovel.longitude_ponto_tres, imovel.foto_adicional1, imovel.foto_adicional2, 
          imovel.foto_fachada, imovel.foto_app_fachada, imovel.foto_app_adicional1, 
          imovel.foto_app_adicional2], null, errorHandler);

          // buscando o id do imovel inserido
          transaction.executeSql('select max(id) as inscricao from mob_inscricao_imobiliaria ',[], function(transaction,result) {
              idImovel = result.rows.item(0).inscricao;                  
              // percorrendo as caracteristicas para atualizar seus valores    
              for (index = 0; index < listaImovelCaracteristicaNew.length; index++) {      
                // pegando o elemento
                carac = listaImovelCaracteristicaNew[index];
                // inserindo a inscricao imobiliaria caracteristica
                transaction.executeSql('INSERT INTO mob_inscricao_imobiliaria_caracteristica ' +
                  '(valor, caracteristica, inscricao_imobiliaria) VALUES (?,?,?) ', 
                  [carac.valor, carac.id, idImovel], null, null);
              }
            
              var dataAtual = getDataAtual(true, false);                          
              var status = 'ABE';
            
              // inserindo a inscricao imobiliaria caracteristica
              transaction.executeSql('INSERT INTO mob_atividade ' +
                '(status, data_atividade, inscricao_imobiliaria) VALUES (?,?,?) ', 
                [status, dataAtual, idImovel], null, null);
              
          });

      },errorHandler, successImovelCallBack);
}

// atualizando um imovel e suas caracteristicas
function atualizarImovelBd(imovel, listaImovelCaracteristica){
    db.transaction(function(transaction) {

      transaction.executeSql('UPDATE mob_inscricao_imobiliaria SET ' +
          'codigo = ?, '+
          'inscricao_imobiliaria = ?, '+
          'proprietario = ?, '+
          'endereco_logradouro = ?, '+
          'endereco_numero = ?, '+
          'endereco_bairro = ?, '+
          'endereco_complemento = ?, '+
          'latitude_ponto_um = ?, '+
          'longitude_ponto_um = ?, '+
          'latitude_ponto_dois = ?, '+
          'longitude_ponto_dois = ?, '+
          'latitude_ponto_tres = ?, '+
          'longitude_ponto_tres = ?, ' +
          'endereco_cep = ?, '+
          'foto_adicional1 = ?, '+ 
          'foto_adicional2 = ?, '+ 
          'foto_fachada = ?, ' +
          'foto_app_fachada = ?, '+
          'foto_app_adicional1 = ?, '+
          'foto_app_adicional2 = ?  WHERE id = ? ', 
    [ imovel.codigo, imovel.inscricao_imobiliaria, imovel.proprietario, imovel.endereco_logradouro, 
          imovel.endereco_numero, imovel.endereco_bairro, imovel.endereco_complemento,
          imovel.latitude_ponto_um, imovel.longitude_ponto_um, 
          imovel.latitude_ponto_dois, imovel.longitude_ponto_dois,
          imovel.latitude_ponto_tres, imovel.longitude_ponto_tres, 
          imovel.endereco_cep, imovel.foto_adicional1, 
          imovel.foto_adicional2, imovel.foto_fachada, imovel.foto_app_fachada, 
          imovel.foto_app_adicional1, imovel.foto_app_adicional2, imovel.id], null, errorHandler);

    // percorrendo as caracteristicas para atualizar seus valores    
    for (index = 0; index < listaImovelCaracteristica.length; index++) {      
      // pegando o elemento
      carac = listaImovelCaracteristica[index];

      transaction.executeSql('UPDATE mob_inscricao_imobiliaria_caracteristica SET ' +
          'valor = ?, alterado = ? WHERE id = ? ', [carac.valor, carac.alterou, carac.id], null, errorHandler);
    }
  },errorHandler, successImovelCallBack);
}

// contagem de imoveis em aberto (ainda não sincronizados)
function verificaImoveisEmAberto(){  
  iniciarBanco();  
  db.transaction(function(transaction) {
    transaction.executeSql(" select count (*) as aberto from mob_atividade where status = 'ABE'", [],
      montaImoveisEmAberto, errorHandler);
  });
}

// contagem de imoveis finalizados (ainda não sincronizados)
function verificaImoveisFinalizados(){
  iniciarBanco();  
  db.transaction(function(transaction) {
    transaction.executeSql(" select count (*) as finalizado from mob_atividade where status = 'FIN'", [],
      montaImoveisFinalizado, errorHandler);
  });
}

// buscando os endereços de imoveis com atividade em aberto
function buscaEnderecoParaRota(){
  iniciarBanco();
  db.transaction(function(transaction) {
    transaction.executeSql("select " +                                                
        "ins.endereco_logradouro, " +
        "ins.endereco_numero, " +
        "ins.endereco_cidade " +
        "from mob_atividade atv inner join mob_inscricao_imobiliaria ins  " +
        "on (atv.inscricao_imobiliaria = ins.id)  " +
        "where  " +
        "atv.status = 'ABE' " +
        "order by ins.inscricao_imobiliaria ", [],
      desenharRota, errorHandler);
  });  
}

// buscando as caracteristicas cadastradas para inserção de um novo imovel
function buscaCaracteristicasNovoImovel(novaUnidade){
  iniciarBanco();

  if (novaUnidade){
    db.transaction(function(transaction) {
      transaction.executeSql(" SELECT * from mob_caracteristica order by ordem ", [], 
        montaCaracteristicasNovaUnidade, errorHandler);
    }); 
  } else {
    db.transaction(function(transaction) {
      transaction.executeSql(" SELECT * from mob_caracteristica order by ordem ", [], 
        montaCaracteristicasNovoImovel, errorHandler);
    });     
  }
}