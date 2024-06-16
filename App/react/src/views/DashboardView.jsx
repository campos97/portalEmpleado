import React from "react";
import EmployeeHourGrid from "../Components/Smart/EmployeeHourGrid";

const DashboardView = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Mostrar avisos generales, comunicados importantes, estadísticas, etc.
  return (
    <div className="wrap">
      <h1>Hola, { user.name}</h1>
      <div className="employee-adverts">Avisos importantes</div>
      <div className="employee-hourgrid">
        {/* mostrar fecha actual */}
        <h2>
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <EmployeeHourGrid userId={user.ID } />
      </div>
    </div>
  );
};

export default DashboardView;
