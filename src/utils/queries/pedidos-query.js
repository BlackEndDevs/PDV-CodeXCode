const knex = require('../../config/conexao');

const cadastrarPedidos = async(id, obs, produtos) =>{

	try {

		let valor_total = 0;

		for (const item of produtos) {
            
			const {valor} = await knex('valor')
				.from('produtos')
				.where({id: item.produto_id})
				.first();

			valor_total += valor * item.quantidade_produto;
		}
		const pedidos = await knex('pedidos')
			.insert({
				cliente_id: id,
				observacao: obs,
				valor_total
			}).returning('*');
           
		const pedido_produtos = [];

		for (const item of produtos) {

			const {valor} = await knex('produtos')
				.where({id: item.produto_id})
				.first();
            
			pedido_produtos.push({
				pedido_id: pedidos[0].id,
				produto_id: item.produto_id,
				quantidade_produto: item.quantidade_produto,
				valor_produto: valor
			});
       
			await knex('produtos')
			.where({id:item.produto_id})
			.decrement('quantidade_estoque', item.quantidade_produto)
		}
        
		await knex('pedido_produtos').insert(pedido_produtos).returning('*');


		return {id:pedidos[0].id, valor_total}
	} catch (error) {
		console.log('erro na query', error.message);
	}
};

const listarPedidoPorCliente = async (id) =>{
        
	const pedidoPorId = await knex('pedidos').where({cliente_id: id}).returning('*');

	return pedidoPorId;

};

const listarPedidos = async () =>{

	const pedidos = await knex('pedidos').returning('*');
	return pedidos;
        
};

const buscarPedidoProduto = async (pedido_id) =>{

	const pedidos = await knex('pedido_produtos').where({ pedido_id }).returning('*');
	return pedidos;
};


module.exports = {
	cadastrarPedidos,
	listarPedidos,
	listarPedidoPorCliente,
	buscarPedidoProduto
};
