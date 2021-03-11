import React, { useState } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";
import WriteReview from "./WriteReview";

import { trimDateString } from "../utils/formatters";

export default function Dashboard({ currentAlbum, fetchReviews }) {
  const [clickedReview, setClickedReview] = useState(false);

  return (
    <>
      <Header title="Current album" />
      <div id="current-album-container">
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
                  <strong>
                    {trimDateString(currentAlbum.start_date.toString()) || ""}
                  </strong>{" "}
                  until{" "}
                  <strong>
                    {trimDateString(currentAlbum.end_date.toString()) || ""}
                  </strong>
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
