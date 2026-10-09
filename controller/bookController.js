// Impora a conexão com o banco de dados
const conexao = require('../database');

// Cria uma função que cadastra um novo livro
async function cadastrar(req, res) {
    let { isbn, titulo, autor, editora, ano_publicacao, edicao, genero } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!isbn || !titulo || !autor || !editora || !ano_publicacao || !edicao || !genero) {
        return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
    }

    try {

        // Veririfica se um livro já foi cadastrado
        let [livros] = await conexao.query(
            'SELECT id FROM livro WHERE isbn = ?', [isbn] // Verifica se o livro já foi cadastrado
        );
        if (livros.length > 0) {
            return res.status(409).json({ erro: 'Livro já cadastrado.' });
        }

        // Executa o SQL para cadastrar o livro
        let [resultado] = await conexao.query(
            'INSERT INTO livro (isbn, titulo, autor, editora, ano_publicacao, edicao, genero) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [isbn, titulo, autor, editora, ano_publicacao, edicao, genero]
        );

        res.status(201).json({mensagem: 'Livro cadastrado com sucesso.'});

} catch (error) {

    // Erro do servidor
    console.error(erro.message); // Retorna para o servidor
    return res.status(500).json({ erro: 'Não foi possível atender a sua requisição.' }); // Retorna um erro 500 para o cliente
}
}

// Exporta as funções para serem usadas.
module.exports = {
    cadastrar
};