<?php
$host = 'localhost';
$db   = 'teste7';
$user = 'sql7'; // Usuário definido no schema.sql
$pass = 'sq7';  // Senha definida no schema.sql
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
try {
    $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}