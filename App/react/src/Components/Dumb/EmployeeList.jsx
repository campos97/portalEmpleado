import React, { useEffect } from "react";
import "./EmployeeList.css";
import { useNavigate } from "react-router-dom";

const EmployeeList = (props) => {
  const navigate = useNavigate();
  const handleEmployeeClick = async (employee) => {
    props.setSelectedEmployee(employee);
    navigate("/employeeList/" + employee.department_id + "/" + employee.ID);
  };

  useEffect(() => {
    props.fetchEmployees();
  }, []);

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <ul>
        {props.employees.map((employee) => (
          <button onClick={() => handleEmployeeClick(employee)}>
            <li key={employee.ID}>{employee.name}</li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
