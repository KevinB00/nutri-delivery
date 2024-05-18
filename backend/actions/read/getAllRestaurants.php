<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare("SELECT * FROM restaurante WHERE ciudad = :ciudad");
    $stmt->bindParam(':ciudad', $_GET['ciudad']);
    $stmt->execute();
    $restaurants = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $id = $row['id_restaurante'];
        if (!isset($restaurants[$id])) {
            $restaurants[$id] = array(
                'id' => $id,
                'nombre' => $row['nombre'],
                'direccion' => $row['direccion'],
                'ciudad' => $row['ciudad'],
                'telefono' => $row['telefono'],
                'horarioApertura' => $row['horario_apertura'],
                'horarioCierre' => $row['horario_cierre']
            );
        }
    }
    echo json_encode(array_values($restaurants));
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
