// import React from "react";

// import firebase from "firebase";
// import "firebase/auth";

// export default function login() {
//   let email = "test@test.com";
//   let password = "";

//   const signIn = (email, password) => {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       setUser(userCredential.user);
//       setLoggedIn(true)
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     });

//   return (
//     <div>
//       <input
//         id="password-login"
//         type="password"
//         placeholder="password"
//         onChange={(event) => {
//           password = event.target.value;
//         }}
//       ></input>
//       <button onClick={() => signIn(email, password)}></button>
//     </div>
//   );
// }
