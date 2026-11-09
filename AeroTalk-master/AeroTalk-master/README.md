# AeroTalk • English for Airports

> **Centro Universitário UNIFACVEST**  
> **Curso:** Ciência da Computação  
> **Disciplina:** Laboratório de Programação  
> **Professor:** Willen Leolatto Carneiro  
> **Projeto:** Sistema de Fraseologia, Diálogos e Gestão de Lições Aeroportuárias Multilíngue

---

## ✈️ 1. Sobre o Projeto

O **AeroTalk** é uma plataforma web educacional e profissional voltada para a capacitação em língua inglesa e operações aeroportuárias internacionais. O sistema atende tanto passageiros quanto profissionais do setor aéreo (agentes de check-in, fiscais de segurança, comissários de bordo e operadores de tráfego de solo), combinando teoria contextualizada, diálogos práticos, síntese nativa de voz (Web Speech API), simuladores de exercícios interativos e um sistema completo de gestão de lições conectado a banco de dados relacional.

O projeto foi orquestrado e desenvolvido adotando **Inteligência Artificial (IA)** como ferramenta de assistência ativa, onde a equipe exerceu rigorosamente as funções de **Engenharia de Software**, planejamento arquitetural e revisão crítica de código (*Code Review*).

---

## 🛠️ 2. Pilha Tecnológica (Stack)

O projeto cumpre estritamente os limites e requisitos de versão definidos no edital da disciplina:

- **Backend:** [Node.js](https://nodejs.org/) (versão `v24.20.0` LTS) com o microframework [Express](https://expressjs.com/).
- **Hot-Reload / Dev Server:** [Nodemon](https://nodemon.io/) configurado para reiniciar o servidor automaticamente a cada alteração.
- **Banco de Dados & Infraestrutura:** [PostgreSQL](https://www.postgresql.org/) (versão 15) provisionado e isolado via **Docker** e **Docker Compose**, utilizando volume nomeado para persistência física dos dados.
- **Mapeamento Objeto-Relacional (ORM):** [Prisma ORM](https://www.prisma.io/) com schemas fortemente tipados, migrações automatizadas e relacionamento 1:N com deleção em cascata (`Cascade`).
- **Frontend:** template EJS renderizado no Express, HTML5 semântico, CSS3 responsivo e JavaScript ES6+ assíncrono consumindo a API RESTful via `fetch()`.
- **Acessibilidade & Áudio:** [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) nativa do navegador para reprodução instantânea de pronúncia em inglês sem latência externa.

---

## 🏛️ 3. Arquitetura do Sistema (Padrão MVC)

O backend segue a separação de responsabilidades pelo padrão **Model-View-Controller (MVC)**:

```
src/
├── controllers/
│   ├── licaoController.js   # Regras de negócio e CRUD de lições e conteúdos
│   └── authController.js    # Lógica de validação, cadastro e login de usuários
├── routes/
│   ├── licaoRoutes.js       # Roteamento dos endpoints da API (/api/licoes)
│   └── authRoutes.js        # Roteamento de autenticação (/api/auth)
└── server.js                # Inicialização do Express, middlewares (CORS, JSON) e arquivos estáticos
```

```
prisma/
└── schema.prisma            # Modelos relacionais (Usuario, Licao, ConteudoLicao)
```

```
public/
├── index.html               # Template EJS com estrutura HTML da interface
├── styles.css               # Estilos responsivos da aplicação
├── app.js                   # Interações, exercícios e consumo da API REST
└── favicon.svg              # Ícone vetorial temático do sistema (avião)
```

Senhas de usuários são armazenadas com hash bcrypt. O servidor carrega as variáveis de ambiente do arquivo `.env`.

---

## 📋 4. Pré-requisitos para Execução

Antes de iniciar, certifique-se de ter instalado em sua máquina:

1. **Node.js** (versão 22.x a 24.x LTS) — [Download](https://nodejs.org/)
2. **Docker Desktop** (com Docker Compose ativo) — [Download](https://www.docker.com/products/docker-desktop/)
3. **Git** — [Download](https://git-scm.com/)

---

## 🚀 5. Como Executar a Aplicação (Passo a Passo)

### 1. Clonar o Repositório
```bash
git clone <URL_DO_REPOSITORIO_GITHUB>
cd moedas2Dois
```

### 2. Instalar as Dependências do Node.js
```bash
npm install
```

### 3. Configurar as Variáveis de Ambiente
Copie o modelo `.env.example` para `.env` na raiz do projeto:
```powershell
Copy-Item .env.example .env
```
Edite o `.env` e substitua `USUARIO` e `SENHA` pelos valores de `POSTGRES_USER` e `POSTGRES_PASSWORD` no `docker-compose.yml`. O arquivo `.env` contém credenciais locais e não deve ser enviado ao GitHub; o `.env.example` é o modelo seguro versionado.

### 4. Inicializar o Banco de Dados PostgreSQL no Docker
Com o Docker Desktop aberto, execute na raiz do projeto:
```bash
docker compose up -d
```
> Isso iniciará o contêiner `conversor_postgres` na porta `5432` com volume persistente.

### 5. Sincronizar o Schema do Banco via Prisma
Gere o Prisma Client e sincronize as tabelas no PostgreSQL:
```bash
npx prisma db push
```

### 6. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 7. Acessar no Navegador
Abra seu navegador no endereço:
```
http://localhost:3000
```
O Express renderiza a página com EJS e serve os arquivos de estilo e JavaScript. Não abra a pasta pelo Live Server: nesse caso, as rotas da API e a conexão ao banco não estarão disponíveis.

---

## 📡 6. Documentação dos Endpoints da API RESTful

A API do Express expõe as seguintes rotas JSON estruturadas:

### 👤 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição | Status de Sucesso | Status de Erro |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Cadastra um novo usuário no banco | `201 Created` | `400` / `500` |
| `POST` | `/api/auth/login` | Realiza autenticação com e-mail e senha | `200 OK` | `400` / `401` / `500` |

### 📚 Lições e Conteúdos (`/api/licoes`)

| Método | Endpoint | Descrição | Status de Sucesso | Status de Erro |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/licoes` | Lista todas as lições cadastradas com conteúdos | `200 OK` | `500` |
| `GET` | `/api/licoes/:id` | Busca os dados de uma lição específica por ID | `200 OK` | `404` / `500` |
| `POST` | `/api/licoes` | Cria uma nova lição (suporta conteúdos aninhados) | `201 Created` | `500` |
| `PUT` | `/api/licoes/:id` | Atualiza o título ou categoria de uma lição | `200 OK` | `500` |
| `DELETE` | `/api/licoes/:id` | Remove a lição e seus conteúdos em cascata | `204 No Content` | `500` |

---

## 🧪 7. Testes Automatizados da API (`teste.http`)

O projeto inclui o arquivo [`teste.http`](file:///c:/xampp/htdocs/moedas2Dois/teste.http) na raiz. Caso utilize o VS Code com a extensão **REST Client** ou **Thunder Client**, você pode disparar as requisições de teste diretamente clicando em *Send Request*:

- Criação de Lições com termos traduzidos aninhados.
- Teste de registro de novo usuário.
- Teste de login com credenciais válidas e inválidas.
- Listagem geral e busca por identificador único.

---

## 📁 8. Estrutura de Diretórios do Projeto

Estrutura rigorosamente alinhada às diretrizes da disciplina:

```
meu-projeto/
├── docs/                      # Pasta para imagens e documentos extras
│   └── kanban-prints/         # Capturas de tela (prints) da evolução do quadro Kanban
├── prisma/                    # Esquema relacional e migrações do Prisma ORM
│   └── schema.prisma          # Configuração das entidades do banco de dados
├── public/                    # HTML, CSS e JavaScript do frontend
│   ├── index.html             # Template EJS renderizado pelo Express
│   ├── styles.css             # Estilos CSS responsivos
│   ├── app.js                 # Interações e integração com a API do backend
│   └── favicon.svg            # Ícone da aplicação
├── src/                       # Código-fonte do backend
│   ├── controllers/           # Regras de negócio da API (MVC)
│   └── routes/                # Definição e roteamento dos endpoints
│   └── server.js              # Ponto de entrada do servidor Node.js/Express
├── .gitignore                 # Arquivos ignorados pelo Git (ex: node_modules/, .env)
├── docker-compose.yml         # Orquestração do PostgreSQL via Docker
├── DOCUMENTACAO_IA.md         # (OBRIGATÓRIO) Tabela analítica de uso e prompts da IA
├── package.json               # Dependências, scripts (nodemon) e metadados
└── README.md                  # Apresentação do projeto e manual de execução local
```

---

## 🤖 9. Documentação do Uso de Inteligência Artificial

Em estrita conformidade com a Seção 7 do edital da disciplina, todas as interações com agentes de Inteligência Artificial, os prompts exatos empregados, os ciclos de refinamento de código e as justificativas técnicas adotadas pela dupla estão registradas no arquivo:

📄 [**`DOCUMENTACAO_IA.md`**](file:///c:/xampp/htdocs/moedas2Dois/DOCUMENTACAO_IA.md)

---

## 👥 10. Autoria e Avaliação

- **Instituição:** Centro Universitário UNIFACVEST
- **Disciplina:** Laboratório de Programação (Engenharia de Software)
- **Professor Avaliador:** Willen Leolatto Carneiro
- **Data da Apresentação:** 09/11/2026
