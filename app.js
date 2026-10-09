// Importa o express para servidor da web
const express = require('express');

// Importa as rotas de cada tabela do banco de dados
const rotasLivro = require('./routes/bookRoutes');

// Cria a aplicação da web
const app = express();

// Permite que o Express entenda requisições JSON
app.use(express.json());

// Define a porta onde o servidor vai rodar
const port = 3000;

// Cria uma rota que responde na raiz da web com um texto
app.get('/', (req, res) => {
  res.send('Servidor da web da Papyro no ar!');
});

// Liga as rotas de cada tabela ao seu endereço na web
app.use('/livro', rotasLivro);

// Executa as requisições feitas ao servidor da web.
app.listen(port, () => {
    
  console.log(`Servidor rodando em http://localhost:${port}`);
});