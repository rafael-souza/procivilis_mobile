// pega os dados da tela e grava no banco
function gravarAtividade(){
    atividade = new Object();
    atividade.id = document.getElementById('idAtividade').value;
    atividade.descricao = document.getElementById('descricaoAtividade').value; 
    atividade.status = document.getElementById('statusAtividade').value; 
    atividade.data_atividade = document.getElementById('dataAtividade').value; 
    atividade.inscricao_imobiliaria = document.getElementById('inscricaoImobiliariaAtividade').value; 

    gravarAtividadeBd(atividade);
}


// finaliza a atividade do imovel
function finalizarAtividade(){
  // pergunta se deseja remover a foto
  navigator.notification.confirm(
      'Deseja finalizar esse imóvel?',  // message
      onConfirmFinalizarAtividade,         // callback to invoke with index of button pressed
      'Atenção',                        // title
      'Sim,Não'                         // buttonLabels
  );    
}

// funÃ§Ã£o ao confirmar finalizaÃ§Ã£o de tarefa
function onConfirmFinalizarAtividade(buttonIndex){
    if (buttonIndex == 1){     
      finalizarAtividadeBd($("#idAtividade").val());      
    }
}