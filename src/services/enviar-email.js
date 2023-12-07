const nodemailer = require('nodemailer');


const transportador = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: Number(process.env.MAIL_PORT),
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const enviarEmail = async (cliente_nome,cliente_email,pedido_id, html) => {
	transportador.sendMail(
		{
			from:`${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
			to:`${cliente_nome}<${cliente_email}>`,
			Subject:`Confirmação de Pedido - Número ${pedido_id}`,
			html
		}
	);
};


module.exports = enviarEmail;
