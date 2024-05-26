<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id_publicacion']) && isset($data['id_usuario']) && isset($data['comentario'])) {
    $id_publicacion = $data['id_publicacion'];
    $id_usuario = $data['id_usuario'];
    $comentario = $data['comentario'];
    $fecha_comentario = date('Y-m-d H:i:s');
    $es_administrador = 0;

    try {
        $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("INSERT INTO comentarios (id_publicacion, id_usuario, comentario, fecha_comentario, es_administrador) VALUES (:id_publicacion, :id_usuario, :comentario, :fecha_comentario, :es_administrador)");
        $stmt->bindParam(':id_publicacion', $id_publicacion);
        $stmt->bindParam(':id_usuario', $id_usuario);
        $stmt->bindParam(':comentario', $comentario);
        $stmt->bindParam(':fecha_comentario', $fecha_comentario);
        $stmt->bindParam(':es_administrador', $es_administrador);
        $stmt->execute();
        
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Datos incompletos']);
}
?>
