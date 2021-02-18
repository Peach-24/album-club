import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";
import WriteReview from "./WriteReview";

import { secondsToDatePlusWeek, trimDateString } from "../utils/formatters";

export default function Dashboard() {
  // const [albums, setAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [cloneAlbum, setCloneAlbum] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [clickedReview, setClickedReview] = useState(false);

  useEffect(() => {
    fetchAlbums();
  });

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
        setCurrentAlbum(inOrderAlbums[0]);
        setCloneAlbum(JSON.parse(JSON.stringify(inOrderAlbums[0])));
        setStartDate(inOrderAlbums[0].created_at.toDate().toString());
        setEndDate(
          secondsToDatePlusWeek(
            JSON.parse(JSON.stringify(inOrderAlbums[0])).created_at.seconds
          ).toString()
        );
        setLoaded(true);
      });
  };

  /**
   * Need to invoke changeCurrentAlbum when current date is older than endDate
   * Currently, the dates only work for the first album in the array, the startDate is just the createdAt date
   * We want the start date to be when the album in the array becomes the current album
   *
   */
  const changeCurrentAlbum = () => {
    console.log("changing album!");
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
        {loaded ? (
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
                  Listening dates: <strong>{trimDateString(startDate)}</strong>{" "}
                  until <strong>{trimDateString(endDate)}</strong>
                </p>
                <p>
                  Nominated by: <strong>{currentAlbum.author}</strong>
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
              {clickedReview ? <WriteReview album={currentAlbum} /> : <p></p>}
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
