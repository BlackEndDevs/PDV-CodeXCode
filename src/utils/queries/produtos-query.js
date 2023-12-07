const knex = require('../../config/conexao');
const bucketQuery = require('./bucket-query');

const listarProdutos = async () => {
	const produto = await knex('produtos').returning('*');
	return produto;
};

const filtroProdutos = async (categoria_id) => {
	const filtro = await knex('produtos').where({ categoria_id });
	return filtro;
};

const editarProduto = async (body, id) => {

	const produtoAtualizado = await knex('produtos')
		.where({ id })
		.update({
			descricao: body.descricao,
			quantidade_estoque: body.quantidade_estoque,
			valor: body.valor,
			categoria_id: body.categoria_id,
			produto_imagem: body.produto_imagem
		})
		.returning('*');

	return produtoAtualizado[0];
};

const buscarProdutoId = async (id) => {
	const produtoPorId = await knex('produtos').where({ id }).first();

	return produtoPorId;
};

const excluirProduto = async (id) => {
	
	const produtoExcluido = await knex('produtos').del().where({ id });

	return produtoExcluido;
};

const adicionarProduto = async (body) => {
	const novoProduto = await knex('produtos')
		.insert({
			descricao: body.descricao,
			quantidade_estoque: body.quantidade_estoque,
			valor: body.valor,
			categoria_id: body.categoria_id
		}).returning('*');

	return novoProduto[0];
};

const verificarEstoque = async (id) =>{

	const procuraEstoque = await knex('quantidade_estoque').from('produtos').where({ id }).first();

	
	try{
		const {quantidade_estoque} = procuraEstoque
		return quantidade_estoque
	} catch{
		return -1
	}

}

const buscarProdutoPedido = async (produto_id) => {
	const produtoPedido = await knex('pedido_produtos').where({ produto_id })

	return produtoPedido
}

module.exports = {
	listarProdutos,
	filtroProdutos,
	editarProduto,
	buscarProdutoId,
	excluirProduto,
	adicionarProduto,
	verificarEstoque,
	buscarProdutoPedido,
};