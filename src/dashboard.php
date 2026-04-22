<?php
session_start();

// Verifica se o usuário está logado
if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    header("Location: teste7.html");
    exit;
}

require_once 'db_config.php';

try {
    $stmt = $pdo->query("SELECT id_usuario, nome_sobrenome, status_autorizacao FROM pessoas ORDER BY nome_sobrenome ASC");
    $pessoas = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $erro_msg = "Erro ao carregar dados do banco: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel do Sistema</title>
    <link rel="stylesheet" href="style7.css">
</head>
<body>
    <div class="container">
        <h2>Área Restrita</h2>
        <p>Olá, <strong><?php echo htmlspecialchars($_SESSION['usuario_nome']); ?></strong>!</p>
        <hr>
        
        <!-- Exibição de erros caso a consulta falhe -->
        <?php if (isset($erro_msg)): ?>
            <p style="color: #dc3545; text-align: center;"><?php echo $erro_msg; ?></p>
        <?php endif; ?>

        <h3>Lista de Usuários Autorizados</h3>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome Completo</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($pessoas as $pessoa): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($pessoa['id_usuario']); ?></td>
                        <td><?php echo htmlspecialchars($pessoa['nome_sobrenome']); ?></td>
                        <td class="status-<?php echo $pessoa['status_autorizacao']; ?>">
                            <?php echo htmlspecialchars($pessoa['status_autorizacao']); ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <a href="logout.php" class="btn-logout">Sair do Sistema</a>
    </div>
</body>
</html>