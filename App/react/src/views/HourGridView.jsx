import React, { useState, useEffect } from "react";
import HourGrid from "../Components/Smart/HourGrid";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeList from "../Components/Dumb/EmployeeList";
import EmployeeCard from "../Components/Dumb/EmployeeCard";

const HourGridView = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { employeeId } = useParams();
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [showHourGrid, setShowHourGrid] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(
    employees.find((e) => e.ID === employeeId) || null
  );

  // fetch de departamentos
  const departmentsList = () => {
    try {
      fetch("http://localhost:3000/departments")
        .then((response) => response.json())
        .then((data) => {
          setDepartments(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    departmentsList();
  }, []);

  // fetch de empleados
  const employeesList = async () => {
    try {
      await fetch(
        "http://localhost:3000/employees/department/" + departmentId,
        { method: "GET" }
      )
        .then((response) => response.json())
        .then((data) => {
          setEmployees(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    employeesList();
  }, []);

  // handle de seleccion de departamento
  const handleDepartmentClick = async (departmentId) => {
    await employeesList();
    navigate("/employeeList/" + departmentId);
  };

  const switchHourGrid = () => {
    if (showHourGrid === false) {
      setShowHourGrid(true);
    } else {
      setShowHourGrid(false);
    }
  };

  return (
    <div className="HourGridView">
      <div className="wrap">
        {/* <DepartmentsList /> */}
        {!departmentId && (
          <div>
            <h2>Secciones</h2>
            <ul className="department-ul">
              {departments.map((department) => (
                <button
                  key={department.ID}
                  className="department-btn"
                  onClick={() => handleDepartmentClick(department.ID)}
                >
                  <li key={department.ID}>{department.name}</li>
                </button>
              ))}
            </ul>
          </div>
        )}
        {departmentId && !employeeId && (
          <EmployeeList
            employees={employees}
            fetchEmployees={employeesList}
            setSelectedEmployee={setSelectedEmployee}
          />
        )}
        {departmentId && employeeId && (
          <div>
            <EmployeeCard
              switchHourGrid={switchHourGrid}
            />
            {showHourGrid && <HourGrid employee={selectedEmployee} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HourGridView;
