<?php
include '../Connection.php';


header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$userId = $_GET['id_usuario'];

try {
    $conn = Connection::get()->getConnection();
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT es_administrador FROM usuario WHERE id_usuario = :id_usuario");
    $stmt->bindParam(':id_usuario', $userId);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['es_administrador' => $result['es_administrador']]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
