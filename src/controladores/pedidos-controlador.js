const pedidos = require('../utils/queries/pedidos-query');
const {encontrarClientePorId} = require('../utils/queries/clientes-query');
const {buscarProdutoId, verificarEstoque} = require('../utils/queries/produtos-query');
const templateHtml = require('../utils/template/handlebars-render');
const enviarEmail = require('../services/enviar-email');

 
const cadastrarPedidos = async (req, res) =>{
	const {cliente_id, observacao, pedido_produtos} = req.body;

	try {
        
		const cliente = await encontrarClientePorId(cliente_id);
		if (!cliente) { return res.status(404).json({mensagem: 'Cliente não encontrado!'});}


		for (let index = 0; index < pedido_produtos.length; index++) {
			let produto = await buscarProdutoId(pedido_produtos[index].produto_id);
			let qtdEstoque = await verificarEstoque(pedido_produtos[index].produto_id);

			if (!produto) {
				return res.status(404).json({mensagem: 'Produto não encontrado!'});
			}
			if (pedido_produtos[index].quantidade_produto === 0 || pedido_produtos[index].quantidade_produto < 0) {
				return res.status(400).json({mensagem: `A quantidade de produtos ${pedido_produtos[index].produto_id} deve ser maior que zero(0).`});
			}
			if (pedido_produtos[index].quantidade_produto > qtdEstoque) {
				return res.status(400).json({mensagem: `O estoque não tem a quantidade do produto ${pedido_produtos[index].produto_id}`});
			}
		}
        
		const {id,valor_total} = await pedidos.cadastrarPedidos(cliente_id,observacao,pedido_produtos);


		const html = templateHtml(cliente.nome, id, observacao, pedido_produtos, valor_total)

		enviarEmail(cliente.nome, cliente.email, id, html);

		return res.status(201).send();
        
	} catch (error) {
		console.log('erro no controlador:', error);
		return res.status(500).json({mensagem: 'Erro interno do servidor'});
	}
};

const listarPedidos = async (req, res) =>{
	const {cliente_id} = req.query;
    
    
	try {

		if (!cliente_id) {
			const listapedidos = await pedidos.listarPedidos();
			const arraypedidos = [];
			for (const item of listapedidos) {
            
				const filtroPedidoProdutos = await pedidos.buscarPedidoProduto(item.id);

				arraypedidos.push({
					pedido: item,
					pedido_produtos: filtroPedidoProdutos
				});
			}

			return res.status(200).json(arraypedidos);

		}

		const listaPedidos = await pedidos.listarPedidoPorCliente(cliente_id);
		const arraypedidos = [];

		for (const item of listaPedidos) {

			const filtroPedidoProdutos = await pedidos.buscarPedidoProduto(item.id);

			arraypedidos.push({
				pedido: item,
				pedido_produtos: filtroPedidoProdutos
			});
		}
           
		return res.status(200).json(arraypedidos);
        
	} catch (error) {
		console.log(error);
		return res.status(500).json({mensagem: 'Erro interno do servidor'});
	}
   
};

module.exports = {cadastrarPedidos, listarPedidos};