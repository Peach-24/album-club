import React, { Component } from "react";
import firebase from "firebase";
import "firebase/auth";

import Login from "./Login";
import Dashboard from "./Dashboard";

export default class Home extends Component {
  state = {
    loggedIn: false,
    user: {},
  };

  login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.setState({
          user: userCredential.user.email,
          loggedIn: true,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: "", loggedIn: false });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <h2>Album Club 🎶</h2>
        {loggedIn ? <Dashboard /> : <Login />}
      </div>
    );
  }
}
