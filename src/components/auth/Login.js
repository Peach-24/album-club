import React from "react";

export default function Login({ signIn }) {
  let email = "test@test.com";
  let password = "";

  return (
    <div id="password-login">
      <input
        id="password-login"
        type="password"
        placeholder="password"
        onChange={(event) => {
          password = event.target.value;
        }}
      ></input>
      <button onClick={() => signIn(email, password)}> 🎶 </button>
    </div>
  );
}
