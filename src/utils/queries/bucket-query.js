const knex = require('../../config/conexao');


const acharUrlImagem = async (id_produto) => {
	const produtoEncontrado = await knex('produtos').where({id:id_produto}).first();

	const arrayPath = produtoEncontrado.produto_imagem.split('/')[5];

	return arrayPath;
};


module.exports = {
	acharUrlImagem,
};