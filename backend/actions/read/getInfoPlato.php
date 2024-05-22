<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

try{
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    //Obtener la informacion del plato
    $stmt = $conn->prepare("SELECT * FROM plato WHERE id_plato = :id_plato");
    $stmt->bindParam(':id_plato', $_GET['id_plato']);
    $stmt->execute();
    $plato = $stmt->fetch(PDO::FETCH_ASSOC);
    if($plato){
        echo json_encode($plato);
    }else{
        echo json_encode(['error' => 'Plato no encontrado']);
    }
}catch(PDOException $e){
    echo json_encode(['error' => $e->getMessage()]);
}