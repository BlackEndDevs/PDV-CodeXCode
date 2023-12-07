const joi = require('joi');

const usuario = joi.object({
	nome: joi.string().required().messages({
		'any.required': 'O campo nome é obrigatório',
		'string.empty': 'O campo nome é obrigatório',
		'string.base':'O campo nome deve ser uma string'
	}),
	email: joi.string().email().required().messages({
		'any.required': 'O campo email é obrigatório',
		'string.empty': 'O campo email é obrigatório',
		'string.email': 'O campo email precisa ter um formato válido'
	}),
	senha: joi.string().required().messages({
		'any.required': 'O campo senha é obrigatório',
		'string.base':'O campo senha deve ser uma string',
		'string.empty': 'O campo senha é obrigatório',
	})
});

const login = joi.object({
	email: joi.string().email().required().messages({
		'any.required': 'O campo email é obrigatório',
		'string.empty': 'O campo email é obrigatório',
		'string.email': 'O campo email precisa ter um formato válido'
	}),
	senha: joi.string().required().messages({
		'any.required': 'O campo senha é obrigatório',
		'string.base':'O campo senha deve ser uma string',
		'string.empty': 'O campo senha é obrigatório',
	})
});

module.exports = {
	usuario,
	login
};