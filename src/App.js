import React, { useState, useEffect } from "react";
import "./App.css";

import firebase from "firebase";
import "firebase/auth";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { secondsToDatePlusWeek, addListeningDates } from "./utils/formatters";

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
  const [currentAlbum, setCurrentAlbum] = useState({});

  useEffect(() => {
    fetchAlbums();
  }, []);

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
          let withDates = addListeningDates(albumsList);
          console.log("Albums with dates", withDates);
          setCurrentAlbumActive(withDates);
          setAlbums(withDates);
        }
      })
      .catch((err) => {
        console.log("Error during request: ", err);
      });

    return () => (mounted = false);
  };

  const setCurrentAlbumActive = (arr) => {
    const today = new Date().getTime();

    for (let album of arr) {
      if (
        Date.parse(album.start_date) < today &&
        Date.parse(album.end_date) > today
      ) {
        setCurrentAlbum(album);
        console.log(
          "Current album is:",
          currentAlbum.album_name,
          "by",
          currentAlbum.artist_name
        );
      }
    }
  };

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
              <DashboardScreen
                currentAlbum={currentAlbum}
                fetchAlbums={fetchAlbums}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      ) : (
        <Login signIn={signIn} />
      )}
    </div>
  );
}
