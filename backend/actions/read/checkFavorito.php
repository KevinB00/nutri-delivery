<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$id_post = $_GET['id_post'];
$id_usuario = $_GET['id_usuario'];

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT COUNT(*) AS esFavorito FROM postfavorito WHERE id_publicacion = :id_post AND id_usuario = :id_usuario");
    $stmt->bindParam(':id_post', $id_post);
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $esFavorito = $result['esFavorito'] > 0;

    echo json_encode(['esFavorito' => $esFavorito]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
