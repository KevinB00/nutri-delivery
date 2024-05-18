<?php
    include './variables.php';

    class Database {
        private $ns;
        private $db;
        private $user;
        private $pswd;
        private $conn;

        public function __construct($serverName, $database, $user, $password) {
            $this->ns = $serverName;
            $this->db = $database;
            $this->user = $user;
            $this->pswd = $password;
        }

        // Conexión a la base de datos
        public function connect(){
            $this->conn = null;

            try {
                $this->conn = new PDO("mysql:host=$this->ns;dbname=$this->db", $this->user, $this->pswd);
                // Habilitar el manejo de errores de PDO
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e){
                echo "Error: " . $e->getMessage();
            }

            return $this->conn;
        }

        // Ejecutar consultas
        public function query($query) {
            return $this->conn->query($query);
        }

        // Cerrar conexión
        public function close() {
            $this->conn = null;
        }
    }
?>
