#!/usr/bin/env bash
# Inicia o servidor PHP interno na porta 8000 apontando para a raiz do projeto

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"

echo "-------------------------------------------------------"
echo "Servidor PHP iniciado: http://localhost:8000"
echo "URL do Projeto: http://localhost:8000/src/teste7.html"
echo "Pressione Ctrl+C para encerrar."
echo "-------------------------------------------------------"

# Cria pasta de logs se não existir
mkdir -p "${PROJECT_ROOT}/logs"

# Inicia o servidor
# -S 0.0.0.0:8000 permite conexões externas/túneis
php -S 0.0.0.0:8000 -t "$PROJECT_ROOT"