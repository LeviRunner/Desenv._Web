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

# 📦 TechHub - Configuração de Produção Completa

## ✅ Status Atual

✓ **Site:** TechHub  
✓ **Status:** Pronto para Migração  
✓ **Versão:** 1.0.0  
✓ **URL Produção:** https://techhub.com.br  
✓ **Auto-Login:** ✅ Ativado e Configurado  

---

## 🎯 Links de Auto-Login para Compartilhar

### Produção (HTTPS - techhub.com.br)

| Página | Link |
|--------|------|
| **Início** | https://techhub.com.br/index.html?teste=ativo |
| **Tags HTML** | https://techhub.com.br/tags.html?teste=ativo |
| **Formulários** | https://techhub.com.br/formularios.html?teste=ativo |
| **Tabelas** | https://techhub.com.br/tabelas.html?teste=ativo |
| **Listas** | https://techhub.com.br/listas.html?teste=ativo |
| **Gráficos** | https://techhub.com.br/graficos.html?teste=ativo |

### Dashboard de Links
```
https://techhub.com.br/auto-login-links.html
```

---

## 📁 Arquivos de Configuração Criados

### `.env` - Variáveis de Ambiente
```
SITE_NAME=TechHub
SITE_URL_PROD=https://techhub.com.br
NODE_ENV=production
ALLOWED_ORIGINS=https://techhub.com.br,https://www.techhub.com.br
```

### `config.json` - Configurações do Site
```json
{
  "site": {
    "nome": "TechHub",
    "url": "https://techhub.com.br"
  }
}
```

### Nginx Configuration
- Arquivo: `nginx.conf.example`
- Inclui: SSL/TLS, CORS, proxy reverso, cache

### PM2 Configuration
- Arquivo: `ecosystem.config.js`
- Gerencia múltiplas instâncias do servidor

### Scripts de Setup
- Arquivo: `setup.sh`
- Automatiza instalação em novo servidor

---

## 🚀 Próximas Etapas para Migração

### 1. **Preparar Servidor de Produção**

```bash
# SSH no servidor
ssh usuario@seu-servidor.com

# Clonar repositório
git clone https://seu-repo.git
cd TechHub

# Executar setup
bash setup.sh production
```

### 2. **Configurar .env para Produção**

```bash
# Editar .env
nano .env

# Mudar:
NODE_ENV=production
SECRET_KEY=<nova-chave-segura>
SITE_URL_PROD=https://techhub.com.br
ALLOWED_ORIGINS=https://techhub.com.br,https://www.techhub.com.br
```

### 3. **Configurar SSL/TLS**

```bash
# Let's Encrypt + Certbot
sudo certbot certonly --standalone -d techhub.com.br
```

### 4. **Configurar Nginx**

```bash
# Copiar configuração
sudo cp nginx.conf.example /etc/nginx/sites-available/techhub
sudo ln -s /etc/nginx/sites-available/techhub /etc/nginx/sites-enabled/

# Testar
sudo nginx -t

# Reinicar
sudo systemctl restart nginx
```

### 5. **Iniciar com PM2**

```bash
# Instalar dependências
npm install --production

# Iniciar servidor
pm2 start ecosystem.config.js

# Salvar configuração
pm2 save
pm2 startup
```

---

## 📊 Estrutura do Projeto

```
TechHub/
├── .env                    ✓ Variáveis de ambiente (configurado)
├── .env.example            ✓ Template de configuração
├── config.json             ✓ Configurações do site
├── server.js               ✓ Servidor Express (com dotenv)
├── package.json            ✓ Dependências
├── ecosystem.config.js     ✓ Configuração PM2
├── setup.sh                ✓ Script de setup
├── nginx.conf.example      ✓ Config Nginx
├── DEPLOYMENT.md           ✓ Guia de deployment
├── docs/
│   ├── AUTO_LOGIN.md       ✓ Documentação auto-login
│   ├── AUTO_LOGIN_LINKS.md ✓ Links de auto-login
│   └── README.md
├── src/T3/
│   ├── index.html          ✓ Auto-login implementado
│   ├── tags.html           ✓ Auto-login implementado
│   ├── formularios.html    ✓ Auto-login implementado
│   ├── tabelas.html        ✓ Auto-login implementado
│   ├── listas.html         ✓ Auto-login implementado
│   ├── graficos.html       ✓ Auto-login implementado
│   ├── auto-login-links.html ✓ Dashboard de links
│   ├── styles.css
│   └── script.js
└── usuarios.json           ← Banco de dados (gitignored)
```

---

## 🔒 Segurança em Produção

### Checklist de Segurança

- [ ] Certificado SSL/TLS válido (HTTPS)
- [ ] `SECRET_KEY` única e forte no `.env`
- [ ] CORS configurado apenas para domínios autorizados
- [ ] Firewall bloqueando portas desnecessárias
- [ ] PM2 gerenciando reinicializações automáticas
- [ ] Nginx com rate limiting ativo
- [ ] Backups automáticos do `usuarios.json`
- [ ] Logs monitorados em `/logs/`

---

## 📈 Monitoramento em Produção

```bash
# Ver status do servidor
pm2 status

# Ver logs em tempo real
pm2 logs techhub

# Monitorar recursos
pm2 monit

# Reiniciar servidor
pm2 restart techhub

# Parar servidor
pm2 stop techhub
```

---

## 🧪 Testar em Produção

Após migrar para producão:

```bash
# Verificar saúde do servidor
curl https://techhub.com.br/api/health

# Acessar com auto-login
https://techhub.com.br/index.html?teste=ativo

# Ver console (F12) no navegador
✅ Modo de teste ativado via URL!
📝 Acesso irrestrito a todas as seções do TechHub
```

---

## 📞 Suporte Rápido

### Erro: Porta 3000 em Uso
```bash
lsof -i :3000
kill -9 <PID>
```

### Erro: CORS
Verificar `ALLOWED_ORIGINS` no `.env`:
```
ALLOWED_ORIGINS=https://techhub.com.br,https://www.techhub.com.br
```

### Erro: SSL/TLS
```bash
# Renovar certificado
sudo certbot renew
```

### Logear de Novo Servidor
```bash
# Local dev
http://localhost:3000/index.html?teste=ativo

# Produção
https://techhub.com.br/index.html?teste=ativo
```

---

## ✨ Resumo do Que Foi Implementado

### ✅ Configuração
- [x] Variáveis de ambiente (`.env`)
- [x] Configuração centralizada (`config.json`)
- [x] Multi-ambiente (dev/staging/prod)

### ✅ Auto-Login
- [x] Script implementado em 6 páginas
- [x] URL com parâmetro `?teste=ativo`
- [x] Links prontos para compartilhar
- [x] Dashboard de links (`auto-login-links.html`)

### ✅ Deployment
- [x] Script de setup automático
- [x] Configuração Nginx com SSL
- [x] Configuração PM2 para produção
- [x] Documentação de deployment

### ✅ Segurança
- [x] CORS configurável
- [x] .env no gitignore
- [x] Headers de segurança no Nginx
- [x] Suporte a HTTPS/SSL

### ✅ Documentação
- [x] Guia de deployment
- [x] Documentação auto-login
- [x] Links de acesso rápido
- [x] Troubleshooting

---

## 🎉 Pronto para Produção!

TechHub está **100% pronto** para ser migrado para o servidor de produção em **https://techhub.com.br**

### Para Começar:
1. Copie o arquivo `.env.example` para `.env`
2. Configure os valores de produção
3. Execute `bash setup.sh production`
4. Use Nginx + PM2 para gerenciar o servidor
5. Compartilhe os links de auto-login!

---

**Desenvolvido:** Abril 2026 | **Versão:** 1.0.0 | **Status:** ✅ Pronto
