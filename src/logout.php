<?php
session_start();
// Destrói todas as variáveis de sessão
session_unset();
session_destroy();
// Redireciona para a página de login
header("Location: teste7.html");
exit;
?>