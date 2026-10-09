// Importa o Dotenv para leitura das variáveis de ambiente
require('dotenv').config();

// Importa o MySQL2 para conexão com o banco de dados
const mysql = require('mysql2/promise');

// Cria uma variável de conexão com o banco de dados
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,      
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Exporta a conexão para que os outros arquivos utilizem
module.exports = conexao;

