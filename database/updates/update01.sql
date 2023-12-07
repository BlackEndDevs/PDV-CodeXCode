CREATE TABLE produtos (
    id serial primary key,
    descricao varchar(150),
    quantidade_estoque integer,
    valor integer, 
    categoria_id integer REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id serial primary key,
    nome text not null,
    email text not null unique,
    cpf varchar(11) not null unique,
    cep char(8),
    rua varchar(150),
    numero integer,
    bairro varchar(150),
    cidade varchar(150),
    estado varchar(2)
)