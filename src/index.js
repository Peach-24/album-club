import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyC270jcPrFPd357Ci9DGMgOCbOFzVIDCvw",
  authDomain: "album-club-96cde.firebaseapp.com",
  projectId: "album-club-96cde",
  storageBucket: "album-club-96cde.appspot.com",
  messagingSenderId: "460940433646",
  appId: "1:460940433646:web:eaad139f7825661bd57bff",
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
