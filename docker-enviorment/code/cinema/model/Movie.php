<?php
class DBConnection {
    private $db;
    static private $instance = null;


    private function __construct() {
        $host = getenv('DB_HOST');
        $user = getenv('DB_USERNAME');
        $pass = getenv('DB_PASSWORD');
        $db   = getenv('DB_DATABASE');
        $port = getenv('DB_PORT');
        
        $this->db = new mysqli($host, $user, $pass, $db, $port);

        // Check connection
        if ($this->db->connect_errno) {
            echo "Failed to connect to MySql: " . $this->db->connect_errno;
            exit();
        }
    }
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new DBConnection();
        }
        return self::$instance->db;
    }
}

class MovieModel {
    private $db;
    private string $tableName;
    private static $instance = null;

    private function __construct() {
        $this->db = DBConnection::getInstance();
        $this->tableName = 'movie';
    }
    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new MovieModel();
        }
        return self::$instance;
    }

    public function createOneMovie($id, $name, $description) {
        $query = "INSERT INTO $this->tableName (id, name, description) VALUES ('$id, $name, $description')";
        $result = $this->db->query($query);
        return $result;
    }
    public function getAllMovies() {
        $query = "SELECT * FROM $this->tableName";
        $result = $this->db->query($query);
        $rows = array();
        while ($row = $result->fetch_assoc())
        {
            $rows[] = $row;
        }
        return $rows;
    }
    public function getOneMovie($id) {
        if (!isset($id)) {
            echo "id was not set ${id}";
        }
        $query = "SELECT * FROM $this->tableName WHERE 'id'=$id";
        $result = $this->db->query($query);
        return $result->fetch_assoc();
    }
    public function updateOneMovie($id, $data) {
        if (!isset($id)) {
            echo "id was not set ${id}";
        }
        $text = $data['text'];
        if (!isset($text)) {
            echo "text was not set". $text;
        }
    
        $query = "UPDATE `$this->tableName` SET `text`='$text' WHERE `$this->tableName`.`id`=$id";
        $result = $this->db->query($query);
        return $result; 
    }
    public function deleteOneMovie($id) {
        $query = "DELETE FROM $this->tableName WHERE `id`=$id";
        $result = $this->db->query($query);
        return $result;
    }
}