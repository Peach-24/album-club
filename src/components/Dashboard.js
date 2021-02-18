import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   fa-spotify
// } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import WriteReview from "./WriteReview";

export default function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [clickedReview, setClickedReview] = useState(false);

  const fetchAlbums = () => {
    const db = firebase.firestore();
    db.collection("suggested_albums")
      .get()
      .then((querySnapshot) => {
        let albumsList = [];
        querySnapshot.forEach((doc) => {
          albumsList.push(doc.data());
        });
        let inOrderAlbums = albumsList
          .sort((album) => album.created_at)
          .reverse();
        setAlbums(inOrderAlbums);
        setLoaded(true);
      });
  };

  const changeCurrentAlbum = () => {
    console.log("changing album!");
    const db = firebase.firestore();
    db.collection("suggested_albums")
      .doc(albums[0].album_name)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  useEffect(() => {
    fetchAlbums();
  });

  return (
    <>
      <Header title="Current album" />
      <div id="current-album-container">
        <button onClick={() => changeCurrentAlbum()}>
          Change current album
        </button>
        {loaded ? (
          <>
            <div>
              <a href={albums[0].spotify_link}>
                <img
                  id="album-cover"
                  alt="placeholder"
                  src={albums[0].artwork}
                />
              </a>
            </div>
            <a href={albums[0].spotify_link}>
              <button id="listen-spotify-button">Listen on Spotify</button>
            </a>
            <div>
              <div id="current-album-info">
                <p>
                  Artist: <strong>{albums[0].artist_name}</strong>
                </p>
                <p>
                  Album: <strong>{albums[0].album_name}</strong>
                </p>
                <p>Listening dates: ...</p>
                <p>
                  Nominated by: <strong>{albums[0].author}</strong>
                </p>
              </div>
              <button
                id="write-review-button"
                onClick={() => {
                  console.log("Trying to review...");
                  if (!clickedReview) {
                    setClickedReview(true);
                  } else {
                    setClickedReview(false);
                  }
                }}
              >
                {!clickedReview ? (
                  <p id="write-review-button-text">Write a review... ✍️</p>
                ) : (
                  <p id="write-review-button-text">Hide review form</p>
                )}
              </button>
              {clickedReview ? <WriteReview album={albums[0]} /> : <p></p>}
            </div>
          </>
        ) : (
          <div id="loading-dashboard">
            <p id="loading-list-text">Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}
