import React, { useState } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";
import WriteReview from "./WriteReview";

import { secondsToDatePlusWeek, trimDateString } from "../utils/formatters";

export default function Dashboard({ currentAlbum }) {
  const [clickedReview, setClickedReview] = useState(false);

  const changeCurrentAlbum = () => {
    // Below DELETEs currentAlbum from firebase - submissions array
    const db = firebase.firestore();
    db.collection("suggested_albums")
      .doc(currentAlbum.album_name)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <>
      <Header title="Current album" />
      <div id="current-album-container">
        <button onClick={() => changeCurrentAlbum()}>
          Change current album
        </button>
        {currentAlbum ? (
          <>
            <div>
              <a href={currentAlbum.spotify_link}>
                <img
                  id="album-cover"
                  alt="placeholder"
                  src={currentAlbum.artwork}
                />
              </a>
            </div>
            <a href={currentAlbum.spotify_link}>
              <button id="listen-spotify-button">Listen on Spotify</button>
            </a>
            <div>
              <div id="current-album-info">
                <p>
                  Artist: <strong>{currentAlbum.artist_name}</strong>
                </p>
                <p>
                  Album: <strong>{currentAlbum.album_name}</strong>
                </p>
                <p>
                  Nominated by: <strong>{currentAlbum.author}</strong>
                </p>
                <p>
                  {/* <strong>{trimDateString(startDate)}</strong> until{" "}
                  <strong>{trimDateString(endDate)}</strong> */}
                </p>
              </div>
              <button
                id="write-review-button"
                onClick={() => {
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
              {clickedReview ? <WriteReview album={currentAlbum} /> : <p></p>}
            </div>
          </>
        ) : (
          <div id="loading-dashboard">
            <p id="loading-list-text">Suggest an album on the suggest tab 🎶</p>
          </div>
        )}
      </div>
    </>
  );
}
