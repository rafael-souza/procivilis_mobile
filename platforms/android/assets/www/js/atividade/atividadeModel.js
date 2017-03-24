// grava uma atividade no banco de dados
function gravarAtividadeBd(atividade){
  db.transaction(function(transaction) {
      transaction.executeSql('INSERT INTO mob_atividade('+
          'id, '+
          'descricao, '+
          'status, '+
          'data_atividade, '+
          'inscricao_imobiliaria) VALUES (?,?,?,?,?) ',
        [atividade.id, atividade.descricao, atividade.status, atividade.data_atividade, 
          atividade.inscricao_imobiliaria], function(){}, errorHandler);
      },errorHandler,successCallBack);    
}

function finalizarAtividadeBd(idAtividade){

  db.transaction(function(transaction) {
   transaction.executeSql('UPDATE mob_atividade SET status = "FIN" WHERE id = ?', 
    [idAtividade], atividadeFinalizadoSucesso, errorHandler);
  });
}