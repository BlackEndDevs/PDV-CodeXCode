const joi = require('joi');

const cliente = joi.object({
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
	cpf: joi.string().min(11).max(11).required().messages({
		'any.required': 'O campo cpf é obrigatório',
		'string.empty': 'O campo cpf é obrigatório',
		'string.base':'O campo cpf deve ser uma string',
		'string.min':'O campo cpf deve ter 11 caracteres',
		'string.max':'O campo cpf nao deve exceder 11 caracteres',
	}),
	cep: joi.string().min(8).max(8).messages({
		'string.empty': 'O campo cep precisa de 8 caracteres',
		'string.base':'O campo cep deve ser uma string',
		'string.min':'O campo cep deve ter 8 caracteres',
		'string.max':'O campo cep nao deve exceder 8 caracteres',
	}),
	rua: joi.string().messages({
		'string.empty': 'Não é possível cadastrar rua com uma string vazia',
		'string.base':'O campo rua deve ser uma string',
	}),
	numero: joi.number().min(0).messages({
		'number.empty': 'Não é possível cadastrar uma number vazia',
		'number.min': 'Não é possível cadastrar um numero negativo',
		'number.base':'O campo numero deve ser uma number',
	}),
	bairro: joi.string().messages({
		'string.empty': 'Não é possível cadastrar bairro com uma string vazia',
		'string.base':'O campo bairro deve ser uma string',
	}),
	cidade: joi.string().messages({
		'string.empty': 'Não é possível cadastrar cidade com uma string vazia',
		'string.base':'O campo cidade deve ser uma string',
	}),
	estado: joi.string().min(2).max(2).messages({
		'string.empty': 'O campo estado precisa de 2 caracteres',
		'string.base':'O campo estado deve ser uma string',
		'string.min':'O campo estado deve ter 2 caracteres',
		'string.max':'O campo estado nao deve exceder 2 caracteres',
	}),
});

module.exports = cliente;
