const rotasCategoria = require('express').Router();
const { categorias } = require('../controladores/controlador');


rotasCategoria.get('/categoria', categorias.listarCategorias);


module.exports = rotasCategoria;