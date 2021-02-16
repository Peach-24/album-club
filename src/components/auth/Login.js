import React, { useState } from "react";
import "../../App.css";
import logo from "../../assets/vinyl.png";

export default function Login({ signIn }) {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <div className="password-login-container">
      <div className="password-login-box">
        <img id="login-logo" src={logo} alt="album club" />
        <input
          id="password-login"
          type="password"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <button
          id="login-button"
          onClick={() => {
            if (password === "sheffhampton") {
              signIn(email, password);
            } else {
              setErrorMsg("wrong password...");
            }
          }}
        >
          {" "}
          🎶{" "}
        </button>
        <p id="error-msg-text">{errorMsg}</p>
      </div>
    </div>
  );
}
