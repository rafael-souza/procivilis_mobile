var db;
var shortName = 'procivilis_mobile';
var version = '1.0.0';
var displayName = 'procivilis_mobile';
var maxSize = 65535;
//var urlSync = 'http://52.67.3.119/gtmcidade/soa/service/mobile.';
var urlSync = 'http://52.67.3.119/pmguaxupe/soa/service/mobile.';
//var urlSync = 'http://10.0.0.101:8080/pmguaxupe/soa/service/mobile.';

// iniciando transaÃ§Ã£o com o banco e criando as tabelas caso nÃ£o existam
function iniciarBanco(){  
  // verifica se o browser suporta sqlite
  if (!window.openDatabase) {
    ('Navegador não suporte SQLite.');
    return;
  }

  // abrindo o banco de dados
  db = openDatabase(shortName, version, displayName, maxSize);

  var bancoCriado = window.localStorage.getItem("bd_criado");  
  // criando as tabelas do banco de dados
  if (!bancoCriado){

    // criando a tabela de usuÃ¡rios se nÃ£o existir
    db.transaction(function(tx){
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_controle_sinc( '+
          'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
          'login varchar(60), '+
          'data_atividade DATE )',
        [],function(){},errorHandler);
    },errorHandler,function(){});      
    
    // criando a tabela de usuÃ¡rios se nÃ£o existir
    db.transaction(function(tx){
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_usuario( '+
          'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
          'login varchar(60) NOT NULL, '+
          'senha varchar(60) NOT NULL)',
        [],function(){},errorHandler);
    },errorHandler,function(){});  

    // criando a tabela de inscriÃ§Ã£o imobiliaria se nÃ£o existir
    db.transaction(function(tx){
        tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_inscricao_imobiliaria ( '+
          'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
          'codigo INTEGER, '+
          'inscricao_imobiliaria varchar(29), '+
          'proprietario varchar(150), '+
          'endereco_logradouro varchar(150), '+
          'endereco_numero varchar(10), '+
          'endereco_bairro varchar(150), '+
          'endereco_complemento varchar(150), '+
          'endereco_cep varchar(20), '+
          'endereco_cidade varchar(150), '+
          'foto_adicional1 TEXT DEFAULT NULL, '+
          'foto_adicional2 TEXT DEFAULT NULL, '+
          'foto_fachada TEXT DEFAULT NULL, '+
          'foto_app_fachada TEXT DEFAULT NULL, '+
          'foto_app_adicional1 TEXT DEFAULT NULL, '+
          'foto_app_adicional2 TEXT DEFAULT NULL, '+
          'latitude_ponto_um varchar(20), '+
          'longitude_ponto_um varchar(20), '+
          'latitude_ponto_dois varchar(20), '+
          'longitude_ponto_dois varchar(20), '+
          'latitude_ponto_tres varchar(20), '+
          'longitude_ponto_tres varchar(20), ' +
          'id_atividade bigint(10) )', 
        [],function(){},errorHandler);
    },errorHandler,function(){});  

    // criando a tabela de atividades se nÃ£o existir
    db.transaction(function(tx){
          tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_atividade( '+
            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
            'descricao varchar(150), '+
            'status varchar(50), '+
            'data_atividade DATE, '+
            'ordem bigint(10), ' +
            'id_atividade_original bigint(10), ' +
            'inscricao_imobiliaria bigint(20) NOT NULL '+
            'CONSTRAINT `FK_MOB_ATIVIDADE_INSCRICAO_IMOBILIARIA` REFERENCES `mob_inscricao_imobiliaria` (`id`))',
        [],function(){},errorHandler);
    },errorHandler,function(){});  
          
      // criando a tabela de caracteristicas se nÃ£o existir
    db.transaction(function(tx){
          tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_caracteristica ( '+
            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
            'tipo varchar(3), '+
            'descricao varchar(150), ' +
            'ordem bigint(10) )',
        [],function(){},errorHandler);
    },errorHandler,function(){});    
      
      // criando a tabela de caracteristica lista se nÃ£o existir
    db.transaction(function(tx){
          tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_caracteristica_lista ( '+
            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
            'descricao varchar(150), '+            
            'caracteristica bigint(20) NOT NULL '+
            'CONSTRAINT `FK_MOB_CARACTERISTICA_CARACTERISTICA_LISTA` REFERENCES `mob_caracteristica` (`id`))',
        [],function(){},errorHandler);
    },errorHandler,function(){});    
    
      // criando a tabela de atividades se nÃ£o existir
    db.transaction(function(tx){
          tx.executeSql( 'CREATE TABLE IF NOT EXISTS mob_inscricao_imobiliaria_caracteristica ( '+
            'id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, '+
            'valor_cti varchar(150), '+          
            'valor varchar(150), '+          
            'alterado varchar(1), '+
            'caracteristica bigint(20) NOT NULL, '+
            'inscricao_imobiliaria bigint(20) NOT NULL '+
            'CONSTRAINT `FK_MOB_ATIVIDADE_INSCRICAO_IMOBILIARIA` REFERENCES `mob_inscricao_imobiliaria` (`id`) '+          
            'CONSTRAINT `FK_MOB_CARACTERISTICA_INSCRICAO_IMOBILIARIA_CARACTERISTICAA` REFERENCES `mob_caracteristica` (`id`))',              
        [],function(){},errorHandler);
    },errorHandler,function(){});    

    // armazenando que já criou o banco
    window.localStorage.setItem("bd_criado", true);
    window.localStorage.setItem("remember_login", false);
  }
}

// Cria as tabelas e realiza o insert dos dados de exemplo
// no futuro irá criar as tabelas e realizar o sincronismo inicial
function cargaInicial(){  
    // iniciando o banco
    iniciarBanco();
      
    // realizando o insert dos dados inicial
    db.transaction(populateDataBase, errorHandler, successCallBack);        
}

// criação do conteúdo de exemplo para testes
function populateDataBase(tx){
    // inserindo o usuário 
    tx.executeSql("INSERT INTO mob_usuario (id,login,senha) VALUES (1,'admin','202cb962ac59075b964b07152d234b70');");   

    // inserindo as caracateristicas 
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (1,'LIS','Padrão Construção',9);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (2,'LIS','Estado de Conservação',8);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (3,'LIS','Tipo Edificação',7);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (4,'DEC','Área Construída Total',6);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (5,'LIS','Patrimônio',2);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (6,'LIS','Ocupação',1);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (7,'NUM','Nº Pavimentos',3);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (8,'LIS','Beiral',10);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (9,'DEC','Área Construída',4);");
    tx.executeSql("INSERT INTO mob_caracteristica (id,tipo,descricao,ordem) VALUES (10,'DEC','Área Edícula - Piscina',5);"); 

    // inserindo as  caracateristicas lista valores
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (1,'Alto',1);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (2,'Baixo',1);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (3,'Luxo',1);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (4,'Normal',1);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (5,'Popular',1);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (6,'Boa',2);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (7,'Ótima',2);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (8,'Péssimo',2);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (9,'Regular',2);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (10,'Ruim',2);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (11,'Apartamento',3);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (12,'Barraco',3);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (13,'Conjugada',3);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (14,'Galpão',3);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (15,'Isolada',3);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (16,'Sala',3);")
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (17,'Municipal Aforado',5);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (18,'Particular',5);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (19,'Público',5);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (20,'Religioso',5);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (21,'Edificado',6);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (22,'Em Construção',6);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (23,'Ruínas',6);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (24,'Vago',6);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (25,'Não',8);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (26,'Uma Lateral',8);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (27,'Duas Laterais',8);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (28,'Três Laterais',8);");
    tx.executeSql("INSERT INTO mob_caracteristica_lista (id,descricao,caracteristica) VALUES (29,'Quatro Laterais',8);");    

   // inserindo as inscrições imobiliarias
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +
      "(1,1,'1.01.0001.0001..001','JOSE OTAVIO DA SILVA','Rua Prof. Joaquim Rodarte','52','Centro', 'Formiga - MG');");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +
      "(2,2,'1.01.0001.0002..000','JOSE MARIA DE OLIVEIRA','Rua Prof. Joaquim Rodarte','14','Centro','Formiga - MG');");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +  
      "(3,3,'1.01.0001.0003..001','AFONSO OTAVIO DA SILVA','Rua Barão de Piunhi','196','Centro','Formiga - MG');");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +  
      "(4,4,'1.01.0001.0004..001','MOISES CALIARI','Rua Cel. José Gonçalves Damarante','100','Centro','Formiga - MG');");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +
      "(5,5,'1.01.0001.0005..001','MOISES CALIARI','Rua Barão de Piunhi','278','Centro', 'Formiga - MG');");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro, endereco_cidade) VALUES " +
      "(6,6,'1.01.0001.0006..001','ANTONIO CARLOS DA SILVA','Rua Cel. José Gonçalves Damarante','130','Centro', 'Formiga - MG');");

    /*
    // inserindo as inscrições imobiliarias
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria (id,codigo,inscricao_imobiliaria,proprietario, " +
      "endereco_logradouro,endereco_numero,endereco_bairro,endereco_complemento,endereco_cep," +
      "foto_adicional1,foto_adicional2,foto_fachada,latitude_ponto_um,longitude_ponto_um, " +
      "latitude_ponto_dois,longitude_ponto_dois,latitude_ponto_tres,longitude_ponto_tres,endereco_cidade) " +
      "VALUES (1,1,'1.01.0001.0001..001','JOSE OTAVIO DA SILVA','R. Dr. Avelino de Queiroz','442','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG'), " +
      "(2,2,'1.01.0001.0002..000','JOSE MARIA DE OLIVEIRA','R. Dr. Avelino de Queiroz','547','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG'), " +
      "(3,3,'1.01.0001.0003..001','AFONSO OTAVIO DA SILVA','R. Maria José','110','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG'), " +
      "(4,4,'1.01.0001.0004..001','MOISES CALIARI','R. Cel. Lourenço Belo','48','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG'), " +
      "(5,5,'1.01.0001.0005..001','MOISES CALIARI','R. Antônio Pereira Leite','437','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG'), " +
      "(6,6,'1.01.0001.0006..001','ANTONIO CARLOS DA SILVA','R. Floriano Leonel da Silva','71','Centro',NULL,NULL,'','','',NULL,NULL,NULL,NULL,NULL,NULL, 'Capitólio - MG');");
      */
    // inserindo a inscricao imobiliaria caracteristica
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (1,NULL,1,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (2,NULL,2,1);"); 
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (3,NULL,3,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (4,NULL,4,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (5,NULL,5,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (6,NULL,6,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (7,NULL,7,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (8,NULL,8,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (9,NULL,9,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (10,NULL,10,1);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (11,NULL,1,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (12,NULL,2,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (13,NULL,3,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (14,NULL,4,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (15,NULL,5,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (16,NULL,6,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (17,NULL,7,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (18,NULL,8,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (19,NULL,9,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (20,NULL,10,2);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (21,NULL,1,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (22,NULL,2,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (23,NULL,3,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (24,NULL,4,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (25,NULL,5,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (26,NULL,6,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (27,NULL,7,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (28,NULL,8,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (29,NULL,9,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (30,NULL,10,3);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES  (31,NULL,1,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (32,NULL,2,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (33,NULL,3,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (34,NULL,4,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (35,NULL,5,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (36,NULL,6,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (37,NULL,7,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (38,NULL,8,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (39,NULL,9,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (40,NULL,10,4);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (41,NULL,1,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (42,NULL,2,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (43,NULL,3,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (44,NULL,4,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (45,NULL,5,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (46,NULL,6,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (47,NULL,7,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (48,NULL,8,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (49,NULL,9,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (50,NULL,10,5);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (51,NULL,1,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (52,NULL,2,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (53,NULL,3,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (54,NULL,4,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (55,NULL,5,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (56,NULL,6,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (57,NULL,7,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (58,NULL,8,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (59,NULL,9,6);");
    tx.executeSql("INSERT INTO mob_inscricao_imobiliaria_caracteristica " +
      "(id,valor,caracteristica,inscricao_imobiliaria) VALUES (60,NULL,10,6);");

    // inserindo as atividades
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (1,'Atividade 1','ABE',date(),1,1);");
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (2,'Atividade 2','ABE',date(),2,2);");
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (3,'Atividade 3','ABE',date(),3,3);");
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (4,'Atividade 4','ABE',date(),4,4);");
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (5,'Atividade 5','FIN',date(),5,5);");
    tx.executeSql("INSERT INTO mob_atividade (id,descricao,status,data_atividade,ordem, " +
      "inscricao_imobiliaria) VALUES (6,'Atividade 5','FIN',date(),6,6);");

}

// verifica se o dia já foi sincronizado
function isDiaSincronizado(){    
    iniciarBanco();      
    db.transaction(function(tx) {
      // pegando a data atual
      var dataAtual = getDataAtual(true, false);  
      // realizando a busca  
      tx.executeSql(" SELECT count(*) as contador from mob_controle_sinc where data_atividade = ? ", 
          [dataAtual], realizaSincronizacaoLogin, errorHandler);
    });
}


function limparBase(){
    iniciarBanco();    
    db.transaction(clearDataBase, errorHandler, successCallBack);              
}

function clearDataBase(tx){
  tx.executeSql( 'DELETE FROM mob_caracteristica_lista; ');
  tx.executeSql( 'DELETE FROM mob_caracteristica; ');
  tx.executeSql( 'DELETE FROM mob_inscricao_imobiliaria_caracteristica; ');
  tx.executeSql( 'DELETE FROM mob_inscricao_imobiliaria; ');
  tx.executeSql( 'DELETE FROM mob_atividade; ');
  tx.executeSql( 'DELETE FROM mob_usuario; ');  
  tx.executeSql( 'DELETE FROM mob_controle_sinc; '); 
}

