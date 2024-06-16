import React from "react";

const NavBar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="nav-bar">
      <nav>
        <ul>
          {
            /*si está logueado no muestra Login */
            !token && (
              <li>
                <a href="/login">Login</a>
              </li>
            )
          }
          <li>
            <a href="/dashboard">Inicio</a>
          </li>
          <li>
            <a href="/registry">Fichaje</a>
          </li>
          <li>
            <a href="/employeeList">Empleados</a>
          </li>
          <li>
            <a href="/dashboard">Chats</a>
          </li>
          <li>
            <a href="/requests">Solicitudes</a>
          </li>
          <li>
            <a href="/config">Config</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
