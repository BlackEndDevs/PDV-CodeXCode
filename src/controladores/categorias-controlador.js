const {categorias} = require('../utils/queries/raiz-query');

const listarCategorias = async (_req, res) => {
	const categoriasEncontradas = await categorias.encontrarCategorias();

	return res.status(200).json(categoriasEncontradas);
};

module.exports = {
	listarCategorias,
};