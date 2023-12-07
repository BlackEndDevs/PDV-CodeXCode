const validarRequisicao = require('../intermediarios/validarRequisicao');
const autenticacao = require('../intermediarios/verificarLogin');
const rotasProdutos = require('express').Router();
const schemaProduto = require('../utils/validacoes/produtoSchema');
const { produtos } = require('../controladores/controlador');
const multer = require('../intermediarios/multer');

rotasProdutos.use(autenticacao);


rotasProdutos.post('/produto', multer.single('produto_imagem'), validarRequisicao(schemaProduto), produtos.cadastrarProduto);

rotasProdutos.get('/produto', produtos.listarProdutos);

rotasProdutos.get('/produto/:id', produtos.detalharProduto);

rotasProdutos.put('/produto/:id', multer.single('produto_imagem'), validarRequisicao(schemaProduto), produtos.editarProduto);

rotasProdutos.delete('/produto/:id', produtos.excluirProduto);

module.exports = rotasProdutos;
