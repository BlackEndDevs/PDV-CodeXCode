const categorias = require('./categorias-query');

const clientes = require('./clientes-query');

const usuarios = require('./usuarios-query');

const produtos = require('./produtos-query');

const bucket = require('./bucket-query');

module.exports = {
	categorias,
	clientes,
	usuarios,
	produtos,
	bucket,
};