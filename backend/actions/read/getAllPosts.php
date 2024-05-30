<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
header("Access-Control-Allow-Credentials: true");

$favoritos = isset($_GET['favoritos']) ? $_GET['favoritos'] : null;
$fecha = isset($_GET['fecha']) ? $_GET['fecha'] : null;

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM post";
    $conditions = [];

    if ($favoritos !== null) {
        if ($favoritos == 1) {
            $conditions[] = "numero_favoritos > 0";
        } elseif ($favoritos == 0) {
            $conditions[] = "numero_favoritos = 0";
        }
    }

    if ($fecha !== null) {
        $order = $fecha == 'asc' ? 'ASC' : 'DESC';
        $conditions[] = "1 ORDER BY fecha_publicacion $order";
    }

    if (!empty($conditions)) {
        $query .= " WHERE " . implode(" AND ", $conditions);
    }

    $stmt = $conn->prepare($query);
    $stmt->execute();
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($posts);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
