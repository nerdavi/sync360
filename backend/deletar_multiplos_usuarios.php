<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['ids']) || !is_array($data['ids']) || empty($data['ids'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Nenhum ID de usuário fornecido para exclusão."]);
    exit;
}

// Filtra IDs para garantir que são inteiros e não vazios
$ids = array_filter($data['ids'], 'is_numeric');

if (empty($ids)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "IDs inválidos fornecidos."]);
    exit;
}

try {
    // Cria uma string de placeholders para a cláusula IN da SQL
    $placeholders = implode(',', array_fill(0, count($ids), '?'));
    $sql = "DELETE FROM usuarios WHERE id IN ($placeholders)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($ids);

    $rowCount = $stmt->rowCount();
    if ($rowCount > 0) {
        echo json_encode(["status" => "ok", "message" => "$rowCount usuário(s) deletado(s) com sucesso!"]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Nenhum usuário encontrado com os IDs fornecidos."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro no servidor: " . $e->getMessage()]);
}
?>