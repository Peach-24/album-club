import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyAhBrBV1njwZZOCUvuFEyr1qqL-sPpqTM0",
  authDomain: "album-club-2.firebaseapp.com",
  projectId: "album-club-2",
  storageBucket: "album-club-2.appspot.com",
  messagingSenderId: "317060580734",
  appId: "1:317060580734:web:8530a592e3b5a5aaa69f2f",
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
