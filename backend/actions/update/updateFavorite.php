<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$data = json_decode(file_get_contents("php://input"), true);
$id_post = $data['id_post'];
$id_usuario = $data['id_usuario'];
$action = $data['action'];

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($action === "agregar") {
        $stmt = $conn->prepare("INSERT INTO postfavorito (id_usuario, id_publicacion) VALUES (:id_usuario, :id_post)");
    } else {
        $stmt = $conn->prepare("DELETE FROM postfavorito WHERE id_publicacion = :id_post AND id_usuario = :id_usuario");
    }
    $stmt->bindParam(':id_post', $id_post);
    $stmt->bindParam(':id_usuario', $id_usuario);
    $stmt->execute();

    $stmt = $conn->prepare("SELECT COUNT(*) AS numFavorites FROM postfavorito WHERE id_publicacion = :id_post");
    $stmt->bindParam(':id_post', $id_post);
    $stmt->execute();

    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $numFavorites = $result['numFavorites'];

    $stmt = $conn->prepare("UPDATE post SET numero_favoritos = :numFavorites WHERE id_publicacion = :id_post");
    $stmt->bindParam(':numFavorites', $numFavorites);
    $stmt->bindParam(':id_post', $id_post);
    $stmt->execute();

    echo json_encode(['numFavorites' => $numFavorites]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
