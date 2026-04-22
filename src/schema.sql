-- Criação do banco de dados "teste7"
CREATE DATABASE teste7;

-- Seleção do banco de dados "teste7" para uso
USE teste7;

-- Configuração de codificação para UTF-8
ALTER DATABASE teste7 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Senha para o banco de dados "teste7"
-- (A configuração de senha pode variar dependendo do sistema de gerenciamento de banco de dados utilizado)
-- Exemplo de configuração de senha para MySQL:
-- ALTER USER 'usuario'@'localhost' IDENTIFIED BY 'senha';
-- ALTER USER 'sql7'@'localhost' IDENTIFIED BY 'sq7';

-- Definição de conexão para o banco de dados "teste7"
-- (A configuração de conexão pode variar dependendo do sistema de gerenciamento de banco de dados utilizado)
-- Exemplo de configuração de conexão para MySQL:
-- CREATE USER 'usuario'@'localhost' IDENTIFIED BY 'senha';
-- GRANT ALL PRIVILEGES ON teste7.* TO 'usuario'@'localhost';
CREATE USER IF NOT EXISTS 'sql7'@'%' IDENTIFIED BY 'sq7';
GRANT ALL PRIVILEGES ON teste7.* TO 'sql7'@'%';
FLUSH PRIVILEGES;

-- Definição da tabela "pessoas" com os campos especificados
-- 1. Criação da tabela "pessoas"
CREATE TABLE pessoas (
    id_usuario VARCHAR(3) PRIMARY KEY,
    nome_sobrenome VARCHAR(150) NOT NULL,
    senha VARCHAR(50) NOT NULL,
    status_autorizacao VARCHAR(20) CHECK (status_autorizacao IN ('autorizado', 'negado')) NOT NULL
);

-- 2. Inserção dos 50 nomes em ordem alfabética
INSERT INTO pessoas (id_usuario, nome_sobrenome, senha, status_autorizacao) VALUES
('001', 'Alice Silva', 'pass01', 'autorizado'),
('002', 'Amanda Costa', 'pass02', 'negado'),
('003', 'Ana Souza', 'pass03', 'autorizado'),
('004', 'Beatriz Santos', 'pass04', 'autorizado'),
('005', 'Breno Rocha', 'pass05', 'negado'),
('006', 'Bruno Oliveira', 'pass06', 'autorizado'),
('007', 'Caio Mendes', 'pass07', 'negado'),
('008', 'Camila Martins', 'pass08', 'autorizado'),
('009', 'Carlos Pereira', 'pass09', 'autorizado'),
('010', 'Clara Nogueira', 'pass10', 'negado'),
('011', 'Daniel Carvalho', 'pass11', 'autorizado'),
('012', 'Diego Ribeiro', 'pass12', 'negado'),
('013', 'Diogo Castro', 'pass13', 'autorizado'),
('014', 'Eduardo Alves', 'pass14', 'autorizado'),
('015', 'Elena Correia', 'pass15', 'negado'),
('016', 'Enzo Cardoso', 'pass16', 'autorizado'),
('017', 'Fabiana Melo', 'pass17', 'negado'),
('018', 'Felipe Dias', 'pass18', 'autorizado'),
('019', 'Fernando Gomes', 'pass19', 'autorizado'),
('020', 'Gabriel Barbosa', 'pass20', 'negado'),
('021', 'Giovana Farias', 'pass21', 'autorizado'),
('022', 'Guilherme Araujo', 'pass22', 'negado'),
('023', 'Helena Pinto', 'pass23', 'autorizado'),
('024', 'Henrique Teixeira', 'pass24', 'autorizado'),
('025', 'Hugo Cavalcante', 'pass25', 'autorizado'),
('026', 'Igor Monteiro', 'pass26', 'autorizado'),
('027', 'Isabela Moura', 'pass27', 'negado'),
('028', 'Ivan Ramos', 'pass28', 'autorizado'),
('029', 'Joao Batista', 'pass29', 'autorizado'),
('030', 'Julia Freitas', 'pass30', 'negado'),
('031', 'Julio Cesar', 'pass31', 'autorizado'),
('032', 'Kauan Duarte', 'pass32', 'negado'),
('033', 'Kelly Vieira', 'pass33', 'autorizado'),
('034', 'Larissa Pires', 'pass34', 'autorizado'),
('035', 'Leonardo Moraes', 'pass35', 'negado'),
('036', 'Lucas Viana', 'pass36', 'autorizado'),
('037', 'Manuela Azevedo', 'pass37', 'negado'),
('038', 'Marcelo Barros', 'pass38', 'autorizado'),
('039', 'Maria Fernandes', 'pass39', 'autorizado'),
('040', 'Natalia Machado', 'pass40', 'negado'),
('041', 'Nicolas Cunha', 'pass41', 'autorizado'),
('042', 'Otavio Mendes', 'pass42', 'negado'),
('043', 'Paula Rocha', 'pass43', 'autorizado'),
('044', 'Pedro Henrique', 'pass44', 'autorizado'),
('045', 'Rafael Costa', 'pass45', 'negado'),
('046', 'Roberto Almeida', 'pass46', 'autorizado'),
('047', 'Samuel Sales', 'pass47', 'negado'),
('048', 'Sofia Reis', 'pass48', 'autorizado'),
('049', 'Tiago Lopes', 'pass49', 'autorizado'),
('050', 'Vanessa Silva', 'pass50', 'negado');

-- Consulta para verificar os dados inseridos na tabela "pessoas"
SELECT * FROM pessoas ORDER BY nome_sobrenome ASC;
