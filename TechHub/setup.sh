#!/bin/bash

# Script de Setup do TechHub para Novo Servidor
# Uso: bash setup.sh [production|development]

set -e

ENVIRONMENT=${1:-development}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "╔════════════════════════════════════════╗"
echo "║     🚀 Setup TechHub - $ENVIRONMENT    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_status() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Verificar Node.js
print_status "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado!"
    exit 1
fi
NODE_VERSION=$(node -v)
print_success "Node.js $NODE_VERSION encontrado"

# Verificar npm
print_status "Verificando npm..."
if ! command -v npm &> /dev/null; then
    print_error "npm não está instalado!"
    exit 1
fi
NPM_VERSION=$(npm -v)
print_success "npm $NPM_VERSION encontrado"

# Instalar dependências
print_status "Instalando dependências..."
cd "$PROJECT_DIR"
npm install
print_success "Dependências instaladas"

# Criar diretórios
print_status "Criando diretórios necessários..."
mkdir -p logs uploads backups
chmod 755 logs uploads backups
print_success "Diretórios criados"

# Verificar arquivo .env
if [ ! -f "$PROJECT_DIR/.env" ]; then
    print_warning "Arquivo .env não encontrado!"
    print_status "Copiando .env.example para .env..."
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env"
    print_success "Arquivo .env criado"
    print_warning "⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações!"
else
    print_success "Arquivo .env encontrado"
fi

# Definir ambiente
if [ "$ENVIRONMENT" = "production" ]; then
    print_status "Configurando para PRODUÇÃO..."
    sed -i 's/NODE_ENV=.*/NODE_ENV=production/' "$PROJECT_DIR/.env"
    print_warning "Não esqueça de:"
    print_warning "  1. Gerar nova SECRET_KEY"
    print_warning "  2. Configurar ALLOWED_ORIGINS"
    print_warning "  3. Configurar SITE_URL_PROD"
else
    print_status "Configurando para DESENVOLVIMENTO..."
    sed -i 's/NODE_ENV=.*/NODE_ENV=development/' "$PROJECT_DIR/.env"
fi

# Instalar PM2 globalmente (production)
if [ "$ENVIRONMENT" = "production" ]; then
    print_status "Instalando PM2 para gerenciar o processo..."
    npm install -g pm2 || sudo npm install -g pm2
    
    if [ -f "$PROJECT_DIR/ecosystem.config.js" ]; then
        print_success "PM2 configurado"
    else
        print_warning "Crie um arquivo ecosystem.config.js para melhor gerenciamento"
    fi
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║     ✓ Setup Concluído com Sucesso!    ║"
echo "╚════════════════════════════════════════╝"
echo ""

if [ "$ENVIRONMENT" = "production" ]; then
    echo "Para iniciar o servidor em produção:"
    echo "  ${BLUE}pm2 start ecosystem.config.js${NC}"
    echo ""
else
    echo "Para iniciar o servidor em desenvolvimento:"
    echo "  ${BLUE}npm start${NC}"
    echo ""
fi

print_status "Acessar em:"
echo "  ${BLUE}http://localhost:3000${NC}"
echo ""

print_warning "Próximos passos:"
echo "  1. Verifique/edite o arquivo .env"
echo "  2. Para HTTPS em produção, configure Nginx/Apache"
echo "  3. Consulte DEPLOYMENT.md para mais detalhes"
echo ""
