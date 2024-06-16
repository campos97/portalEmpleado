import React, { useEffect, useState } from "react";
import ThemeToggle from "../Components/ThemeToggle";

const ConfigView = () => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [preview, setPreview] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [image, setImage] = useState(null);


  // CAMBIAR FOTO DE PERFIL
  const handleFileChange = (e) => {
     const img = {
       preview: URL.createObjectURL(e.target.files[0]),
       data: e.target.files[0],
     };
     setImage(img);
  };


  // guardar el blob en la base de datos
  const changeProfilePicture = async () => {

    // codificar la imagen en base64
    console.log("image", image);
    try {
      const response = await fetch(
        " http://localhost:3000/account/changeProfilePicture ",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            employeeId: user.ID,
            profilePicture: image.data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      console.log("Profile picture updated successfully", data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };


  // Cambiar contraseña
  const changePassword = () => {
    if (!validatePassword(password, repeatPassword)) {
      console.log("Contraseña no válida");
      return;
    }
    try {
      fetch("http://localhost:3000/account/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword: password, employeeId: 5 }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const validatePassword = (password, repeatPassword) => {
    if (password.length >= 8) {
      if (password === repeatPassword) {
        return true;
      }
      console.log("Contraseñas no coinciden");
    }
    console.log("Contraseña demasiado corta");
    return false;
  };

  // Guardar en la base de datos
  // Cambiar tema
  // Guardar en local storage

  return (
    <div className="wrap">
      <div className="config-options">
        <h2>Cuenta</h2>
        <ul>
          <li>
            <p>Cambiar foto de perfil</p>
            <div>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              {preview && <img src={preview} alt="Preview" />}
              <button  onClick={changeProfilePicture}>Guardar</button>
            </div>
          </li>
          <li>
            <p>Cambiar contraseña</p>
            <div>
              <input
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Nueva contraseña"
              />
              <input
                name="repeatPassword"
                onChange={(e) => {
                  setRepeatPassword(e.target.value);
                }}
                type="password"
                placeholder="Repetir contraseña"
              />
              <button onClick={changePassword}>Guardar</button>
            </div>
          </li>
        </ul>
        <h2>Apariencia</h2>
        <ul>
          <li>Tema: </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ConfigView;
