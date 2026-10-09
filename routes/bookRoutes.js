// Importa o Express para servidores da web
const express = require("express");

// Importa a função que cadastra um livro
const controlador = require("../controller/bookController");

// Cria o roteador das rotas de livros
const rotas = express.Router();

// Rota para cadastrar um novolivro
rotas.post("/", controlador.cadastrar);

// Exporta as rotas para serem usadas pelo servidor da web
module.exports = rotas;
