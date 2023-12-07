require('dotenv').config();
const express = require('express');
const cors = require('cors');

const rotas = require('./src/rotas/roteador');

const app = express();
const mensagemApp = `Servidor rodando na porta ${process.env.PORT}`;

app.use(express.json());
app.use(cors());

app.use(rotas);

app.listen(process.env.PORT, console.log(mensagemApp));