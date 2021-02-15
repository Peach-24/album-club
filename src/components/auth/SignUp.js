// import React, { useState } from "react";

// import firebase from "firebase";
// import "firebase/auth";
// import "firebase/firestore";

// const Register = () => {
//   let username = "";
//   let email = "";
//   let password = "";
//   let confirmPassword = "";
//   let matchingErrorMsg = "";

//   const onSignUp = () => {
//     console.log(username, email, password, confirmPassword);
//     if (confirmPassword === password) {
//       firebase
//         .auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then((res) => {
//           firebase
//             .firestore()
//             .collection("users")
//             .doc(firebase.auth().currentUser.uid)
//             .set({
//               username,
//               email,
//             });
//           console.log(res);
//           return res.user.updateProfile({
//             displayName: username,
//             photoURL:
//               "https://firebasestorage.googleapis.com/v0/b/activity-club-3dfcf.appspot.com/o/app_assets%2Fdefault-avatar.png?alt=media&token=df0a35dd-c2c7-4615-a586-74ff37ef5bc3",
//           });
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       matchingErrorMsg = "Passwords do not match";
//     }
//   };

//   return (
//     <div className="user-login-box">
//       <input
//         className="email-login"
//         placeholder="username"
//         onChange={(event) => {
//           username = event.target.value;
//         }}
//       ></input>
//       <input
//         className="email-login"
//         placeholder="email"
//         onChange={(event) => {
//           email = event.target.value;
//         }}
//       ></input>
//       <input
//         className="password-login"
//         type="password"
//         placeholder="password"
//         onChange={(event) => {
//           password = event.target.value;
//         }}
//       ></input>
//       <input
//         className="password-login"
//         type="password"
//         placeholder="confirm password"
//         onChange={(event) => {
//           confirmPassword = event.target.value;
//         }}
//       ></input>
//       <button onClick={() => onSignUp()}>Submit</button>
//       <p id="error-register"> {matchingErrorMsg}</p>
//     </div>
//   );
// };

// export default Register;
