import React, { useState, useEffect } from "react";
import "./UserBar.css";
const UserBar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profilePicture, setProfilePicture] = useState("");

  const fetchProfilePicture = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/account/profilePicture/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ employeeId: user.ID }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile picture");
      }

      const data = await response.json();
      console.log("Profile picture fetched successfully", data);
      setProfilePicture((data.profilePicture));
      console.log(data.profilePicture.data);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  return (
    <div className="user-bar">
      <nav>
        <img
          className="logo"
          src="https://img.freepik.com/free-vector/gradient-logo_23-2148149233.jpg?w=740&t=st=1716912920~exp=1716913520~hmac=6f0027730eb5b939a587c06d4c810f9027d4302a7bf7e87a709a43d765b1dd86"
          alt="logo"
        />
        <ul>
          <li>iconoDeNotificaciones</li>
          <li>
            <img
              className="profile-pic"
              src={profilePicture}
              alt="user"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserBar;
