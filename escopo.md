# PDV CodeXCode

## Conteudo do arquivo:
- [Resumo](#resumo)
- [O que o cliente pode fazer](#o-que-o-cliente-pode-fazer)
- [O que o cliente não pode fazer](#o-que-o-cliente-não-pode-fazer)
- [Tarefas dos Devs](#tarefas)
- [Banco de Dados](#banco-de-dados)
- [Endpoints](#endpoints)
- [Deploy da aplicação](#deploy-da-aplicação)

## Resumo
O projeto PDV CodeXCode é um projeto focado em servir um sistema Ponto de Venda (PDV) para um negócio.
Esse documento delimita as funcionalidades, limitações e restrições do projeto, visando assim um melhor entendimento do escopo

## O que o cliente pode fazer
- Gerenciar usuários
    - Criar conta com senha criptografada via bcrypt.
        - Conta é salva no banco de dados de nome pdv, o banco de dados utilizado nesse projeto é o PostgreSQL
    - Logar no sistema com segurança
        - Autenticação é feita via JSON Web Token
- Visualizar categorias das vendas
- Gerenciar clientes
    - Cadastrar novos clientes
    - Listar clientes cadastrados
    - Atualizar dados dos clientes
- Gerenciar produtos
    - Cadastrar novos produtos
    - Listar produtos cadastrados
    - Atualizar produtos cadastrados
    - Deletar produtos cadastrados
    - Fazer upload de imagens para os produtos
    - Enviar e-mails automáticos sobre os pedidos 

## O que o cliente não pode fazer
- Restrições de segurança
    - Usuário não pode acessar certas funcionalidades sem estar devidamente autenticado
    - Editar ou cadastrar clientes ou usuários com campos únicos que já existam no banco de dados (cpf, email) 
    - Detalhar o perfil de outro usuário
    - Editar o perfil de outro usuário
- Restrições gerais
    - Editar o id de si mesmo, de outros usuários ou qualquer tipo de id
    - Criar novas tabelas no banco de dados
    - Criar novas categorias
    - Deletar clientes

## Tarefas
- #### Primeira Sprint
    - Criação  do banco de dados - Ederney
    - Cadastrar usuário - Ederney
    - Efetuar login do usuário - Ruan
    - Atualizar perfil do usuário logado - Elivelton
    - Detalhar perfil do usuário logado - Wallace
    - Listar categorias - Wallace
    - Deployar a aplicação - Ruan
- #### Segunda Sprint
    - Atualização de tabelas no banco de dados - Ruan
    - Cadastrar cliente & Detalhar cliente - Ederney
    - Cadastrar produto & Listar e Detalhar produto - Wallace
    - Editar dados do produto & Excluir produto pelo id - Elivelton
    - Editar dados do cliente & Listar clientes - Ruan
- #### Sprint Final
    - Atualização de tabelas no banco de dados - Ruan
    - Aprimorar cadastro & Atualização de produto - Ederney
    - Cadastrar pedido & listar pedido - Elivelton
    - Aplicar validação na exclusão de produto - Wallace
    - Aprimorar exclusão de produto - Ruan
    - Testar e revisar **todas** funcionalidades da aplicação - todos do time
    - Escrever README de como utilizar e principais funcionalidades do projeto

## Banco de Dados
O banco de dados a ser utilizado é o PostgreSQL

#### Tabelas do banco:
- ### Categorias
    - id (serial primary key)
    - descricao (text not null)
- ### Usuarios
    - id (serial primary key)
    - nome (text not null)
    - email (text not null unique)
    - senha  (text not null)
- ### Produtos 
    - id (serial primary key)
    - descricao (varchar(150))
    - quantidade_estoque (integer)
    - valor (integer)
    - categoria_id (integer REFERENCES categorias(id))
    - produto_imagem (varchar(600))
- ### Clientes
    - id (serial primary key)
    - nome (text not null)
    - email (text not null unique)
    - cpf (varchar(11) not null unique)
    - cep (char(8))
    - rua (varchar(150))
    - numero (integer)
    - bairro (varchar(150))
    - cidade (varchar(150))
    - estado (varchar(2))
- ### Pedidos
    - id (serial primary key)
    - cliente_id (integer references clientes(id) not null)
    - observacao (varchar(150))
    - valor_total (integer not null)
- ### Pedido_produtos
    - id (serial primary key)
    - pedido_id (integer references pedidos(id) not null)
    - produto_id (integer references produtos(id) not null)
    - quantidade_produto (integer not null)
    - valor_produto (integer not null)

## Endpoints

<details>
<summary> <b>Autenticação</b> </summary>

- #### `POST` `/login`
    Essa rota retorna o token do usuário caso email e senha estejam corretos
    
    Exemplo de retorno:
    ```JSON
    {
        "usuario":"objeto com dados do usuário com exceção da senha",
        "token":"token para ser utilizado nas outras rotas"
    }
    ```

</details>

<details>
<summary> <b>Categorias</b> </summary>

- #### `GET` `/categoria`
    Essa rota retorna todas as categorias cadastradas no banco de dados.

    As categorias a seguir são registradas previamente:
    - ### **Categorias**

        -   Informática
        -   Celulares
        -   Beleza e Perfumaria
        -   Mercado
        -   Livros e Papelaria
        -   Brinquedos
        -   Moda
        -   Bebê
        -   Games

</details>

<details>
<summary> <b>Usuarios</b> </summary>

- #### `POST` `/usuario`
    Essa rota é utilizada para criação dos usuários
    
    O usuário deve ser informado no body no seguinte padrão:
    ```JSON
    {
        "nome":"nome do usuário",
        "email":"email único no sistema",
        "senha":"senha a ser criptografada com bcrypt"
    }
    ```

    O retorno será um objeto apenas com nome e email do usuário, por razões de segurança em nenhum momento a senha é retornada nas requisições.


- #### `GET` `/usuario`
    Rota que detalha as informações do usuário logado

    Exemplo de retorno:
    ```JSON
    {
        "nome":"nome do usuário",
        "email":"email do usuário"
    }
    ```

- #### `PUT` `/usuario`
    Rota para atualizar **todas** as informações do usuário

    As informações devem ser informadas no corpo da requisição da seguinte forma:

    ```JSON
    {
        "nome":"novo nome",
        "email":"novo email",
        "senha":"nova senha"
    }
    ```

</details>

<details>
<summary> <b>Clientes</b> </summary>

- #### `GET` `/cliente`
    Rota para listar **todos** os clientes

    O retorno é um array com a lista dos clientes

    ```JSON
    [
        {
            "id": 2,
            "nome": "cliente1",
            "email": "cliente1@email.com",
            "cpf": "98745612311",
            "cep": null,
            "rua": null,
            "numero": null,
            "bairro": null,
            "cidade": null,
            "estado": null
        },
        {...},...
    ]
    ```

- #### `GET` `/cliente/:id`
    Rota para detalhar um cliente específico

    O id é um parâmetro de rota que deve ser informado para encontrar o cliente, caso contrário serão listados todos os clientes cadastrados.

    Exemplo de retorno:

    ```JSON
    {
        "id": 2,
        "nome": "cliente1",
        "email": "cliente1@email.com",
        "cpf": "98745612311",
        "cep": null,
        "rua": null,
        "numero": null,
        "bairro": null,
        "cidade": null,
        "estado": null
    }
    ```

    ```JSON
    {
        "mensagem":"Cliente não encontrado"
    }
    ```

- #### `POST` `/cliente`
    Rota para cadastrar um cliente

    No corpo da requisição os campos nome, email e cpf são obrigatórios os demais são extras porém não necessários.

    Exemplo de retorno caso sejam informados apenas os campos obrigatórios:

    ```JSON
    {
        "nome": "cliente1",
        "email": "cliente1@email.com",
        "cpf": "98745612311",
        "cep": null,
        "rua": null,
        "numero": null,
        "bairro": null,
        "cidade": null,
        "estado": null        
    }
    ```

    Exemplo caso o campo cpf ou email já exista no banco de dados: 

    ```JSON
    {
        "mensagem":"Cpf já cadastrado"
    }
    {
        "mensagem":"Email já cadastrado"
    }
    ```

- #### `PUT` `/cliente/:id`
    Rota para atualizar os dados do cliente

    Com exceção do cpf,nome e email, informar os outros dados não é obrigatório. Os dados que não forem informados não serão atualizados e permanecerão com
    o valor antigo.

</details>

<details>
<summary> <b>Produtos</b> </summary>

- #### `POST` `/produto`
    Rota para cadastrar novos produtos.

    Exemplo do corpo da requisição:

    ```JSON
    {
        "descricao":Descricao do produto,
        "quantidade_estoque":numero qtd em estoque,
        "valor":numero do preco,
        "categoria_id":numero do id (deve existir categoria com id informado)
    }
    ```

- #### `GET` `/produto`
    Rota para listar os produtos cadastrados.

    O retorno dessa rota será sempre um array com os produtos cadastrados, caso não exista nenhum produto será um array vazio

- #### `GET` `/produto/:id`
    Rota para detalhar um produto específico. 

    O retorno será sempre um o produto como um objeto, caso exista produto com o id informado. Exemplo:

    ```JSON
    {
        "id":id do produto,
        "descricao":Descricao do produto,
        "quantidade_estoque":numero qtd em estoque,
        "valor":numero do preco,
        "categoria_id":numero do id
    }
    ```

    Caso não exista um produto com o id informado o retorno será o seguinte:

    ```JSON
    {
        "mensagem":"Produto não encontrado"
    }
    ```

    Caso o id não seja um número válido:

    ```JSON
    {
        "mensagem":"O id deve ser um numero valido"
    }
    ```

- #### `PUT` `/produto/:id`
    Rota para atualizar os dados do produto.

    O corpo da requisição será semelhante ao do endpoint de cadastro de produto. O id devera ser informado como parâmetro de rota.

    não há retorno no corpo da resposta (caso a operação tenha sido bem sucedida)

    exemplos de erro:

    ```JSON
    {
        "mensagem":"Produto não encontrado!"
    }
    ```

    ```JSON
    {
        "mensagem":"Categoria não encontrada!"
    }
    ```

- #### `DELETE` `/produto/:id`
    Rota para deletar um produto com base no id informado.

    Não há retorno no corpo da resposta caso o produto seja excluído com sucesso.

    exemplos de erro:

    ```JSON
    {
        "mensagem":"Produto não encontrado."
    }
    ```

    ```JSON
    {
        "mensagem":"Produto não excluido"
    }
    ```

</details>

## Deploy da aplicação
A aplicação estará rodando na url https://vast-teal-yak-hem.cyclic.app/, lá será possível testar os endpoints.
