import React from "react";

const Login = ({ login }) => {
  let email = "";
  let password = "";

  return (
    <div className="user-login-box">
      <input
        id="email-login"
        placeholder="email"
        onChange={(event) => {
          email = event.target.value;
        }}
      ></input>
      <input
        id="password-login"
        type="password"
        placeholder="password"
        onChange={(event) => {
          password = event.target.value;
        }}
      ></input>
      <button
        data-testid="test-login-button"
        onClick={() => {
          console.log("Trying to log in...");
          login(email, password);
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
