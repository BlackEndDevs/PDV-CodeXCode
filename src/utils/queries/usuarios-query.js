const knex = require('../../config/conexao');

const encontrarUsuarioPorId = async (id) => {
	const existeId = await knex('usuarios').where({ id }).first();
	return existeId;
};

const adicionarUsuario = async (usuario) => {
	const novoUsuario = await knex('usuarios')
		.insert(usuario).returning('*');

	const { senha: _, ...usuarioCadastrado } = novoUsuario[0];

	return usuarioCadastrado;
};

const encontrarUsuarioPorEmail = async (email) => {
	const usuarioEncontrado = await knex('usuarios').where({ email }).first();

	return usuarioEncontrado;
};

const atualizarUsuario = async (usuario, idUsuario) => {

	const usuarioAtualizado = await knex('usuarios')
		.where({ id: idUsuario.id })
		.update({
			nome: usuario.nome,
			email: usuario.email,
			senha: usuario.senhaCriptografada
		})
		.returning('*');

	return usuarioAtualizado;
};



module.exports = {
	encontrarUsuarioPorId,
	adicionarUsuario,
	encontrarUsuarioPorEmail,
	atualizarUsuario,
};