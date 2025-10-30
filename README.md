# OpenAI WhatsApp Bot — Infoeste 2025

[Ir para a versão em Português](#pt-br-versao-em-portugues) · [Jump to the English version](#en-english-version)

<details open>
<summary id="pt-br-versao-em-portugues">PT-BR · Versão em Português</summary>

Projeto desenvolvido durante o curso **Construindo Bots com IA no WhatsApp: Node.js + ChatGPT** na Infoeste 2025. O código conecta um agente conversacional da OpenAI ao WhatsApp para atender clientes da GameStore, além de expor rotas HTTP para cadastro e listagem de produtos digitais.

> Professor: Jorge Soares · Instagram: [@kurybr](https://instagram.com/kurybr)

## O que a aplicação faz

- Gera respostas com o modelo `gpt-4o-mini` usando uma persona treinada para vender jogos digitais.
- Recebe mensagens do WhatsApp (via `whatsapp-web.js`) e responde automaticamente chamados que começam com `!`.
- Exibe o QR Code no terminal através do `qrcode-terminal` para autenticar a sessão do WhatsApp.
- Disponibiliza rotas REST: `POST /agentes/msg`, `POST /products/cadastro` e `GET /products/lista`.
- Armazena itens cadastrados em memória e permite que o agente consulte o catálogo ao conversar com clientes.

## Stack e dependências principais

- NestJS 11, TypeScript e `class-validator` (validação global com pipe customizado).
- `openai` para chamadas à API da OpenAI (chat completions com tools).
- `whatsapp-web.js` com autenticação local para integrar o bot ao WhatsApp Web.
- `qrcode-terminal` para imprimir o QR Code diretamente no console.
- `dotenv` para carregar variáveis sensíveis (como a `OPENAI_API_KEY`).

### Instalando dependências com npm

```bash
# dependências de runtime
npm install @nestjs/common @nestjs/core @nestjs/platform-express @nestjs/mapped-types class-transformer class-validator dotenv openai qrcode-terminal reflect-metadata rxjs whatsapp-web.js

# dependências de desenvolvimento
npm install -D @nestjs/cli @nestjs/schematics @nestjs/testing @types/express @types/jest @types/node @types/supertest @eslint/eslintrc @eslint/js eslint eslint-config-prettier eslint-plugin-prettier globals jest prettier source-map-support supertest ts-jest ts-loader ts-node tsconfig-paths typescript typescript-eslint
```

## Pré-requisitos

- `nvm` instalado para facilitar o gerenciamento de versões do Node.
- Node.js `22.21.1` (versão utilizada no curso, selecione com `nvm use 22.21.1`).
- Google Chrome ou Chromium instalado (o caminho padrão está no arquivo `src/services/whatsapp.service.ts`; ajuste conforme o sistema operacional).

## Configuração rápida

```bash
git clone <url-do-repo>
cd OpenAiWhatsApp
nvm install 22.21.1   # roda apenas uma vez
nvm use 22.21.1
npm install
cp .env.example .env  # crie manualmente se ainda não existir
```

Edite o `.env` e defina a sua chave da OpenAI:

```env
OPENAI_API_KEY="sk-..."
PORT=3000
NODE_ENV=development
```

> As boas práticas para variáveis de ambiente estão descritas em `text.md`.

## Executando o projeto

- `npm run start:dev` — servidor NestJS com reload automático.
- `npm run start` — execução em modo padrão.

Ao subir o serviço, um QR Code será impresso no terminal. Leia-o com o WhatsApp para vincular a sessão. Após autenticado, envie mensagens para o número conectado começando com `!` (por exemplo, `!Quais jogos vocês têm de PS5?`).

## Rotas HTTP disponíveis

- `POST /agentes/msg` — recebe `{ "mensagem": "texto" }` e retorna a resposta do agente.
- `GET /products/lista` — devolve todos os produtos cadastrados na sessão atual.
- `POST /products/cadastro` — espera o corpo definido em `src/products/products.dto.ts` para registrar um novo item.

Há um payload de exemplo com 30 jogos em `text.md`. Você pode copiar o JSON e fazer um POST para `http://localhost:3000/products/cadastro` (via Thunder Client, Insomnia, Postman ou `curl`) para popular o catálogo rapidamente.

### Importando o catálogo de jogos via Postman/Insomnia

1. Abra o cliente HTTP da sua preferência (Postman, Insomnia, Thunder Client etc.).
2. Crie uma requisição `POST` para `http://localhost:3000/products/cadastro`.
3. Selecione o tipo de body como `raw` e formato `JSON`.
4. Cole o payload abaixo e envie a requisição. Repita o envio para cada item ou adapte o script para fazer múltiplos posts.

```json
{
	"id": 1,
	"nome": "Fortnite - Pacote Básico",
	"valor": 29,
	"description": "Chave digital para PS5 — inclui skins iniciais"
}
```

Se preferir automatizar, utilize o script abaixo (via `node`, Postman Collection Runner ou outra automação) que dispara um POST por item:

```json
[
	{ "id": 1, "nome": "Fortnite - Pacote Básico", "valor": 29, "description": "Chave digital para PS5 — inclui skins iniciais" },
	{ "id": 2, "nome": "GTA V - Edição Definitiva (PS5)", "valor": 89, "description": "Edição digital com bônus de lançamento" },
	{ "id": 3, "nome": "Call of Duty: MW II - Standard (PC)", "valor": 199, "description": "Versão digital para PC, sem extras" },
	{ "id": 4, "nome": "Valorant - Pacote Agente", "valor": 39, "description": "Bundle de agente e V-Bucks substituto" },
	{ "id": 5, "nome": "FIFA 24 - Edição Padrão", "valor": 149, "description": "Chave digital com acesso online" },
	{ "id": 6, "nome": "The Last of Us Part I - PS5", "valor": 129, "description": "Remake para PS5 - digital" },
	{ "id": 7, "nome": "Elden Ring - Standard", "valor": 159, "description": "Aventura RPG, chave digital PC/PS5" },
	{ "id": 8, "nome": "Cyberpunk 2077 - Phantom Liberty", "valor": 119, "description": "Expansão + jogo base (digital)" },
	{ "id": 9, "nome": "Assassin's Creed Valhalla - Deluxe", "valor": 99, "description": "Edição digital com itens cosméticos" },
	{ "id": 10, "nome": "Resident Evil Village - PS5", "valor": 79, "description": "Horror de sobrevivência - chave digital" },
	{ "id": 11, "nome": "Fortnite - Pacote de Natal", "valor": 49, "description": "Conteúdo sazonal e skins exclusivas" },
	{ "id": 12, "nome": "GTA V - Pacote Veículos", "valor": 59, "description": "Conteúdo adicional in-game" },
	{ "id": 13, "nome": "Call of Duty - Season Pass", "valor": 119, "description": "Season pass com mapas e skins" },
	{ "id": 14, "nome": "Valorant - Pacote de Skins", "valor": 69, "description": "Skins temáticas para armas" },
	{ "id": 15, "nome": "FIFA 24 - Ultimate Pack", "valor": 249, "description": "Conteúdo FUT deluxe" },
	{ "id": 16, "nome": "The Last of Us - Soundtrack Digital", "valor": 19, "description": "Trilha sonora oficial - download" },
	{ "id": 17, "nome": "Elden Ring - DLC Pack", "valor": 79, "description": "Conteúdo adicional do mundo" },
	{ "id": 18, "nome": "Cyberpunk 2077 - Skin Bundle", "valor": 29, "description": "Skins e emotes exclusivos" },
	{ "id": 19, "nome": "Assassin's Creed - Pacote História", "valor": 39, "description": "Missões adicionais - digital" },
	{ "id": 20, "nome": "Resident Evil - Pack de Armas", "valor": 24, "description": "Itens para personalizar arsenal" },
	{ "id": 21, "nome": "Fortnite - Passe de Batalha", "valor": 59, "description": "Temporada completa do Passe" },
	{ "id": 22, "nome": "GTA V - Pacote Online", "valor": 69, "description": "Conteúdo multiplayer e bônus" },
	{ "id": 23, "nome": "Call of Duty - Weapon Pack", "valor": 34, "description": "Pacote de armas raras" },
	{ "id": 24, "nome": "Valorant - Agente Lendário", "valor": 99, "description": "Unlock de agente com itens" },
	{ "id": 25, "nome": "FIFA 24 - Season Unlock", "valor": 79, "description": "Desbloqueio de temporada" },
	{ "id": 26, "nome": "Elden Ring - Guide Digital", "valor": 14, "description": "Guia digital com dicas e mapas" },
	{ "id": 27, "nome": "Cyberpunk - Neon Pack", "valor": 44, "description": "Itens visuais e emotes" },
	{ "id": 28, "nome": "Assassin's Creed - Edição Gold", "valor": 129, "description": "Jogo + DLCs + extras" },
	{ "id": 29, "nome": "Resident Evil - Deluxe Edition", "valor": 109, "description": "Edição com conteúdo adicional" },
	{ "id": 30, "nome": "Pacote Indie - Vários Títulos", "valor": 49, "description": "Bundle digital com 3 indies" }
]
```

> Dica: em Postman ou Insomnia, use scripts para iterar sobre o array e enviar um POST por item; em `node`, basta percorrer o array e chamar `fetch` ou `axios` apontando para o endpoint.

## Arquitetura em alto nível

- `src/services/openai.service.ts`: inicializa o cliente da OpenAI assim que o módulo sobe.
- `src/services/whatsapp.service.ts`: configura o cliente do WhatsApp, gera o QR Code e registra listeners dinamicamente.
- `src/agentes/agentes.controller.ts`: amarra as mensagens do WhatsApp ao agente da OpenAI, incluindo uma tool para listar produtos.
- `src/products/*`: expõe endpoints REST para cadastro/listagem com validação via `class-validator`.
- `src/pipe/validacion.pipe.ts`: pipe global aplicado em `main.ts` para garantir DTOs válidos.

</details>

<details>
<summary id="en-english-version">EN · English Version</summary>

Project built during the course **Building WhatsApp Bots with AI: Node.js + ChatGPT**, Infoeste 2025. It connects an OpenAI conversational agent to WhatsApp to assist GameStore customers and exposes HTTP routes to store and list digital products.

> Instructor: jorge Soares
· Instagram: [@kurybr](https://instagram.com/kurybr)

## What the app does

- Generates answers with the `gpt-4o-mini` model aligned with a persona specialized in selling digital games.
- Listens to WhatsApp messages (via `whatsapp-web.js`) and auto-replies whenever the message starts with `!`.
- Prints the login QR Code in the terminal using `qrcode-terminal` so you can link the WhatsApp session.
- Exposes REST routes: `POST /agentes/msg`, `POST /products/cadastro`, and `GET /products/lista`.
- Stores registered items in memory so the agent can query the product catalog during conversations.

## Tech stack and key libraries

- NestJS 11, TypeScript, and `class-validator` (global validation pipe).
- `openai` for Chat Completions with tool support.
- `whatsapp-web.js` with local auth to control WhatsApp Web.
- `qrcode-terminal` to render the QR code straight in the console.
- `dotenv` to load sensitive variables (such as `OPENAI_API_KEY`).

### Installing dependencies with npm

```bash
# runtime dependencies
npm install @nestjs/common @nestjs/core @nestjs/platform-express @nestjs/mapped-types class-transformer class-validator dotenv openai qrcode-terminal reflect-metadata rxjs whatsapp-web.js

# dev dependencies
npm install -D @nestjs/cli @nestjs/schematics @nestjs/testing @types/express @types/jest @types/node @types/supertest @eslint/eslintrc @eslint/js eslint eslint-config-prettier eslint-plugin-prettier globals jest prettier source-map-support supertest ts-jest ts-loader ts-node tsconfig-paths typescript typescript-eslint
```

## Prerequisites

- `nvm` installed to pin Node versions easily.
- Node.js `22.21.1` (course baseline, run `nvm use 22.21.1`).
- Google Chrome or Chromium available (default executable path lives in `src/services/whatsapp.service.ts`; tweak per OS).

## Quick setup

```bash
git clone <repo-url>
cd OpenAiWhatsApp
nvm install 22.21.1   # only once
nvm use 22.21.1
npm install
cp .env.example .env  # create manually if needed
```

Edit `.env` and inject your OpenAI key:

```env
OPENAI_API_KEY="sk-..."
PORT=3000
NODE_ENV=development
```

> `text.md` contains detailed environment-variable guidelines.

## Running the app

- `npm run start:dev` — NestJS dev server with auto reload.
- `npm run start` — standard execution mode.

When the service boots, a QR Code appears in the terminal. Scan it with WhatsApp to link the session. Once authenticated, send messages starting with `!` (for example, `!Which PS5 games are in stock?`).

## HTTP endpoints

- `POST /agentes/msg` — expects `{ "mensagem": "text" }` and returns the agent reply.
- `GET /products/lista` — returns every product registered in the current session.
- `POST /products/cadastro` — expects the schema defined in `src/products/products.dto.ts` to add a new item.

A JSON payload with 30 sample products lives in `text.md`. Copy it and POST to `http://localhost:3000/products/cadastro` (Thunder Client, Insomnia, Postman, or `curl`) to bootstrap the catalog fast.

### Importing the product catalog (Postman/Insomnia)

1. Open your favorite HTTP client (Postman, Insomnia, Thunder Client, etc.).
2. Create a `POST` request targeting `http://localhost:3000/products/cadastro`.
3. Set the body to `raw` + `JSON`.
4. Paste the sample payload below and send the request. Repeat for each item or script a loop for batch inserts.

```json
{
	"id": 1,
	"nome": "Fortnite - Pacote Básico",
	"valor": 29,
	"description": "Chave digital para PS5 — inclui skins iniciais"
}
```

To automate the process, rely on the dataset below (use `node`, Postman Collection Runner, or any scripting tool) to trigger one POST per product:

```json
[
	{ "id": 1, "nome": "Fortnite - Pacote Básico", "valor": 29, "description": "Chave digital para PS5 — inclui skins iniciais" },
	{ "id": 2, "nome": "GTA V - Edição Definitiva (PS5)", "valor": 89, "description": "Edição digital com bônus de lançamento" },
	{ "id": 3, "nome": "Call of Duty: MW II - Standard (PC)", "valor": 199, "description": "Versão digital para PC, sem extras" },
	{ "id": 4, "nome": "Valorant - Pacote Agente", "valor": 39, "description": "Bundle de agente e V-Bucks substituto" },
	{ "id": 5, "nome": "FIFA 24 - Edição Padrão", "valor": 149, "description": "Chave digital com acesso online" },
	{ "id": 6, "nome": "The Last of Us Part I - PS5", "valor": 129, "description": "Remake para PS5 - digital" },
	{ "id": 7, "nome": "Elden Ring - Standard", "valor": 159, "description": "Aventura RPG, chave digital PC/PS5" },
	{ "id": 8, "nome": "Cyberpunk 2077 - Phantom Liberty", "valor": 119, "description": "Expansão + jogo base (digital)" },
	{ "id": 9, "nome": "Assassin's Creed Valhalla - Deluxe", "valor": 99, "description": "Edição digital com itens cosméticos" },
	{ "id": 10, "nome": "Resident Evil Village - PS5", "valor": 79, "description": "Horror de sobrevivência - chave digital" },
	{ "id": 11, "nome": "Fortnite - Pacote de Natal", "valor": 49, "description": "Conteúdo sazonal e skins exclusivas" },
	{ "id": 12, "nome": "GTA V - Pacote Veículos", "valor": 59, "description": "Conteúdo adicional in-game" },
	{ "id": 13, "nome": "Call of Duty - Season Pass", "valor": 119, "description": "Season pass com mapas e skins" },
	{ "id": 14, "nome": "Valorant - Pacote de Skins", "valor": 69, "description": "Skins temáticas para armas" },
	{ "id": 15, "nome": "FIFA 24 - Ultimate Pack", "valor": 249, "description": "Conteúdo FUT deluxe" },
	{ "id": 16, "nome": "The Last of Us - Soundtrack Digital", "valor": 19, "description": "Trilha sonora oficial - download" },
	{ "id": 17, "nome": "Elden Ring - DLC Pack", "valor": 79, "description": "Conteúdo adicional do mundo" },
	{ "id": 18, "nome": "Cyberpunk 2077 - Skin Bundle", "valor": 29, "description": "Skins e emotes exclusivos" },
	{ "id": 19, "nome": "Assassin's Creed - Pacote História", "valor": 39, "description": "Missões adicionais - digital" },
	{ "id": 20, "nome": "Resident Evil - Pack de Armas", "valor": 24, "description": "Itens para personalizar arsenal" },
	{ "id": 21, "nome": "Fortnite - Passe de Batalha", "valor": 59, "description": "Temporada completa do Passe" },
	{ "id": 22, "nome": "GTA V - Pacote Online", "valor": 69, "description": "Conteúdo multiplayer e bônus" },
	{ "id": 23, "nome": "Call of Duty - Weapon Pack", "valor": 34, "description": "Pacote de armas raras" },
	{ "id": 24, "nome": "Valorant - Agente Lendário", "valor": 99, "description": "Unlock de agente com itens" },
	{ "id": 25, "nome": "FIFA 24 - Season Unlock", "valor": 79, "description": "Desbloqueio de temporada" },
	{ "id": 26, "nome": "Elden Ring - Guide Digital", "valor": 14, "description": "Guia digital com dicas e mapas" },
	{ "id": 27, "nome": "Cyberpunk - Neon Pack", "valor": 44, "description": "Itens visuais e emotes" },
	{ "id": 28, "nome": "Assassin's Creed - Edição Gold", "valor": 129, "description": "Jogo + DLCs + extras" },
	{ "id": 29, "nome": "Resident Evil - Deluxe Edition", "valor": 109, "description": "Edição com conteúdo adicional" },
	{ "id": 30, "nome": "Pacote Indie - Vários Títulos", "valor": 49, "description": "Bundle digital com 3 indies" }
]
```

> Tip: in Postman/Insomnia, add a pre-request script to iterate through the dataset and send a POST per entry; in `node`, loop through the array and call `fetch` or `axios` against the endpoint.

## High-level architecture

- `src/services/openai.service.ts`: bootstraps the OpenAI client when the module loads.
- `src/services/whatsapp.service.ts`: configures the WhatsApp client, prints the QR Code, and plugs dynamic listeners.
- `src/agentes/agentes.controller.ts`: wires WhatsApp messages to the OpenAI agent, including a function tool to list products.
- `src/products/*`: exposes REST endpoints for product CRUD with `class-validator` DTOs.
- `src/pipe/validacion.pipe.ts`: global validation pipe registered in `main.ts`.


</details>
