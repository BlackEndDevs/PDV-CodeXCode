const joi = require('joi');

const pedidos = joi.object({
	cliente_id: joi.number().min(0).required().messages({
		'number.empty': 'Não é possível cadastrar uma cliente_id vazia',
		'number.base':'O campo cliente_id deve ser uma number',
		'number.min':'O campo cliente_id não recebe valores negativos'
	}),
	observacao: joi.string().messages({
		'string.empty': 'O campo obsersacao  é obrigatório',
		'string.base':'O campo obsersacao deve ser uma string'
	}),
	pedido_produtos: joi.array().items({

		produto_id: joi.number().min(0).required().messages({
			'number.empty': 'Não é possível cadastrar uma number vazia',
			'number.base':'O campo produto_id deve ser uma number',
			'number.min':'O campo produto_id não recebe valores negativos'
		}),
		quantidade_produto: joi.number().min(1).required().messages({
			'number.empty': 'Não é possível cadastrar uma quantidade_produto vazia',
			'number.base':'O campo quantidade_produto deve ser uma number',
			'number.min':'O campo quantidade_produto não recebe valores negativos'
		})
        

	})

});

module.exports = pedidos;