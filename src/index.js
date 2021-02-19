import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";

import App from "./App";

import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

firebase.initializeApp({
  apiKey: "AIzaSyCoxabqFlSQhSv6DjU-u58WptyphP0b0Xo",
  authDomain: "album-club-2-4fc55.firebaseapp.com",
  projectId: "album-club-2-4fc55",
  storageBucket: "album-club-2-4fc55.appspot.com",
  messagingSenderId: "970660088535",
  appId: "1:970660088535:web:196589a8b65204d6eb3e92",
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

reportWebVitals();
