<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// O navegador envia uma requisição OPTIONS "pre-flight" para verificar a permissão do CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents("php://input"), true);

// Validação básica
if (empty($data['nome']) || empty($data['estado'])) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Nome e Estado são obrigatórios."]);
    exit;
}

// Se um ID existe, atualiza (UPDATE). Senão, cria (INSERT).
if (isset($data['id']) && !empty($data['id'])) {
    // UPDATE
    $sql = "UPDATE usuarios SET nome=?, idade=?, rua=?, bairro=?, estado=?, bio=?, imagem=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      $data['nome'], $data['idade'], $data['rua'], $data['bairro'], $data['estado'], $data['bio'], $data['imagem'], $data['id']
    ]);
    echo json_encode(["status" => "ok", "message" => "Usuário atualizado com sucesso!"]);
} else {
    // INSERT
    $sql = "INSERT INTO usuarios (nome, idade, rua, bairro, estado, bio, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      $data['nome'], $data['idade'], $data['rua'], $data['bairro'], $data['estado'], $data['bio'], $data['imagem']
    ]);
    // Retorna o ID do novo usuário inserido
    echo json_encode(["status" => "ok", "message" => "Usuário criado com sucesso!", "id" => $pdo->lastInsertId()]);
}
?>