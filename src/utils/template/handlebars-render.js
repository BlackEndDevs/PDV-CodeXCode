const handlebars = require('handlebars');
const fs = require('fs');

const templateFs = fs.readFileSync('src/utils/template/mail-handlebars.hbs', 'utf8');

const templateCompilado = handlebars.compile(templateFs.toString());


const aplicarTemplate = (cliente_nome, pedido_id, observacao, pedido_produtos, total_a_pagar) =>{
	return templateCompilado(
		{
			cliente_nome,
			pedido_id,
			data_pedido: new Date().toLocaleString(),
			observacao,
			pedido_produtos,
			total_a_pagar
		}
	);
};


module.exports = aplicarTemplate;
