<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

require 'config.php';

$stmt = $pdo->query("SELECT * FROM usuarios ORDER BY nome");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
?>