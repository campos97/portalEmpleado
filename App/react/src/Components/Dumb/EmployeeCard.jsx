import React, { useState, useEffect } from "react";
import "./EmployeeCard.css";
import { useParams } from "react-router-dom";

const EmployeeCard = (props) => {
  const { employeeId } = useParams();
  const { departmentId } = useParams();
  const [employee, setEmployee] = useState({});
  const [department, setDepartment] = useState({});
  
  const fetchEmployee = async () => {
    try {
      await fetch("http://localhost:3000/employees/" + employeeId, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setEmployee(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDepartment = async () => {
    try {
      await fetch("http://localhost:3000/departments/" + departmentId, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setDepartment(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  useEffect(() => {
    fetchEmployee();
  }, []);



  return (
    <div className="employee-card">
      <div className="card-container">
        <span className="pro">Edit</span>

        <span className="delete">
          <button
            className="delete-employee-button"
            onClick={props.deleteEmployee}
          >
            delete
          </button>
        </span>
        <span className="close">
          <button className="close-button" onClick={props.closeCard}>
            Close
          </button>
        </span>

        <img
          className="round"
          src="https://img.freepik.com/fotos-premium/mono-sonriente-sonrisa-cara_1114925-610.jpg"
          alt="user"
        />
        <h3>{employee.name}</h3>
        <h6>{department.name}</h6>
        <h6>{employee.position}</h6>
        <p>Inicio contrato: 15/05/2023</p>
        <div className="buttons">
          <button className="primary">Chat</button>
          <button className="primary ghost" onClick={props.switchHourGrid}>
            Horario
          </button>
        </div>
        <div className="skills">
          <h6>Especializado en</h6>
          <ul>
            <li>Acuariofilia</li>
            <li>Estanques</li>
            <li>Reptiles</li>
            <li>Nutrición animal</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
