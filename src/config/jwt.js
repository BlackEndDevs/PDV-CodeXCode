const jwt = require('jsonwebtoken');


module.exports = {
	
	gerarToken: async (idUsuarioDaQueryKnex) => {
		return jwt.sign({id:idUsuarioDaQueryKnex}, process.env.JWT_PASS, {expiresIn: '8h'});
	},

	verificarToken: async (tokenInformado) => {
		const tokenVerificado = jwt.verify(tokenInformado,process.env.JWT_PASS);
			
		return tokenVerificado;
	},
};