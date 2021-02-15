import React from "react";
import "../../App.css";
import logo from "../../assets/vinyl.png";

export default function Login({ signIn }) {
  let email = "test@test.com";
  let password = "";

  return (
    <div className="password-login-container">
      <div className="password-login-box">
        <img id="login-logo" src={logo} alt="album club" />
        <input
          id="password-login"
          type="password"
          placeholder="password"
          onChange={(event) => {
            password = event.target.value;
          }}
        ></input>
        <button id="login-button" onClick={() => signIn(email, password)}>
          {" "}
          🎶{" "}
        </button>
      </div>
    </div>
  );
}
