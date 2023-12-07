const bcrypt = require('bcrypt');
const {usuarios} = require('../utils/queries/raiz-query');
const funcoesJwt = require('../config/jwt');

const cadastroUsuario = async (req, res) => {
	const { nome, email, senha } = req.body;

	try {
		const existeUsuario = await usuarios.encontrarUsuarioPorEmail(email);

		if (existeUsuario) {
			return res.status(400).json({ mensagem: 'O email ja existe' });
		}

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const novoUsuario = await usuarios.adicionarUsuario({ nome, email, senha: senhaCriptografada });

		return res.status(201).json(novoUsuario);
	} catch (error) {
		return res.status(500).json({ menssagem: 'Erro interno no servidor' });
	}
};

const logarUsuario = async (req, res) => {
	const { email, senha } = req.body;

	try {
		const usuarioEncontrado = await usuarios.encontrarUsuarioPorEmail(email);

		if (!usuarioEncontrado) {
			return res.status(404).json({ mensagem: 'Email ou senha incorretos' });
		}

		const senhaUsuario = await bcrypt.compare(senha, usuarioEncontrado.senha);

		if (senhaUsuario === false) {
			return res.status(401).json({ mensagem: 'Email ou senha incorretos' });
		}

		const { senha: _, ...usuario } = usuarioEncontrado;

		const tokenGerado = await funcoesJwt.gerarToken(usuario.id);

		return res.status(201).json({ usuario, token: tokenGerado });
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}
};


const atualizarPerfilLogado = async (req, res) => {
	const { nome, email, senha } = req.body;
	const { usuario } = req;

	try {

		if (usuario.email !== email) {
			const existeUsuario = await usuarios.encontrarUsuarioPorEmail(email);

			if (existeUsuario) {
				return res.status(400).json({ mensagem: 'O email já existe' });
			}

		}

		const senhaCriptografada = await bcrypt.hash(senha, 10);

		const [{ senha: _, ...usuarioAtualizado }] = await usuarios.atualizarUsuario({ nome, email, senha: senhaCriptografada }, usuario);

		return res.status(200).json(usuarioAtualizado);
	} catch (error) {
		return res.status(500).json({ mensagem: 'Erro interno no servidor' });
	}

};

const detalharPerfilUsuario = async (req, res) => {
	return res.status(200).json(req.usuario);
};

module.exports = {
	cadastroUsuario,
	logarUsuario,
	atualizarPerfilLogado,
	detalharPerfilUsuario
};
