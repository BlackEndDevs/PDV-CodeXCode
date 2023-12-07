const {clientes} = require('../utils/queries/raiz-query');

const cadastrarCliente = async (req, res) => {
	const { email, cpf } = req.body;

	try {
		const existeClienteEmail = await clientes.encontrarClientePorEmail(email);

		if (existeClienteEmail) {
			return res.status(400).json({ mensagem: 'Email já cadastrado' });
		}

		const existeClienteCpf = await clientes.encontrarClientePorCpf(cpf);

		if (existeClienteCpf) {
			return res.status(400).json({ mensagem: 'Cpf já cadastrado' });
		}

		const novoCliente = await clientes.adicionarCliente(req.body);

		return res.status(201).json(novoCliente);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};

const detalharCliente = async (req, res) => {
	const { id } = req.params;

	if (isNaN(Number(id))) {
		return res.status(400).json({ mensagem: 'O id deve ser um numero válido'});
	}

	try {
		const cliente = await clientes.encontrarClientePorId(id);

		if (!cliente) {
			return res.status(404).json({ menssagem: 'Cliente não encontrado' });
		}

		return res.json(cliente);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};

const listarClientes = async (_req, res) => {
	const listaClientes = await clientes.listarClientes();

	return res.status(200).json(listaClientes);
};

const editarCliente = async (req, res) => {
	const { id } = req.params;
	const {nome , email, cpf, cep, rua, numero, bairro, cidade, estado} = req.body;

	const clienteEncontrado = await clientes.encontrarClientePorId(id);

	if(!clienteEncontrado){
		return res.status(404).json({mensagem:'Nenhum cliente encontrado com o ID informado'});
	}
	
	if(clienteEncontrado.email !== email){
		const existeEmail = await clientes.encontrarClientePorEmail(email);
		if(existeEmail){
			return res.status(400).json({mensagem:'E-mail ja cadastrado'});
		}
	}

	if(clienteEncontrado.cpf !== cpf){
		const existeCpf = await clientes.encontrarClientePorCpf(cpf);
		if(existeCpf){
			return res.status(400).json({mensagem:'Cpf ja cadastrado'});
		}
	}

	const novosDados = {
		nome,
		email,
		cpf,
		cep,
		rua,
		numero,
		bairro,
		cidade,
		estado
	};
	

	const usuarioEditado = await clientes.editarCliente(novosDados, id);

	return res.status(200).json(usuarioEditado[0]);
};

module.exports = {
	cadastrarCliente,
	detalharCliente,
	listarClientes,
	editarCliente,
};