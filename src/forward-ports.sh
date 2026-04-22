#!/usr/bin/env bash
set -euo pipefail

# Encaminha as portas 8000 (PHP) e 3306 (MySQL) via tunel SSH.
# Configure via variaveis de ambiente, arquivo .forward-ports.env
# no projeto, ou ~/.forward-ports.env.

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." && pwd)"
PROJECT_ENV_FILE="${PROJECT_ENV_FILE:-${PROJECT_ROOT}/.forward-ports.env}"
USER_ENV_FILE="${USER_ENV_FILE:-${HOME}/.forward-ports.env}"

if [[ -f "$USER_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$USER_ENV_FILE"
fi

if [[ -f "$PROJECT_ENV_FILE" ]]; then
  # shellcheck disable=SC1090
  source "$PROJECT_ENV_FILE"
fi

REMOTE_USER="${REMOTE_USER:-${USER:-codespace}}"
REMOTE_HOST="${REMOTE_HOST:-localhost}"
REMOTE_SSH_PORT="${REMOTE_SSH_PORT:-22}"
SSH_TARGET="${SSH_TARGET:-}"
LOCAL_WEB_PORT="${LOCAL_WEB_PORT:-8000}"
LOCAL_DB_PORT="${LOCAL_DB_PORT:-3306}"
REMOTE_BIND_HOST="${REMOTE_BIND_HOST:-127.0.0.1}"
REMOTE_WEB_PORT="${REMOTE_WEB_PORT:-8000}"
REMOTE_DB_PORT="${REMOTE_DB_PORT:-3306}"
LOG_FILE="${LOG_FILE:-${PROJECT_ROOT}/logs/port-forward.log}"
DRY_RUN="${DRY_RUN:-0}"
AUTO_OPEN_TEST_URL="${AUTO_OPEN_TEST_URL:-1}"
OPEN_RETRIES="${OPEN_RETRIES:-15}"
OPEN_RETRY_DELAY_SECONDS="${OPEN_RETRY_DELAY_SECONDS:-1}"
FORWARD_MODE="${FORWARD_MODE:-auto}"

if ! command -v ssh >/dev/null 2>&1; then
  echo "Erro: ssh nao encontrado no PATH." >&2
  exit 1
fi

if [[ -n "$SSH_TARGET" ]]; then
  if [[ "$SSH_TARGET" != *@* ]]; then
    echo "Erro: SSH_TARGET deve estar no formato usuario@host." >&2
    exit 1
  fi
  REMOTE_USER="${SSH_TARGET%@*}"
  REMOTE_HOST="${SSH_TARGET#*@}"
fi

if [[ -z "$REMOTE_USER" || -z "$REMOTE_HOST" ]]; then
  echo "Erro: REMOTE_USER e REMOTE_HOST nao podem ficar vazios." >&2
  echo "Exemplo: REMOTE_USER=ubuntu REMOTE_HOST=meu-servidor.com ./src/forward-ports.sh" >&2
  echo "Ou use SSH_TARGET=ubuntu@meu-servidor.com ./src/forward-ports.sh" >&2
  echo "Tambem e possivel criar ${PROJECT_ENV_FILE} com os valores." >&2
  exit 1
fi

cleanup() {
  if [[ -n "${SSH_PID:-}" ]] && kill -0 "$SSH_PID" 2>/dev/null; then
    kill "$SSH_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

wait_for_test_url() {
  local url="$1"
  local retries="$2"
  local delay="$3"
  local attempt
  if ! command -v curl >/dev/null 2>&1; then
    return 0
  fi
  for ((attempt = 1; attempt <= retries; attempt++)); do
    if curl --silent --show-error --max-time 2 "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep "$delay"
  done
  return 1
}

open_test_url() {
  local url="$1"
  if [[ -n "${BROWSER:-}" ]]; then
    "$BROWSER" "$url" >/dev/null 2>&1 &
    return 0
  fi
  if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$url" >/dev/null 2>&1 &
    return 0
  fi
  if command -v open >/dev/null 2>&1; then
    open "$url" >/dev/null 2>&1 &
    return 0
  fi
  return 1
}

is_local_target() {
  [[ "$REMOTE_HOST" == "localhost" || "$REMOTE_HOST" == "127.0.0.1" || "$REMOTE_HOST" == "::1" ]]
}

is_ssh_port_reachable() {
  timeout 2 bash -c "cat < /dev/null > /dev/tcp/${REMOTE_HOST}/${REMOTE_SSH_PORT}" >/dev/null 2>&1
}

echo "Iniciando encaminhamento de portas..."
echo "Local ${LOCAL_WEB_PORT} -> Remoto ${REMOTE_BIND_HOST}:${REMOTE_WEB_PORT}"
echo "Local ${LOCAL_DB_PORT} -> Remoto ${REMOTE_BIND_HOST}:${REMOTE_DB_PORT}"
echo "Destino SSH: ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_SSH_PORT}"

# URL de teste ajustada para o arquivo de login do projeto
TEST_URL="http://localhost:${LOCAL_WEB_PORT}/testes/teste7.html"

if [[ "$DRY_RUN" == "1" ]]; then
  echo "DRY_RUN=1 habilitado. Comando que seria executado:"
  echo "ssh -N -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -p ${REMOTE_SSH_PORT} -L ${LOCAL_WEB_PORT}:${REMOTE_BIND_HOST}:${REMOTE_WEB_PORT} -L ${LOCAL_DB_PORT}:${REMOTE_BIND_HOST}:${REMOTE_DB_PORT} ${REMOTE_USER}@${REMOTE_HOST}"
  exit 0
fi

if [[ "$FORWARD_MODE" != "auto" && "$FORWARD_MODE" != "ssh" && "$FORWARD_MODE" != "local" ]]; then
  echo "Erro: FORWARD_MODE invalido. Use auto, ssh ou local." >&2
  exit 1
fi

EFFECTIVE_MODE="$FORWARD_MODE"
if [[ "$FORWARD_MODE" == "auto" ]]; then
  if is_local_target && ! is_ssh_port_reachable; then
    EFFECTIVE_MODE="local"
    echo "Modo auto: SSH indisponivel em ${REMOTE_HOST}:${REMOTE_SSH_PORT}. Usando modo local sem tunel."
  else
    EFFECTIVE_MODE="ssh"
  fi
fi

if [[ "$EFFECTIVE_MODE" == "local" ]]; then
  echo "Modo local ativo: nenhum tunel SSH sera criado."
  echo "Verifique se os containers/servicos ja publicam as portas ${LOCAL_WEB_PORT} e ${LOCAL_DB_PORT}."
  if [[ "$AUTO_OPEN_TEST_URL" == "1" ]]; then
    if wait_for_test_url "$TEST_URL" "$OPEN_RETRIES" "$OPEN_RETRY_DELAY_SECONDS"; then
      if open_test_url "$TEST_URL"; then
        echo "Link de teste aberto automaticamente no navegador."
      else
        echo "Aviso: nao foi possivel abrir o navegador automaticamente." >&2
        echo "Abra manualmente: ${TEST_URL}" >&2
      fi
    else
      echo "Aviso: URL de teste nao respondeu a tempo." >&2
      echo "Tente abrir manualmente: ${TEST_URL}" >&2
    fi
  fi
  exit 0
fi

mkdir -p "$(dirname "$LOG_FILE")"
# Limpa o log anterior para novo teste
true > "$LOG_FILE"

echo "Tentando estabelecer túnel SSH (Modo: ${EFFECTIVE_MODE})..."

ssh \
  -N \
  -o ExitOnForwardFailure=yes \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  -o BatchMode=yes \
  -p "$REMOTE_SSH_PORT" \
  -L "${LOCAL_WEB_PORT}:${REMOTE_BIND_HOST}:${REMOTE_WEB_PORT}" \
  -L "${LOCAL_DB_PORT}:${REMOTE_BIND_HOST}:${REMOTE_DB_PORT}" \
  "${REMOTE_USER}@${REMOTE_HOST}" \
  >>"$LOG_FILE" 2>&1 &

SSH_PID=$!

# Pequena pausa para verificar se o processo não morreu imediatamente
sleep 2
if ! kill -0 "$SSH_PID" 2>/dev/null; then
  echo "Erro: O processo SSH encerrou inesperadamente." >&2
  echo "Verifique o log para detalhes: ${LOG_FILE}" >&2
  if [[ -f "$LOG_FILE" ]]; then tail -n 5 "$LOG_FILE"; fi
  exit 1
fi

echo "Tunel criado com PID ${SSH_PID}."
echo "Log: ${LOG_FILE}"
echo "Teste web: ${TEST_URL}"
echo "Para encerrar: kill ${SSH_PID}"

if [[ "$AUTO_OPEN_TEST_URL" == "1" ]]; then
  if wait_for_test_url "$TEST_URL" "$OPEN_RETRIES" "$OPEN_RETRY_DELAY_SECONDS"; then
    if open_test_url "$TEST_URL"; then
      echo "Link de teste aberto automaticamente no navegador."
    else
      echo "Aviso: nao foi possivel abrir o navegador automaticamente." >&2
      echo "Abra manualmente: ${TEST_URL}" >&2
    fi
  else
    echo "Aviso: URL de teste nao respondeu a tempo." >&2
    echo "Tente abrir manualmente: ${TEST_URL}" >&2
  fi
fi

wait "$SSH_PID"