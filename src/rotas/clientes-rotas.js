const autenticacao = require('../intermediarios/verificarLogin');
const rotasClientes = require('express').Router();
const {clientes} = require('../controladores/controlador');
const validarRequisicao = require('../intermediarios/validarRequisicao');
const schemaCliente = require('../utils/validacoes/clienteSchema');


rotasClientes.use(autenticacao);

rotasClientes.get('/cliente', clientes.listarClientes);

rotasClientes.get('/cliente/:id', clientes.detalharCliente);

rotasClientes.post('/cliente', validarRequisicao(schemaCliente), clientes.cadastrarCliente);

rotasClientes.put('/cliente/:id', validarRequisicao(schemaCliente), clientes.editarCliente);

module.exports = rotasClientes;