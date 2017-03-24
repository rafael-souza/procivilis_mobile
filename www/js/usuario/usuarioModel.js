// bucando o usuário informado no login
function buscaUsuario(login){  
  iniciarBanco();
  db.transaction(function(transaction) {
      transaction.executeSql('SELECT * FROM mob_usuario WHERE login like ?',[login], validaLogin, errorHandler);
  });
}

// função para excluir os usuários para novo insert
function excluirUsuario(){
  db.transaction(function(transaction) {
    transaction.executeSql('DELETE from mob_usuario ', [], function(){}, errorHandler);
  });
}


// bucando o usuário informado no login
function verificaUsuarioCadastrado(login){  
  iniciarBanco();
  db.transaction(function(transaction) {
      transaction.executeSql('SELECT * FROM mob_usuario WHERE login like ?',[login], validaLoginUsuarioCadastrado, errorHandler);
  });
}