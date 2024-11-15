const connection = require("../../config/db.js"); // Importa la conexión a la base de datos
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Para cifrar la contraseña

// Función para generar el token de acceso 
//jwt.sign (genera el token para cada cliente)
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15s",
  });
};

// Función para generar el token de refresco
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

// Controlador de login
exports.login = (req, res) => {
  const { username, password } = req.body;

  console.log("Datos recibidos:", { username, password }); // Log para ver los datos recibidos

  // Consulta a la base de datos para verificar si el usuario existe
  const query = "SELECT * FROM usuario WHERE Correo = ?";
  connection.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Error en la consulta a la base de datos:", err);
      return res.status(500).json({ message: "Error en el servidor" });
    }

    if (results.length > 0) {
      const user = results[0]; // El usuario encontrado en la base de datos
      console.log("Usuario encontrado:", user); // Log para ver el usuario encontrado

      // Verificar si el usuario está activo
      const isActive = user.Estado && user.Estado[0] === 1; // Verifica si Estado es un Buffer y su valor es 1
      if (!isActive) {
        return res.status(403).json({ message: "El usuario no está activo" });
      }

      // Validar que los datos requeridos estén presentes
      if (!password || !user.Contrasena) {
        console.error("Contraseña o hash faltante");
        return res.status(500).json({ message: "Error interno en el servidor" });
      }

      try {
        // Comparar la contraseña cifrada
        const isPasswordValid = await bcrypt.compare(password, user.Contrasena);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        // Verificar que sea superadministrador o administrador
        if (user.Rol !== 'superadministrador' && user.Rol !== 'administrador') {
          return res.status(403).json({ message: "Acceso denegado. Solo administradores pueden acceder." });
        }

        // Generar tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Decodificar el token para obtener el tiempo de expiración
        const decodedAccessToken = jwt.decode(accessToken);
        const expirationTime = decodedAccessToken.exp; // Tiempo de expiración en formato UNIX (segundos)

        // Devolver los tokens y el tiempo de expiración al cliente
        return res.json({
          accessToken,
          refreshToken,
          expirationTime, // Incluir el tiempo de expiración
          role: user.Rol,
        });
      } catch (compareError) {
        console.error("Error al comparar contraseñas:", compareError);
        return res.status(500).json({ message: "Error interno en el servidor" });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }
  });
};