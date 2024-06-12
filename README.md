# Badge System API

## 📕 Descrição
A Badge System API é uma aplicação para gerenciamento de emblemas, onde os usuários podem listar e resgatar emblemas, além de consultar os emblemas já resgatados. Esta API foi desenvolvida utilizando Node.js com o framework NestJS, proporcionando uma estrutura robusta e modular.

## 💻 Tecnologias Utilizadas
- **Node.js**: Ambiente de execução JavaScript
- **NestJS**: Framework para construção de APIs escaláveis em Node.js
- **TypeORM**: ORM para manipulação do banco de dados
- **MySQL**: Banco de dados relacional
- **Swagger**: Documentação da API
- **Passport**: Middleware para autenticação
- **JWT**: Autenticação baseada em tokens

## ⚒️ Requisitos
- **Node.js** (versão 14 ou superior)
- **NPM** (versão 6 ou superior)
- **MySQL** (versão 5.7 ou superior)
- **Git** (para controle de versão)

## 📁 Configuração do Projeto
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/cidadealtarp/badge-system-api.git
   cd badge-system-api
2. **Instale as dependências:**
   ```bash
    npm install
3. **Atualize a configuração do banco de dados no código:**
    - No arquivo src/app.module.ts, certifique-se de que a configuração do TypeORM com as credencias de acesso ao seu MySQL.
4. **Inicie a Aplicação:**
   ```bash
   npm run start
   ```
   - Lembre-se de estar na pasta raiz do projeto, com esse comando ele irá conectar em seu banco de dados e subir a aplicação no endpoint http://localhost:3000/api
5. **Insira as informações no banco de dados:**
    - Com as tabelas criadas basta inserir as informações no banco de dados dos emblemas e usuários.
    ```bash
    INSERT INTO badge (slug, name, image) VALUES
    ('cda', 'Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/cidade-alta.png'),
    ('cda-valley', 'Cidade Alta Valley', 'https://cidadealtarp.com/imagens/challenge/cidade-alta-valley.png'),
    ('policia', 'Policia do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/policia.png'),
    ('hospital', 'Hospital do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/hospital.png'),
    ('mecanica', 'Mecânica do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/mecanica.png'),
    ('taxi', 'Taxi do Cidade Alta', 'https://cidadealtarp.com/imagens/challenge/taxi.png'),
    ('coruja', 'Coruja', 'https://cidadealtarp.com/imagens/challenge/coruja.png'),
    ('hiena', 'Hiena', 'https://cidadealtarp.com/imagens/challenge/hiena.png'),
    ('gato', 'Gato', 'https://cidadealtarp.com/imagens/challenge/gato.png'),
    ('urso', 'Urso', 'https://cidadealtarp.com/imagens/challenge/urso.png');
## 🧑🏻‍💻 Endpoints
### Autenticação
  - POST /auth/register: Registra um novo usuário.
  - POST /auth/login: Autentica um usuário e retorna um token JWT.
### Badges
  - GET /badges/all: Lista todos os emblemas. (Autenticado)
  - GET /badges/paginated: Lista os emblemas com paginação. (Autenticado)
    - Query Params: page, limit
  - GET /badges/filter: Lista os emblemas pelo nome. (Autenticado)
    - Query Params: name
  - GET /badges/filter-paginated: Lista os emblemas pelo nome com paginação. (Autenticado)
    - Query Params: page, limit, name
  - POST /badges/redeem: Resgata um emblema. (Autenticado)
    - Payload: { "slug": "string" }
  - GET /badges/redeemed: Lista todos os emblemas resgatados pelo usuário atual. (Autenticado)
  - GET /badges/redeemed/{userId}: Lista todos os emblemas resgatados por um usuário específico. (Autenticado)
    - Path Params: userId
  ### Users
  - GET /users/{username}: Obtém informações de um usuário pelo username. (Autenticado)
    - Path Params: username

## ✅ Recursos Adicionais Realizados
  - Implementação de autenticação com JWT.
  - Documentação completa da API utilizando Swagger.
  - Paginação no endpoint de listagem de emblemas.
  - Filtragem de emblemas pelo nome no endpoint de listagem de emblemas.
  - Deploy da aplicação.

## 😎 Deploy da Aplicação
  - A aplicação foi implementada no DigitalOcean e está disponível em:
    http://159.203.110.91:3000/api#/
  - Nela já possui dois usuários cadastrados admin/admin e admin2/admin2.
  - Sinta-se à vontade para explorar a API através da interface do Swagger.