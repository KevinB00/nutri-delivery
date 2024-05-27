<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$query = $_GET['query'];

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT id_plato, nombre, 'plato' AS type FROM plato WHERE nombre LIKE :query
                            UNION
                            SELECT id_restaurante, nombre, 'restaurante' AS type FROM restaurante WHERE nombre LIKE :query");
    $stmt->bindValue(':query', "%$query%");
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
