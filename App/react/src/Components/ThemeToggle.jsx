import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </div>
  );
};

export default ThemeToggle;
