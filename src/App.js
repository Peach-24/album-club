import React, { useState } from "react";
import "./App.css";

import firebase from "firebase";
import "firebase/auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";
import DashboardScreen from "./components/Dashboard";
import ScheduleScreen from "./components/Schedule";
import SuggestScreen from "./components/Suggest";
import Login from "./components/auth/Login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        console.log(user);
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
      {loggedIn ? (
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/suggest" component={SuggestScreen} />
            <Route path="/schedule" component={ScheduleScreen} />
            <Route path="/home" component={DashboardScreen} />
          </Switch>
        </BrowserRouter>
      ) : (
        <Login signIn={signIn} />
      )}
    </div>
  );
}
