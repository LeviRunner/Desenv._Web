<?php
// Inicia a sessão para permitir o armazenamento de dados do usuário
session_start();

// Define o retorno como JSON
header('Content-Type: application/json');

// 2. Recebimento dos dados do formulário
$id_usuario = $_POST['id_usuario'] ?? '';
$senha = $_POST['senha'] ?? '';

if (empty($id_usuario) || empty($senha)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Por favor, preencha todos os campos."]);
    exit;
}

require_once 'db_config.php';

try {
    // Busca o usuário no banco de dados real
    $stmt = $pdo->prepare("SELECT nome_sobrenome, senha, status_autorizacao FROM pessoas WHERE id_usuario = ?");
    $stmt->execute([$id_usuario]);
    $usuario_encontrado = $stmt->fetch(PDO::FETCH_ASSOC);

if ($usuario_encontrado && $senha === $usuario_encontrado['senha']) {
    // Verifica o status_autorizacao extraído do arquivo
    if ($usuario_encontrado['status_autorizacao'] === 'autorizado') {
        session_regenerate_id(true);
        $_SESSION['usuario_id'] = $id_usuario;
        $_SESSION['usuario_nome'] = $usuario_encontrado['nome_sobrenome'];
        $_SESSION['logado'] = true;

        echo json_encode([
            "sucesso" => true, 
            "mensagem" => "Bem-vindo, " . $usuario_encontrado['nome_sobrenome'] . "! Acesso concedido."
        ]);
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Acesso negado: Usuário não autorizado."]);
    }
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "ID ou senha incorretos."]);
}
} catch (PDOException $e) {
    echo json_encode(["sucesso" => false, "mensagem" => "Erro no banco de dados."]);
}
?>