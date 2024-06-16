import React, { useState } from "react";
import InputField from "../Dumb/InputField";
import Button from "../Dumb/Button";

const WorkerForm = ({ worker, onSave }) => {
  const [name, setName] = useState(worker ? worker.name : "");
  const [position, setPosition] = useState(worker ? worker.position : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: worker ? worker.id : Date.now(), name, position });
    setName("");
    setPosition("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{worker ? "Edit Worker" : "Add Worker"}</h2>
      <InputField
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputField
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Button text={worker ? "Update" : "Add"} />
    </form>
  );
};

export default WorkerForm;
