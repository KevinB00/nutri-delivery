<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    // Obtener los platos de un restaurante
    $stmt = $conn->prepare("SELECT * FROM plato WHERE id_restaurante = :id_restaurante");
    $stmt->bindParam(':id_restaurante', $_GET['id_restaurante']);
    $stmt->execute();
    $platos = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $platos[] = array(
            'id' => $row['id_plato'],
            'nombre' => $row['nombre'],
            'id_restaurante' => $row['id_restaurante'],
            'calorias' => $row['calorias'],
            'proteinas' => $row['proteinas'],
            'carbohidratos' => $row['carbohidratos'],
            'grasas' => $row['grasas'],
            'precio' => $row['precio'],
            'numero_favoritos' => $row['numero_favoritos'],
            'imagen_url' => $row['imagen_url']
        );
    }
    echo json_encode($platos);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}