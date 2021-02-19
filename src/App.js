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
  // const [user, setUser] = useState({});
  const [albums, setAlbums] = useState([]);

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log(user);
        // setUser(userCredential.user);
        setLoggedIn(true);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  useEffect(() => {
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
          // REMOVES FIRST ALBUM (CURRENT ALBUM) ----> albumsList.splice(0, 1);
          setAlbums(albumsList);
          // setLoaded(true);
        }
      });
    return () => (mounted = false);
  }, [albums]);

  return (
    <div>
      {loggedIn ? (
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/* {routes.map(({ path, component: C }) => (
              <Route key={path} path={path} component={C} />
            ))} */}
            {/* <Route path="/reviews/:album_name" component={SingleAlbumScreen} />
            <Route path="/reviews" component={ReviewsScreen} />
            <Route path="/suggest" component={SuggestScreen} />
            <Route path="/schedule" component={ScheduleScreen} />
            <Route path="/home" component={DashboardScreen} /> */}
            {/* RRV5 */}
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
              <ScheduleScreen albums={albums} />
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
