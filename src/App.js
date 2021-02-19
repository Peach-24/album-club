import React, { useState, useEffect } from "react";
import "./App.css";

import firebase from "firebase";
import "firebase/auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navigation from "./components/Navigation";
import DashboardScreen from "./components/Dashboard";
import ScheduleScreen from "./components/Schedule";
import SuggestScreen from "./components/Suggest";
import ReviewsScreen from "./components/Reviews";
import SingleAlbumScreen from "./components/SingleAlbum";
import Login from "./components/auth/Login";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = () => {
    let mounted = true;
    const db = firebase.firestore();
    db.collection("suggested_albums")
      .orderBy("created_at")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let albumsList = [];
          querySnapshot.forEach((doc) => {
            albumsList.push(doc.data());
          });
          setAlbums(albumsList);
          console.log("Albums:", albumsList);
        }
      })
      .catch((err) => {
        console.log("Error during request: ", err);
      });
    return () => (mounted = false);
  };

  useEffect(() => {
    // let mounted = true;
    // const db = firebase.firestore();
    // db.collection("suggested_albums")
    //   .orderBy("created_at")
    //   .get()
    // .then((querySnapshot) => {
    //   if (mounted) {
    //     let albumsList = [];
    //     querySnapshot.forEach((doc) => {
    //       albumsList.push(doc.data());
    //     });
    //     setAlbums(albumsList);
    //     console.log("Albums:", albumsList);
    //   }
    // })
    // .catch((err) => {
    //   console.log("Error during request: ", err);
    // });
    fetchAlbums();
    // return () => (mounted = false);
  }, []);

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log(user);
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
      {loggedIn ? (
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/reviews/:album_name">
              <SingleAlbumScreen />
            </Route>
            <Route path="/reviews">
              <ReviewsScreen />
            </Route>
            <Route path="/suggest">
              <SuggestScreen />
            </Route>
            <Route path="/schedule">
              <ScheduleScreen albums={albums} fetchAlbums={fetchAlbums} />
            </Route>
            <Route path="/home">
              <DashboardScreen currentAlbum={albums[0]} />
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <Login signIn={signIn} />
      )}
    </div>
  );
}
