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

module.exports = {
  apps: [{
    // Identificador da aplicação
    name: 'techhub',

    // Comando para iniciar
    script: './server.js',

    // Modo de execução: cluster (múltiplos processos) ou fork (processo único)
    exec_mode: 'cluster',

    // Número de instâncias
    // 'max' = número de CPUs disponíveis
    instances: 'max',

    // Ambiente
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },

    // Ambiente de produção
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },

    // Configurações de monitoramento
    max_memory_restart: '500M',
    watch: false,  // Ativar watch mode para desenvolvimento (true)
    ignore_watch: ['node_modules', 'logs', 'uploads', 'backups'],

    // Logs
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

    // Reiniciar automaticamente em caso de crash
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',

    // Timeout para graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 3000,

    // Variáveis de ambiente adicionais
    env_vars: {
      COMMON_VARIABLE: 'true'
    }
  }],

  // Configurações de deployment
  deploy: {
    production: {
      user: 'your-user',
      host: 'seu-servidor.com',
      ref: 'origin/main',
      repo: 'git@github.com:seu-usuario/seu-repo.git',
      path: '/home/seu-usuario/techhub',
      'post-deploy': 'npm install && npm run build',
      'exec-mode': 'cluster'
    }
  }
};
