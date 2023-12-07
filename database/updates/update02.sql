ALTER TABLE produtos ADD COLUMN produto_imagem varchar(600);

CREATE TABLE pedidos(
    id serial primary key,
    cliente_id integer references clientes(id) not null,
    observacao varchar(150),
    valor_total integer not null
);

CREATE TABLE pedido_produtos(
    id serial primary key,
    pedido_id integer references pedidos(id) not null,
    produto_id integer references produtos(id) not null,
    quantidade_produto integer not null,
    valor_produto integer not null
);

