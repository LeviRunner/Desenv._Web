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

require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// ===== CONFIGURAÇÕES DO AMBIENTE =====
const PORT = process.env.SERVER_PORT || 3000;
const HOST = process.env.SERVER_HOST || '0.0.0.0';
const SECRET_KEY = process.env.SECRET_KEY || 'seu_chave_secreta_super_segura_2026';
const NODE_ENV = process.env.NODE_ENV || 'development';
const STATIC_DIR = process.env.STATIC_DIR || path.join(__dirname, 'src', 'T3');
const USERS_FILE = process.env.USERS_FILE || path.join(__dirname, 'usuarios.json');

// Parse CORS origins
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map(origin => origin.trim());

// Middleware
app.use(cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(express.json());
app.use(express.static(STATIC_DIR));

// Função para ler usuários do arquivo
function lerUsuarios() {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const data = fs.readFileSync(USERS_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (error) {
        console.error('Erro ao ler usuários:', error);
        return [];
    }
}

// Função para salvar usuários no arquivo
function salvarUsuarios(usuarios) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Erro ao salvar usuários:', error);
        return false;
    }
}

// ===== ENDPOINTS =====

// Verificar saúde do servidor
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor TechHub rodando!' });
});

// REGISTRAR NOVO USUÁRIO
app.post('/api/registrar', async (req, res) => {
    try {
        const { nome, email, telefone, interesse, nick, senha, pais } = req.body;

        // Validações
        if (!nome || !email || !nick || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nome, email, nick e senha são obrigatórios'
            });
        }

        if (nick.length < 3) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nick deve ter no mínimo 3 caracteres'
            });
        }

        if (senha.length < 6) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Senha deve ter no mínimo 6 caracteres'
            });
        }

        // Verificar se email ou nick já existem
        const usuarios = lerUsuarios();
        const usuarioExistente = usuarios.find(u => u.email === email || u.nick === nick);

        if (usuarioExistente) {
            if (usuarioExistente.email === email) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Email já cadastrado'
                });
            }
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nick já existe'
            });
        }

        // Hash da senha
        const senhaHash = await bcrypt.hash(senha, 10);

        // Criar novo usuário
        const novoUsuario = {
            id: Date.now().toString(),
            nome,
            email,
            telefone: telefone || '',
            interesse: interesse || '',
            nick,
            senha: senhaHash,
            pais: pais || 'Brasil',
            dataRegistro: new Date().toISOString(),
            ativo: true
        };

        // Salvar no arquivo
        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);

        // Retornar token JWT
        const token = jwt.sign(
            { id: novoUsuario.id, nick: novoUsuario.nick, email: novoUsuario.email },
            SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            sucesso: true,
            mensagem: 'Usuário registrado com sucesso!',
            token: token,
            usuario: {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                nick: novoUsuario.nick,
                email: novoUsuario.email
            }
        });

    } catch (error) {
        console.error('Erro ao registrar:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao registrar usuário'
        });
    }
});

// FAZER LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { nick, senha } = req.body;

        // Validações
        if (!nick || !senha) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nick e senha são obrigatórios'
            });
        }

        // Buscar usuário
        const usuarios = lerUsuarios();
        const usuario = usuarios.find(u => u.nick === nick);

        if (!usuario) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Nick ou senha incorretos'
            });
        }

        // Verificar senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Nick ou senha incorretos'
            });
        }

        if (!usuario.ativo) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Usuário desativado'
            });
        }

        // Criar token JWT
        const token = jwt.sign(
            { id: usuario.id, nick: usuario.nick, email: usuario.email },
            SECRET_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            sucesso: true,
            mensagem: 'Login realizado com sucesso!',
            token: token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                nick: usuario.nick,
                email: usuario.email,
                pais: usuario.pais
            }
        });

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao fazer login'
        });
    }
});

// VERIFICAR TOKEN
app.get('/api/verificar-token', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                sucesso: false,
                valido: false,
                mensagem: 'Token não fornecido'
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({
            sucesso: true,
            valido: true,
            usuario: decoded
        });

    } catch (error) {
        res.status(401).json({
            sucesso: false,
            valido: false,
            mensagem: 'Token inválido'
        });
    }
});

// OBTER DADOS DO USUÁRIO
app.get('/api/usuario/:id', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                sucesso: false,
                mensagem: 'Token não fornecido'
            });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        const usuarios = lerUsuarios();
        const usuario = usuarios.find(u => u.id === decoded.id);

        if (!usuario) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Usuário não encontrado'
            });
        }

        res.json({
            sucesso: true,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                nick: usuario.nick,
                email: usuario.email,
                telefone: usuario.telefone,
                interesse: usuario.interesse,
                pais: usuario.pais,
                dataRegistro: usuario.dataRegistro
            }
        });

    } catch (error) {
        res.status(401).json({
            sucesso: false,
            mensagem: 'Token inválido'
        });
    }
});

// INICIAR SERVIDOR
// Ouve em 0.0.0.0 para aceitar conexões de qualquer dispositivo
app.listen(PORT, HOST, () => {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = 'localhost';
    
    // Procura pelo IP da rede local
    for (const name of Object.keys(networkInterfaces)) {
        for (const iface of networkInterfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                ipAddress = iface.address;
                break;
            }
        }
    }
    
    console.log(`\n=================================`);
    console.log(`🚀 TechHub Server rodando em:`);
    console.log(`   Ambiente: ${NODE_ENV}`);
    console.log(`   Local: http://localhost:${PORT}`);
    console.log(`   Rede: http://${ipAddress}:${PORT}`);
    console.log(`=================================\n`);
});
