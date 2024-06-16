import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import "./App.css";
import NavBar from "./Components/Dumb/NavBar";
import UserBar from "./Components/Dumb/UserBar";
import DashboardView from "./views/DashboardView";
import HourGridView from "./views/HourGridView";
import ConfigView from "./views/ConfigView";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./Auth/AuthProvider";
import ThemeContextProvider from "./Contexts/ThemeContext";
import RegistryView from "./views/RegistryView";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");

  // si hay token y accede al login, se redirige a dashboard
  if (token) {
    return (
      <BrowserRouter>
        <AuthProvider>
          <ThemeContextProvider>
            <div id="part1">
              <UserBar />
            </div>
            <div id="part2">
              <NavBar />
              <div className="route">
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route path="/" element={<DashboardView />} />
                    <Route path="/login" element={<DashboardView />} />
                    <Route path="/dashboard" element={<DashboardView />} />
                    <Route path="/registry" element={<RegistryView />} />
                    <Route path="/employeeList" element={<HourGridView />} />
                    <Route
                      path="/employeeList/:departmentId"
                      element={<HourGridView />}
                    />
                    <Route
                      path="/employeeList/:departmentId/:employeeId"
                      element={<HourGridView />}
                    />
                    <Route path="/config" element={<ConfigView />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </ThemeContextProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <AuthProvider>
          <div id="part1">
            <UserBar />
          </div>
          <div id="part2">
            <NavBar />
            <Routes>
              <Route
                path="/login"
                element={<LoginView setToken={setToken} />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    );
  }
};

export default App;
