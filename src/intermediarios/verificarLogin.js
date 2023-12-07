const {verificarToken} = require('../config/jwt');
const {usuarios} = require('../utils/queries/raiz-query');

const verificarAutenticacao = async (req, res, next) => {
	const {authorization} = req.headers;

	if(!authorization){
		return res.status(401).json({mensagem:'Nao autorizado'});
	}

	try {
		const {id} = await verificarToken(authorization.split(' ')[1]);
        
		const usuarioLogado = await usuarios.encontrarUsuarioPorId(id);

		if(!usuarioLogado){
			return res.status(404).json({mensagem:'Usuario não encontrado'});
		}

		const {senha:_, ...usuario} = usuarioLogado;

		req.usuario = usuario;
        
		next();
	} catch (error) {
		return res.status(401).json({mensagem:'Nao foi possivel autenticar o usuario'});
	}
};

module.exports = verificarAutenticacao;