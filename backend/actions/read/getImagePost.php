<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_post = $_GET['id_post'];

    $stmt = $conn->prepare("SELECT ruta_archivo FROM imagenpost WHERE id_publicacion = :id_post");
    $stmt->bindParam(':id_post', $id_post);
    $stmt->execute();

    $image = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($image);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
