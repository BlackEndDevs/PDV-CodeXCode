const knex = require('../../config/conexao');

const encontrarClientePorEmail = async (email) => {
	const clienteEncontrado = await knex('clientes').where({ email }).first();

	return clienteEncontrado;
};

const encontrarClientePorCpf = async (cpf) => {
	const clienteEncontrado = await knex('clientes').where({ cpf }).first();

	return clienteEncontrado;
};

const encontrarClientePorId = async (id) => {
	const clienteEncontrado = await knex('clientes').where({ id }).first();

	return clienteEncontrado;
};

const adicionarCliente = async (body) => {
	const novoCliente = await knex('clientes')
		.insert({
			nome: body.nome,
			email: body.email,
			cpf: body.cpf,
			cep: body.cep,
			rua: body.rua,
			numero: body.numero,
			bairro: body.bairro,
			cidade: body.cidade,
			estado: body.estado
		}).returning('*');

	return novoCliente[0];
};

const listarClientes = async () => {
	const listaClientes = await knex('clientes').returning('*');

	return listaClientes;
};

const editarCliente = async (cliente,idCliente) => {

	const editandoCliente = await knex('clientes')
		.update({
			nome: cliente.nome,
			email: cliente.email,
			cpf: cliente.cpf,
			cep: cliente.cep,
			rua: cliente.rua,
			numero: cliente.numero,
			bairro: cliente.bairro,
			cidade: cliente.cidade,
			estado: cliente.estado
		})
		.where({id:idCliente})
		.returning('*');

	return editandoCliente;
};

module.exports = {
	encontrarClientePorEmail,
	encontrarClientePorCpf,
	encontrarClientePorId,
	adicionarCliente,
	listarClientes,
	editarCliente,
};