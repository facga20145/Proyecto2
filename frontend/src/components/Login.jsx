import logo from "./images/logo-name.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa"; // Importar el ícono de flecha
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Función para validar el formato de correo
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUsername(email);

    if (email === "") {
      setError("");
    } else if (!validateEmail(email)) {
      setError("El formato del correo es incorrecto.");
    } else {
      setError("");
    }
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        }
      );

      const { accessToken, refreshToken, expirationTime } = response.data;

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("expirationTime", expirationTime);

      navigate("/admin");
    } catch (error) {
      console.error("Error en la autenticación:", error);
      alert("Error en la autenticación");
    }
  };

  return (
    <div className="content">
      <div className="login-box">
        <form onSubmit={handleLogin}>
          <img className="logo" src={logo} alt="logo" />
          <h1>Inicio de Sesión</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Escribe tu correo Electrónico"
              value={username}
              onChange={handleEmailChange}
              className={error ? "error" : ""}
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Escribe tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input type="submit" value="Iniciar Sesión" className="btn-submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
