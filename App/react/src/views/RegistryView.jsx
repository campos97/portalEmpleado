import React from "react";

const RegistryView = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    const handleRegistry = () => {
        console.log(user);
        const timestamp = new Date().toISOString();
        try {
            fetch("http://localhost:3000/record", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ timestamp, employeeId: user.ID }),
            });
        } catch (error) {   
            console.error(error);
        }
    };
    return (
        <div className="wrap">
            
            <div>
                <h1>Fichaje</h1>
                <button className="registry-btn" onClick={handleRegistry}>Registrar entrada</button>
            </div>
        </div>
    );
}
    
export default RegistryView;