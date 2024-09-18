<?php
include '../variables.php';

$origin = "http://nutri-delivery.vercel.app";

header("Content-type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
header("Access-Control-Allow-Credentials: true");

$loginEmail = trim($_POST['email']);
$loginPassword = trim($_POST['password']);

try {
    // Conexion a la base de datos
    $db = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);

    // Busca el usuario que coincida con el email
    $dbQuery = $db->query("SELECT * FROM `usuario` WHERE `email` = '$loginEmail'");
    $userData = $dbQuery->fetchAll(); // Todos los users

    checkUserData($userData[0], $loginEmail, $loginPassword);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

// Comprueba que hay usuario y que coincide la contraseña
function checkUserData($user, $loginEm, $loginPass)
{
    if ($loginEm === $user['email']) {
        if (password_verify($loginPass, $user['contrasena'])) {
            startSession($user); // Guarda el id de usuario en la sesión
            setcookie("userId", $user['id_usuario'], 0, '/'); // Alamcenamos en una cookie en el navegador el userId
            echo json_encode(["success" => true, "userId" => $user['id_usuario']]);
        } else {
            echo json_encode(["error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["error" => "No existe un usuario con ese correo"]);
    }
}

// Guarda en la variable de sesión el id del usuario
function startSession($user)
{
    session_start();
    $_SESSION['userId'] = $user['id_usuario'];
}
