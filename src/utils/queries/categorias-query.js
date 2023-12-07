const knex = require('../../config/conexao');

const encontrarCategorias = async () => {
	const obtercategorias = await knex('categorias');

	return obtercategorias;
};

const buscarCategoriaId = async (categoria_id) => {
	const idCategoria = await knex('categorias').where({ id:categoria_id }).first();

	return idCategoria;
};

module.exports = {
	encontrarCategorias,
	buscarCategoriaId,
};