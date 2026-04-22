<?php
/**
 * Script de diagnóstico para validar a conexão com o banco de dados
 */
header('Content-Type: text/plain');

try {
    // Verifica se o driver PDO MySQL está instalado no PHP
    if (!in_array('mysql', PDO::getAvailableDrivers())) {
        throw new Exception("O driver 'pdo_mysql' não está instalado.\n" .
                            "No terminal, execute: sudo apt-get update && sudo apt-get install php-mysql\n" .
                            "Depois, reinicie o servidor PHP.");
    }

    require_once 'db_config.php';
    echo " Conexão bem-sucedida ao banco de dados 'teste7'.\n";
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM pessoas");
    $row = $stmt->fetch();
    echo " Total de registros na tabela 'pessoas': " . $row['total'] . "\n";
    echo " O ambiente está configurado corretamente!";
} catch (Exception $e) {
    echo " Erro na configuração:\n";
    echo $e->getMessage();
}
?>