<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$input = json_decode(file_get_contents("php://input"));

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT tiene_imagen FROM post WHERE id_publicacion = :id");
    $stmt->bindParam(':id', $input->id);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result['tiene_imagen']) {
        $stmt = $conn->prepare("DELETE FROM imagenpost WHERE id_publicacion = :id");
        $stmt->bindParam(':id', $input->id);
        $stmt->execute();
    }

    $stmt = $conn->prepare("DELETE FROM post WHERE id_publicacion = :id");
    $stmt->bindParam(':id', $input->id);
    $stmt->execute();
    echo json_encode(['message' => 'Post deleted successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
