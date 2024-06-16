import React from "react";
import LoginForm from "../Components/Smart/LoginForm";

const LoginView = (props) => (
  <div className="login-view">
    <LoginForm setToken={props.setToken} setUser={props.setUser} />
  </div>
);

export default LoginView;
