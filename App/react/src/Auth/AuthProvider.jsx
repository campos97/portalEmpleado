import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const login = (token) => {
    setToken(token);
    console.log("guardando token", token);
    localStorage.setItem("token", token);
    navigate("/"); // Redirigir a la ruta principal después de iniciar sesión
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login"); // Redirigir a la página de login después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
