## Informações úteis — configuração de ambiente

Este arquivo explica como configurar variáveis de ambiente para rodar este projeto localmente e em produção. Ele inclui exemplos seguros, boas práticas e dicas de solução de problemas.

### 1) Crie um arquivo `.env` na raiz do projeto

Crie um arquivo chamado `.env` no diretório raiz do repositório e adicione as variáveis necessárias. **NÃO** coloque chaves reais em commits — nunca versione o `.env`.

### 2) Variáveis principais

- `OPENAI_API_KEY` — chave da OpenAI (obrigatório para funcionalidades que usam a API).
- `PORT` — porta onde a aplicação irá rodar (opcional; default 3000).
- `NODE_ENV` — `development` | `production` (opcional).
- Outras variáveis do seu ambiente (banco de dados, sessão do WhatsApp, etc.) — declare conforme necessário.

### 3) Exemplo seguro de `.env` (sem chaves reais)

Crie um arquivo `.env.example` com este conteúdo e copie para `.env` localmente:

```env
OPENAI_API_KEY="sk-COLOQUE_SUA_CHAVE_AQUI"
PORT=3000
NODE_ENV=development
```

No Windows PowerShell, para copiar o exemplo:

```powershell
Copy-Item .env.example .env
```

### 4) Como obter a chave da OpenAI

1. Vá para https://platform.openai.com/ e faça login.
2. Acesse a seção de API keys e gere uma nova chave.
3. Cole a chave em `OPENAI_API_KEY` no seu `.env` local.

### 5) Uso no projeto

O código lê variáveis com `process.env.OPENAI_API_KEY` (NestJS/Node.js). Exemplo simples:

```ts
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error('OPENAI_API_KEY ausente');
```

### 6) Segurança e deployment

- Adicione `.env` ao seu `.gitignore` para evitar commits acidentais.
- Em produção, use um gerenciador de segredos (Azure Key Vault, AWS Secrets Manager, GitHub Actions secrets) em vez de arquivos `.env` diretamente.

### 7) Solução de problemas rápida

- Erro "Missing API key" — verifique se `OPENAI_API_KEY` está corretamente definida no `.env` e reinicie o servidor.
- Variáveis não lidas — confirme que o carregamento do `.env` (ex.: `dotenv`) está configurado antes de acessar `process.env`.

### 8) Comandos úteis

```powershell
# copiar exemplo para .env (PowerShell)
Copy-Item .env.example .env

# iniciar em modo de desenvolvimento (exemplo)
npm run start:dev
```

Se quiser, posso:

- adicionar um arquivo `.env.example` ao repositório (sem valores sensíveis),
- adicionar/confirmar entrada `.env` em `.gitignore`,
- ou fazer uma verificação rápida em `src/openai.service.ts` para garantir que o projeto falha com mensagem clara quando a chave estiver ausente.

---

Se preferir, diga quais variáveis você já usa no projeto (ex.: `DATABASE_URL`, `WHATSAPP_SESSION`) que eu incluo no `text.md` e crio o `.env.example` correspondente.
# Crie um arquivo `.env`

```
OPENAI_API_KEY="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"
```


### https://notepad.ink/kurybr


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