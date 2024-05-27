<?php
include '../../variables.php';

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");

$data = json_decode(file_get_contents("php://input"), true);

$name = isset($data['name']) ? $data['name'] : null;
$email = isset($data['email']) ? $data['email'] : null;
$userId = $data['userId'];

try {
    $conn = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si el email ya está registrado por otro usuario, si se va a actualizar el email
    if ($email) {
        $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM usuario WHERE email = :email AND id_usuario != :userId");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result['count'] > 0) {
            echo json_encode(['error' => 'El correo electrónico ya está registrado por otro usuario.']);
            exit();
        }
    }

    // Construir la consulta de actualización dinámicamente
    $query = "UPDATE usuario SET ";
    $params = [];
    
    if ($name) {
        $query .= "nombre = :name, ";
        $params[':name'] = $name;
    }
    
    if ($email) {
        $query .= "email = :email, ";
        $params[':email'] = $email;
    }

    // Eliminar la última coma y añadir la cláusula WHERE
    $query = rtrim($query, ", ") . " WHERE id_usuario = :userId";
    $params[':userId'] = $userId;

    $stmt = $conn->prepare($query);

    foreach ($params as $key => &$val) {
        $stmt->bindParam($key, $val);
    }

    $stmt->execute();

    echo json_encode(['success' => true, 'message' => 'Perfil actualizado con éxito.']);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
