const express = require('express');

const rotasUsuario = require('./usuarios-rotas');
const rotasCategoria = require('./categorias-rotas');
const rotasClientes = require('./clientes-rotas');
const rotasProdutos = require('./produtos-rotas');
const rotasPedidos = require('./pedidos-rotas');

const rotas = express();

rotas.use(rotasCategoria);
rotas.use(rotasUsuario);
rotas.use(rotasClientes);
rotas.use(rotasProdutos);
rotas.use(rotasPedidos);

module.exports = rotas;