<?php
// Habilita o CORS para permitir requisições de qualquer origem
header("Access-Control-Allow-Origin: *");
// Permite os métodos GET, POST, DELETE e OPTIONS
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
// Permite os cabeçalhos Content-Type e Authorization
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// O navegador envia uma requisição OPTIONS "pre-flight" para verificar a permissão do CORS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Inclui o arquivo de configuração do banco de dados
require 'config.php';

// Obtém os dados da requisição (espera-se um JSON com o "id" do usuário)
$data = json_decode(file_get_contents("php://input"), true);

// Verifica se o ID foi fornecido e não está vazio
if (!isset($data['id']) || empty($data['id'])) {
    // Se não, retorna um erro 400 (Bad Request)
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID do usuário não fornecido."]);
    exit;
}

try {
    // Prepara a query SQL para deletar o usuário com o ID fornecido
    $sql = "DELETE FROM usuarios WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    // Executa a query, passando o ID como parâmetro para evitar SQL Injection
    $stmt->execute([$data['id']]);

    // Verifica se alguma linha foi afetada (se o usuário foi realmente deletado)
    if ($stmt->rowCount() > 0) {
        // Se sim, retorna uma mensagem de sucesso
        echo json_encode(["status" => "ok", "message" => "Usuário deletado com sucesso!"]);
    } else {
        // Se não, retorna um erro 404 (Not Found)
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Usuário não encontrado."]);
    }
} catch (PDOException $e) {
    // Em caso de erro na execução da query, retorna um erro 500 (Internal Server Error)
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Erro no servidor: " . $e->getMessage()]);
}
?>