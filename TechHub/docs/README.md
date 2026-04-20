// Comentário
// Verica em schema.sql se usuario tem permissão para acessar a tabela "pessoas" e se a tabela existe
// Se a tabela existir, faça uma consulta para selecionar todas as pessoas e imprima os resultados

// script7.js vai vai a verificação e o arquivo schema.sql vai criar a tabela e inserir os dados

// o arquivo math.php vai servir para fazer buscas no banco de dados e retornar os resultados para o script7.js

// Conexão com o banco de dados

// Comentário
// Verica em schema.sql se usuario tem permissão para acessar a tabela "pessoas" e se a tabela existe
// Se a tabela existir, faça uma consulta para selecionar todas as pessoas e imprima os resultados

// script7.js vai vai a verificação e o arquivo schema.sql vai criar a tabela e inserir os dados

// o arquivo math.php vai servir para fazer buscas no banco de dados e retornar os resultados para o script7.js

// Conexão com o banco de dados

# 🚀 Desenv. Web - HTML5, CSS, JavaScript, with Authentication

Desenvolvimento Web em Html5, Css, Javascript com **Sistema Completo de Autenticação com JWT**.

## 📋 Estrutura do Projeto

```
├── T3/                          # Portal TechHub
│   ├── index.html               # Página inicial
│   ├── registro.html            # Formulário de registro
│   ├── login.html               # Página de login
│   ├── tags.html                # Aula: Tags HTML (protegida)
│   ├── formularios.html         # Aula: Formulários (protegida)
│   ├── tabelas.html             # Aula: Tabelas (protegida)
│   ├── listas.html              # Aula: Listas (protegida)
│   ├── script.js                # Script principal
│   ├── paises-codigos.js        # Detecção de código telefônico
│   └── styles.css               # Estilos CSS
├── server.js                    # Servidor Node.js
├── package.json                 # Dependências
├── usuarios.json                # Base de dados (gerado)
├── AUTENTICACAO.md              # Documentação completa
└── README.md                    # Este arquivo
```

## 🔐 Sistema de Autenticação (NOVO!)

O TechHub agora possui um **sistema completo de autenticação** com:

- ✅ Registro de usuários com validação
- ✅ Login com JWT token (7 dias de duração)
- ✅ Controle de acesso a páginas protegidas
- ✅ Armazenamento seguro de senhas (bcryptjs)
- ✅ Auto-detecção de código telefônico por país
- ✅ Opção de salvar nick localmente
- ✅ API RESTful com erro handling

## 🚀 Como Executar

### Passo 1: Instalar Node.js
Se ainda não tem, baixe em: https://nodejs.org/

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Iniciar o Servidor
```bash
npm start
```

O servidor será iniciado em: **http://localhost:3000**

### Passo 4: Acessar o Portal
Abra no navegador: **http://localhost:3000**

## 📝 Fluxo de Uso

1. **Primeira Vez**: Acesse `/T3/registro.html` e crie sua conta
   - Nome completo
   - Email
   - Nick (seu identificador único)
   - Senha
   - País (auto-detecta código telefônico)
   - Telefone (opcional)

2. **Login**: Após registrar, você é redirecionado para `/T3/login.html`
   - Nick
   - Senha
   - ✓ Lembrar meu nick neste navegador (opcional)

3. **Acesso**: Após login, você pode acessar:
   - 📝 Tags HTML
   - 📋 Formulários
   - 📊 Tabelas
   - 📑 Listas

4. **Menu**: No menu flutuante, seu nick/nome aparece com opção de "Sair"

## 🔑 Detalhes Técnicos

### Registro
- POST `/api/registrar`
- Valida email e nick únicos
- Criptografa senha com bcryptjs (10 rounds)
- Gera JWT válido por 7 dias
- Salva usuário em `usuarios.json`

### Login
- POST `/api/login`
- Verifica credenciais
- Gera novo token JWT
- Salva nick opcionalmente em localStorage

### Código Telefônico Automático
- Auto-detecta código do país selecionado **no REGISTRO**
- Exibe código formatado (ex: +55 para Brasil)
- Suporta: Brasil, Portugal, México, Argentina, Chile, Colômbia, Peru, Espanha
- Login usa apenas Nick e Senha (sem seleção de país)

## 🌐 Países Suportados

| País | Código |
|------|--------|
| 🇧🇷 Brasil | +55 |
| 🇵🇹 Portugal | +351 |
| 🇲🇽 México | +52 |
| 🇦🇷 Argentina | +54 |
| 🇨🇱 Chile | +56 |
| 🇨🇴 Colômbia | +57 |
| 🇵🇪 Peru | +51 |
| 🇪🇸 Espanha | +34 |

## 💾 Armazenamento

### Servidor
- **usuarios.json**: Banco de dados com usuários e senhas criptografadas

### Cliente
- **tokenTechHub**: JWT token para autenticação
- **usuarioTechHub**: Dados do usuário (nome, nick, email)
- **nickTechHub**: Nick salvo (opcional)

## 🔒 Segurança

- ✅ Senhas criptografadas com bcryptjs
- ✅ Tokens JWT assinados
- ✅ CORS configurado
- ✅ Validação de entrada
- ✅ Proteção de rota (middleware)

## 📚 Documentação Completa

Para detalhes completos sobre a API, endpoints e troubleshooting, veja: [AUTENTICACAO.md](AUTENTICACAO.md)

## ⚠️ Notas Importantes

- Este é um projeto **educacional**
- Para produção, use um banco de dados real (MongoDB, PostgreSQL)
- Mude a `SECRET_KEY` no `server.js`
- Use HTTPS em produção
- Configure CORS para seu domínio específico

## 🎓 Conceitos Aprendidos

Com este projeto você aprenderá sobre:
- HTML5 semântico
- CSS3 responsivo
- JavaScript vanilla
- Node.js e Express
- API RESTful
- Autenticação com JWT
- Criptografia de senhas
- Armazenamento de dados
- LocalStorage e Tokens
- CORS e requisições HTTP

## 📞 Suporte

Encontrou um erro? Verifique:
1. O servidor está rodando (`npm start`)?
2. Você tem a versão correta do Node.js?
3. Executou `npm install`?
4. Verificou o console do navegador (F12) para erros?

---

**Desenvolvido com ❤️ para fins educacionais - TechHub 2026**
