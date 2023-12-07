const {produtos, categorias} = require('../utils/queries/raiz-query');
const { uploadFile, deleteFile } = require('../utils/uploads');
const bucket = require('../utils/queries/bucket-query');


const cadastrarProduto = async (req, res) => {
	const { categoria_id } = req.body;

	try {
		const categoria = await categorias.buscarCategoriaId(categoria_id);

		if (!categoria) {
			return res.status(404).json({ mensagem: 'Categoria não encontrada' });
		}

		let novoProduto = await produtos.adicionarProduto(req.body);

		if (req.file) {
			const { originalname, mimetype, buffer } = req.file;

			const arquivo = await uploadFile(
				`produtos/${novoProduto.id}/${originalname}`,
				buffer,
				mimetype
			);

			const body = { produto_imagem: arquivo.url };
		
			novoProduto = await produtos.editarProduto(body, novoProduto.id);
		}

		return res.status(201).json(novoProduto);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};

const detalharProduto = async (req, res) => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		return res.status(400).json({ mensagem: 'O id deve ser um numero válido' });
	}

	try {
		const produtoEncontrado = await produtos.buscarProdutoId(id);

		if (!produtoEncontrado) {
			return res.status(404).json({ menssagem: 'Produto não encontrado' });
		}

		return res.json(produtoEncontrado);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};

const listarProdutos = async (req, res) => {
	const { categoria_id } = req.query;
	try {
		if (!categoria_id) {
			const produtosEncontrados = await produtos.listarProdutos();
			return res.json(produtosEncontrados);
		}

		const produtosEncontrados = await produtos.filtroProdutos(categoria_id);

		return res.json(produtosEncontrados);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};

const editarProduto = async (req, res) => {
	const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
	const { id } = req.params;

	try {
		const existeProduto = await produtos.buscarProdutoId(id);

		if (!existeProduto) { return res.status(404).json({ mensagem: 'Produto não encontrado!' }); }

		const existeCategoria = await categorias.buscarCategoriaId(categoria_id);

		if (!existeCategoria) { return res.status(404).json({ mensagem: 'Categoria não encontrada!' }); }

		let produto_imagem = undefined;
		if (req.file) {
			const { originalname, mimetype, buffer } = req.file;

			await deleteFile(`produtos/${id}/${originalname}`);

			const arquivo = await uploadFile(
				`produtos/${id}/${originalname}`,
				buffer,
				mimetype
			);
			
			produto_imagem = arquivo.url;
		}

		const produtoAtualizado = await produtos.editarProduto({
			descricao,
			quantidade_estoque,
			valor,
			categoria_id,
			produto_imagem
		}, id);

		return res.status(200).json(produtoAtualizado);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}

};

const excluirProduto = async (req, res) => {
	const { id } = req.params;
	try {
		const produto = await produtos.buscarProdutoId(id);

		if (!produto) { return res.status(404).json({ mensagem: 'Produto não encontrado.' }); }

		const produtoPedido = await produtos.buscarProdutoPedido(id);

		const produtoEncontrado = produtoPedido.some(item => item.produto_id == id);

		if (produtoEncontrado) {
			return res.status(403).json({ mensagem: 'O produto encontra-se em um pedido.' });
		}
		
		const path = await bucket.acharUrlImagem(id);

		await deleteFile(`produtos/${id}/${path}`);

		const produtoExcluido = await produtos.excluirProduto(id);

		if (produtoExcluido === 0) return res.status(400).json({ mensagem: 'produto não excluido' });

		return res.status(204).send();

	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}


};

module.exports = {
	cadastrarProduto,
	listarProdutos,
	detalharProduto,
	editarProduto,
	excluirProduto
};
