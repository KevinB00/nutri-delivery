<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $title = $_POST['titulo'];
    $content = $_POST['contenido'];
    $userId = $_POST['id_usuario'];
    $hasImage = isset($_FILES['imagen']) ? 1 : 0;
    $imageName = $hasImage ? $_FILES['imagen']['name'] : null;
    $imagePath = $hasImage ? 'uploads/' . $imageName : null;

    if ($hasImage) {
        if (!file_exists('uploads')) {
            mkdir('uploads', 0777, true);
        }
        move_uploaded_file($_FILES['imagen']['tmp_name'], $imagePath);
    }

    $stmt = $conn->prepare("INSERT INTO post (id_usuario, titulo, contenido, fecha_publicacion, numero_favoritos, tiene_imagen, es_administrador) VALUES (:id_usuario, :titulo, :contenido, NOW(), 0, :tiene_imagen, 0)");
    $stmt->bindParam(':titulo', $title);
    $stmt->bindParam(':contenido', $content);
    $stmt->bindParam(':tiene_imagen', $hasImage);
    $stmt->bindParam(':id_usuario', $userId);

    $stmt->execute();
    echo json_encode(['message' => 'Post created successfully']);

    if ($hasImage) {
        $postId = $conn->lastInsertId();
        $stmt = $conn->prepare("INSERT INTO imagenpost (id_publicacion, nombre_archivo, ruta_archivo) VALUES (:id_publicacion, :nombre_archivo, :url)");
        $stmt->bindParam(':id_publicacion', $postId);
        $stmt->bindParam(':nombre_archivo', $imageName);
        $stmt->bindParam(':url', $imagePath);
        $stmt->execute();
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
