const express = require('express');

const intermediario = require('../intermediarios/raizIntermediarios');
const joiValidacoes = require('../utils/validacoes/usuarioSchema');
const { usuario } = require('../controladores/controlador');

const rotasUsuario = express();

rotasUsuario.post('/usuario', intermediario.validarRequisicao(joiValidacoes.usuario), usuario.cadastroUsuario);

rotasUsuario.post('/login', intermediario.validarRequisicao(joiValidacoes.login), usuario.logarUsuario);

rotasUsuario.use(intermediario.verificarAutenticacao);

rotasUsuario.put('/usuario', intermediario.validarRequisicao(joiValidacoes.usuario), usuario.atualizarPerfilLogado);

rotasUsuario.get('/usuario', usuario.detalharPerfilUsuario);


module.exports = rotasUsuario;