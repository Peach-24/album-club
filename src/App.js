import React, { useState } from "react";
import "./index.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import "firebase/auth";

import Navigation from "./components/Navigation";
import DashboardScreen from "./components/Dashboard";
import ScheduleScreen from "./components/Schedule";
import ProfileScreen from "./components/Profile";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser({});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/home" component={DashboardScreen} />
          <Route path="/schedule" component={ScheduleScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
