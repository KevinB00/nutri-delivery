<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$id_usuario = $_GET['id_usuario'];

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
        SELECT comentario.id_comentario, comentario.comentario, usuario.nombre, comentario.fecha_comentario
        FROM comentario
        JOIN usuario ON comentario.id_usuario = usuario.id_usuario
        WHERE comentario.id_usuario = :id_usuario");
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    $comentarios = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $comentarios[] = array(
            'id' => $row['id_comentario'],
            'comentario' => $row['comentario'],
            'nombreUsuario' => $row['nombre'],
            'fechaComentario' => $row['fecha_comentario']
        );
    }
    echo json_encode($comentarios);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
