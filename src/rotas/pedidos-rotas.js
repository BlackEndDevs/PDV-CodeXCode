const { cadastrarPedidos, listarPedidos } = require('../controladores/pedidos-controlador');
const rotasPedidos = require('express').Router();
const validarRequisicao = require('../intermediarios/validarRequisicao');
const pedidos = require('../utils/validacoes/pedidoSchema');


rotasPedidos.post('/pedido', validarRequisicao(pedidos), cadastrarPedidos);
rotasPedidos.get('/pedido/', listarPedidos);

module.exports = rotasPedidos;