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

    $stmt = $conn->prepare("SELECT p.* FROM postfavorito f JOIN post p ON f.id_publicacion = p.id_publicacion WHERE f.id_usuario = :id_usuario");
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    $favoritos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($favoritos);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
