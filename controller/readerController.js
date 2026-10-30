// Importa a conexão com o banco de dados
const conexao = require('../database');

// Cria uma função que cadastra um novo leitor
async function cadastrar(req, res) {
    // Recebe os dados enviados pela requisição
    let { matricula, cpf, nome, tipo, turma, telefone, email } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!matricula || !cpf || !nome || !tipo || !turma || !telefone || !email) {
        return res.status(400).json({ erro: "Campos obrigatórios não preenchidos!" }); // Retorna uma mensagem de erro se algum campo obrigatório não for preenchido
    }

    // Verifica se o tipo de cadastro é igual ao do banco de dados.
    if (tipo !== "aluno" && tipo !== "professor") {
        return res.status(400).json({ erro: "Tipo de cadastro inválido!(Deve ser 'aluno' ou 'professor')" }); // Retorna uma mensagem de erro se o tipo de cadastro for inválido
    }

    try {
        // Verifica se o leitor já foi cadastrado
        let [leitores] = await conexao.query("SELECT id FROM leitor WHERE cpf = ?", [cpf]); // Verifica se o leitor já foi cadastrado
        if (leitores.length > 0) {
            return res.status(409).json({ mensagem: "CPF já cadastrado!" }); // Retorna uma mensagem de erro se o CPF já foi cadastrado
        }

        // Executa o SQL para cadastrar o leitor
        let [resultado] = await conexao.query(
            "INSERT INTO leitor (matricula, cpf, nome, tipo, turma, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [matricula, cpf, nome, tipo, turma, telefone, email]
        );
        // Retorna uma mensagem de sucesso se o leitor foi cadastrado com sucesso
        return res.status(201).json({ mensagem: "Leitor cadastrado com sucesso!" });
    } catch (erro) {
        console.log(erro.mensagem); // Imprime o erro no console
        console.log(erro.sqlMessage); // Imprime o erro no console
        return res.status(500).json({ erro: "Não foi possível atender a requisição!" }); // Retorna uma mensagem de erro do servidor
    }
}

// Exporta as funções para serem usadas.
module.exports = { cadastrar };