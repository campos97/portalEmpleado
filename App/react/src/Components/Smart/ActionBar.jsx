import React, { useState } from "react";
import "./ActionBar.css";
import AddEmployee from "./AddEmployee";

const ActionBar = (props) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAdd = () => {
    props.setIsSeeFalse();
    setShowAddForm(true);
  };

  const handleClose = () => {
    setShowAddForm(false);
  };

  return (
    <div className="action-bar">
      {showAddForm && <AddEmployee />}
      {!showAddForm && <button onClick={handleAdd}>Add</button>}
      {showAddForm && <button onClick={handleClose}>close</button>}
      {!showAddForm && (
        <div className="filtter-box">
          <img src="#" alt="filtro" />
        </div>
      )}
    </div>
  );
};

export default ActionBar;
