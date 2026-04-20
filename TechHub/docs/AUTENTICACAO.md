// Comentário
// Verica em schema.sql se usuario tem permissão para acessar a tabela "pessoas" e se a tabela existe
// Se a tabela existir, faça uma consulta para selecionar todas as pessoas e imprima os resultados

// script7.js vai vai a verificação e o arquivo schema.sql vai criar a tabela e inserir os dados

// o arquivo math.php vai servir para fazer buscas no banco de dados e retornar os resultados para o script7.js

// Conexão com o banco de dados

# 🔐 TechHub - Sistema de Autenticação com JWT

Sistema completo de registro e login para o portal TechHub com autenticação baseada em tokens JWT, armazenamento de usuários em servidor e dados persistentes locais.

## 🚀 Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Iniciar o Servidor

```bash
npm start
```

O servidor rodará em: **http://localhost:3000**

## 📋 Fluxo de Funcionamento

### Registro
1. Usuário acessa `/T3/registro.html`
2. Preenche formulário com:
   - Nome completo (mín. 3 caracteres)
   - Email
   - Nick (mín. 3 caracteres, sem espaços)
   - Senha (mín. 6 caracteres)
   - País (auto-detecta código telefônico)
   - Telefone (optional)
   - Interesse (tópico principal)
3. Dados são enviados para o servidor
4. Servidor valida e criptografa a senha com bcryptjs
5. Usuário é salvo em `usuarios.json`
6. Token JWT é gerado e retornado
7. Redireciona para página de login

### Login
1. Usuário acessa `/T3/login.html`
2. Insere Nick e Senha
3. Opção: Salvar nick localmente para próximos acessos
4. Servidor verifica credenciais
5. Se válido, gera token JWT
6. Token é armazenado no localStorage
7. Redireciona para página inicial

**Nota:** O campo País é preenchido apenas no REGISTRO, não no login.

### Proteção de Páginas
- Páginas protegidas: `tags.html`, `formularios.html`, `tabelas.html`, `listas.html`
- Sem token válido → redireciona para `/T3/login.html`
- Com token válido → acesso completo

### Menu do Usuário
- Mostra nick/nome e email do usuário logado
- Botão "Sair" para fazer logout
- Link de registro fica oculto para usuários logados

## 📁 Estrutura de Arquivos

```
.
├── server.js                    # Servidor Node.js/Express
├── package.json                 # Dependências do projeto
├── usuarios.json               # BD de usuários (gerado)
├── T3/
│   ├── index.html              # Página inicial
│   ├── registro.html           # Formulário de registro
│   ├── login.html              # Página de login
│   ├── tags.html               # Página protegida
│   ├── formularios.html        # Página protegida
│   ├── tabelas.html            # Página protegida
│   ├── listas.html             # Página protegida
│   ├── script.js               # Script principal (autenticação)
│   ├── paises-codigos.js       # Códigos telefônicos por país
│   └── styles.css              # Estilos CSS
└── .gitignore                  # Arquivos ignorados no git
```

## 🔑 Endpoints da API

### POST /api/registrar
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "nick": "joao123",
  "senha": "senha123",
  "pais": "Brasil",
  "telefone": "11999999999",
  "interesse": "tags"
}
```
**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Usuário registrado com sucesso!",
  "token": "eyJhbG...",
  "usuario": {
    "id": "1234567890",
    "nome": "João Silva",
    "nick": "joao123",
    "email": "joao@email.com"
  }
}
```

### POST /api/login
```json
{
  "nick": "joao123",
  "senha": "senha123"
}
```
**Resposta:**
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso!",
  "token": "eyJhbG...",
  "usuario": {
    "id": "1234567890",
    "nome": "João Silva",
    "nick": "joao123",
    "email": "joao@email.com",
    "pais": "Brasil"
  }
}
```

### GET /api/verificar-token
**Headers:**
```
Authorization: Bearer eyJhbG...
```
**Resposta:**
```json
{
  "sucesso": true,
  "valido": true,
  "usuario": {
    "id": "1234567890",
    "nick": "joao123",
    "email": "joao@email.com"
  }
}
```

### GET /api/usuario/:id
**Headers:**
```
Authorization: Bearer eyJhbG...
```
**Resposta:**
```json
{
  "sucesso": true,
  "usuario": {
    "id": "1234567890",
    "nome": "João Silva",
    "nick": "joao123",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "interesse": "tags",
    "pais": "Brasil",
    "dataRegistro": "2026-04-11T10:30:00.000Z"
  }
}
```

## 🔒 Segurança

- ✅ Senhas criptografadas com **bcryptjs** (10 rounds de salt)
- ✅ Autenticação com **JWT** (validade: 7 dias)
- ✅ CORS habilitado para requisições do frontend
- ✅ Validação de entrada em todos os endpoints
- ✅ Verificação de token em endpoints protegidos

## 💾 Armazenamento de Dados

### Servidor (usuarios.json)
```json
[
  {
    "id": "1234567890",
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "interesse": "tags",
    "nick": "joao123",
    "senha": "$2a$10$...", // bcrypt hash
    "pais": "Brasil",
    "dataRegistro": "2026-04-11T10:30:00.000Z",
    "ativo": true
  }
]
```

### Cliente (localStorage)
```javascript
// tokenTechHub - JWT token
localStorage.getItem('tokenTechHub')

// usuarioTechHub - Dados do usuário
{
  "id": "1234567890",
  "nome": "João Silva",
  "nick": "joao123",
  "email": "joao@email.com"
}

// nickTechHub - Nick salvo (opcional)
localStorage.getItem('nickTechHub')
```

## 🌍 Códigos de Países Suportados

| País | Código |
|------|--------|
| Brasil | +55 |
| Portugal | +351 |
| México | +52 |
| Argentina | +54 |
| Chile | +56 |
| Colômbia | +57 |
| Peru | +51 |
| Espanha | +34 |
| Outro | +1 |

O código do país é **auto-detectado** ao selecionar o país no formulário de **REGISTRO** (não há seleção de país no login).

## 📱 Recursos Principais

- ✅ Registro com validação completa
- ✅ Login seguro com JWT (Nick + Senha)
- ✅ Armazenamento de nick localmente (opcional)
- ✅ Auto-detecção de código telefônico por país (no registro)
- ✅ Controle de acesso a páginas protegidas
- ✅ Menu dinâmico com dados do usuário
- ✅ Função de logout com confirmação
- ✅ API RESTful completa
- ✅ Resposta em JSON com mensagens claras
- ✅ Validações no servidor e cliente

## 🐛 Troubleshooting

### "Erro ao conectar ao servidor"
- Certifique-se de que o servidor está rodando: `npm start`
- Verifique se está escutando em `http://localhost:3000`

### "Nick ou senha incorretos"
- Verifique se o nick foi digitado corretamente
- Lembre-se que nicks são case-sensitive

### "Token inválido"
- O token pode ter expirado (válido por 7 dias)
- Faça login novamente para obter um novo token

### "Email/Nick já cadastrado"
- Escolha um email ou nick diferente
- Se precisar resetar, delete manualmente de `usuarios.json`

## 📝 Notas Importantes

1. **Ambiente de Desenvolvimento**: Este sistema usa `usuarios.json` como BD. Para produção, use um banco de dados real (MongoDB, PostgreSQL, etc)
2. **Chave Secreta**: A `SECRET_KEY` no servidor está configurada como exemplo. Mude em produção!
3. **HTTPS em Produção**: Sempre use HTTPS para proteger os tokens JWT
4. **CORS**: Atualmente aceita cualquer origem. Configure para seu domínio em produção

## 🚀 Próximas Melhorias

- [ ] Integração com banco de dados real
- [ ] Reset de senha por email
- [ ] Autenticação social (Google, GitHub)
- [ ] Dashboard de usuário
- [ ] Histórico de acessos
- [ ] Dois fatores de autenticação (2FA)

---

**Desenvolvido para fins educacionais - TechHub 2026**
