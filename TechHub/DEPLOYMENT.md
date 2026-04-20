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

# 🚀 Guia de Deployment - TechHub

## Informações do Site

**Nome:** TechHub
**Descrição:** Centro de aprendizado de desenvolvimento web
**Versão:** 1.0.0
**Tipo:** Portal educacional com sistema de autenticação

---

## 📋 Pré-requisitos

- Node.js >= 14.0.0
- npm ou yarn
- Git (opcional)

---

## 🖥️ Instalação Local (Desenvolvimento)

### 1. Clonar/Baixar o Repositório

```bash
cd /caminho/para/projeto
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

### 4. Iniciar o Servidor

```bash
npm start
```

O servidor estará disponível em:
- **Local:** http://localhost:3000
- **Rede:** http://seu-ip:3000

---

## 🌐 Migração para Produção

### Paso 1: Preparar o Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Clonar o projeto
git clone https://seu-repositorio.git
cd TechHub
```

### Paso 2: Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Editar `.env` com valores de produção:

```env
# Desenvolvimento
NODE_ENV=production

# Servidor
SERVER_HOST=0.0.0.0
SERVER_PORT=3000

# Domínio
SITE_URL_PROD=https://seu-dominio.com.br
ALLOWED_ORIGINS=https://seu-dominio.com.br,https://www.seu-dominio.com.br

# Segurança - GERAR NOVA CHAVE!
SECRET_KEY=<GERE-UMA-CHAVE-SEGURA>

# Email (opcional para notificações)
SMTP_HOST=seu-servidor-smtp
SMTP_PORT=587
SMTP_USER=seu-email
SMTP_PASS=sua-senha
```

### Paso 3: Gerar Nova Chave Secreta

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copie a saída e coloque em `SECRET_KEY` no arquivo `.env`

### Paso 4: Instalar Dependências

```bash
npm install --production
```

### Paso 5: Criar Diretórios Necessários

```bash
mkdir -p logs uploads backups
chmod 755 logs uploads backups
```

---

## 🔒 Segurança em Produção

### 1. Usar HTTPS (SSL/TLS)

**Opção A: Nginx + Let's Encrypt**

```bash
sudo apt install nginx certbot python3-certbot-nginx
sudo certbot certonly --nginx -d seu-dominio.com
```

### 2. Firewall

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 3. PM2 (Process Manager)

Instalar:
```bash
npm install -g pm2
```

Arquivo `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'techhub',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

Iniciar:
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
```

---

## 🔄 Atualizar Código em Produção

```bash
# Parar aplicação
pm2 stop techhub

# Atualizar código
git pull origin main

# Instalar dependências (se necessário)
npm install

# Reiniciar
pm2 start techhub
```

---

## 📊 Monitoramento

### Logs do Servidor

```bash
# Ver logs em tempo real
pm2 logs techhub

# Ver arquivo de log
tail -f logs/server.log
```

### Verificar Saúde do Servidor

```bash
curl http://localhost:3000/api/health
```

---

## 🗂️ Estrutura de Diretórios

```
TechHub/
├── src/
│   └── T3/                 # Arquivos HTML/CSS/JS
│       ├── index.html
│       ├── graficos.html
│       ├── styles.css
│       ├── script.js
│       └── script-graficos.js
├── logs/                   # Arquivos de log
├── uploads/                # Uploads de usuários
├── backups/                # Backups de dados
├── usuarios.json           # Banco de dados de usuários
├── server.js               # Servidor principal
├── package.json
├── .env                    # Variáveis de ambiente (NÃO VERSIONADO)
├── .env.example            # Exemplo de configuração
├── config.json             # Configurações do site
└── README.md
```

---

## 🐳 Usando Docker (Opcional)

Criar `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Criar `docker-compose.yml`:

```yaml
version: '3.8'

services:
  techhub:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SERVER_PORT=3000
    volumes:
      - ./usuarios.json:/app/usuarios.json
      - ./logs:/app/logs
      - ./uploads:/app/uploads
    restart: unless-stopped
```

Executar:

```bash
docker-compose up -d
```

---

## 🆘 Troubleshooting

### Porta 3000 já está em uso

```bash
# Encontrar processo
lsof -i :3000

# Matar processo
kill -9 <PID>
```

### Permissão negada em diretórios

```bash
sudo chown -R $USER:$USER /caminho/do/projeto
chmod -R 755 src logs uploads backups
```

### Erro de CORS

Verificar `ALLOWED_ORIGINS` no arquivo `.env`

```env
ALLOWED_ORIGINS=https://seu-dominio.com,https://www.seu-dominio.com
```

---

## 📞 Suporte

Para problemas, consulte:
- Documentação em `/docs`
- Logs em `/logs/server.log`
- Console do navegador (F12)

---

**TechHub v1.0.0** - Pronto para produção! 🚀
