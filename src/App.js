import React, { useState } from "react";
import "./index.css";

import firebase from "firebase";
import "firebase/auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";
import DashboardScreen from "./components/Dashboard";
import ScheduleScreen from "./components/Schedule";
import SuggestScreen from "./components/Suggest";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  let email = "test@test.com";
  let password = "";

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoggedIn(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      {/* <h1> Album Club </h1> */}
      {loggedIn ? (
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/home" component={DashboardScreen} />
            <Route path="/suggest" component={SuggestScreen} />
            <Route path="/schedule" component={ScheduleScreen} />
          </Switch>
        </BrowserRouter>
      ) : (
        <div>
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
      )}
    </div>
  );
}
