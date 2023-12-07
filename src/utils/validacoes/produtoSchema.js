const joi = require('joi');

const produto = joi.object({
	descricao: joi.string().required().messages({
		'any.required': 'O campo descrição é obrigatório',
		'string.empty': 'O campo descrição é obrigatório',
		'string.base':'O campo descricao deve ser uma string'
	}),
	quantidade_estoque: joi.number().min(0).required().messages({
		'number.base': 'O campo quantidade_estoque deve ser um número',
		'number.min':'O campo quantidade_estoque não recebe valores negativos',
		'any.required': 'O campo quantidade_estoque é obrigatório',
	}),
	valor: joi.number().min(100).required().messages({
		'number.base': 'O campo valor deve ser um número',
		'number.min': 'O valor mínimo é 100',
		'any.required': 'O campo valor é obrigatório',
	}),
	categoria_id: joi.number().min(1).required().messages({
		'number.base': 'O campo categoria_id deve ser um número',
		'any.required': 'O campo categoria_id é obrigatório',
		'number.min': 'O campo categoria_id não recebe valores negativos',
	}),
});

module.exports = produto;
