<?php
include '../variables.php';

$usernameNav = $_POST['username'];
$cityNav = $_POST['city'];
$emailNav = $_POST['email'];
$passwordNav = $_POST['password'];
$pswdHash = password_hash($passwordNav, PASSWORD_BCRYPT);

try {
    // Conexion a la base de datos
    $db = new PDO("mysql:host=$server_name;dbname=$database", $user, $password);

    // Insertar usuario en la base de datos (registro)
    $dbQuery = $db->query("INSERT INTO `usuario`(`nombre`, `email`, `contrasena`, `ciudad`, `es_administrador`)
        VALUES('$usernameNav', '$emailNav', '$pswdHash', '$cityNav', '0');");

    // Obtener el usuario que se acaba de crear para poder guardar el userId en la session
    $dbQuery = $db->query("SELECT * FROM `usuario` WHERE `email` = '$emailNav'");
    startSession($dbQuery->fetchAll()[0]); // User

    // Configurar la cookie 'userId'
    setcookie("userId", $_SESSION['userId'], 0, '/'); // Almacenar el userId en una cookie en el navegador

    // Cambia la url a landing
    header('Location: https://nutri-delivery.vercel.app');

    // Cierra la conexión y la query
    $db = null;
    $dbQuery = null;
} catch (PDOException $e) {
    echo "Error al añadir usuario: " . $e;
    die();
}

// Guarda en la variable de sesión el id del usuario
function startSession($user)
{
    session_start();
    if (!isset($_SESSION['userId'])) {
        $_SESSION['userId'] = $user['id_usuario'];
    }
}
