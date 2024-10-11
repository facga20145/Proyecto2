const mysql = require("mysql2");
const dotenv = require("dotenv");

// Cargar las variables de entorno desde .env
dotenv.config();

// Crear una conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Establecer la conexión
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con la base de datos:", err.message);
    process.exit(1); // Salir del proceso si hay un error
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = connection;
