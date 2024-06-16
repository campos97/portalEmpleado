import React, { useState } from "react";
import "./AddEmployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    position: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      const response = await fetch("http://localhost:3000/addEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log("response", response);
        throw new Error("Network response was not ok");
      }

      // Limpiar el formulario después de enviar los datos
      setFormData({
        name: "",
        username: "",
        position: "",
        department: "",
      });

    } catch (error) {
      console.error("There was a problem adding the employee:", error);
    }
    
  };

  return (
    <div className="add-employee">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="position">Position:</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="VENDEDOR">VENDEDOR</option>
          <option value="ADJUNTO">ADJUNTO</option>
          <option value="ENCARGADO">ENCARGADO</option>
          <option value="DIRECTOR">DIRECTOR</option>
        </select>

        <label htmlFor="department">Department:</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="MASCOTAS">MASCOTAS</option>
          <option value="EXTERIOR">EXTERIOR</option>
          <option value="DECORACIÓN">DECORACIÓN</option>
          <option value="LOGÍSTICA">LOGÍSTICA</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
