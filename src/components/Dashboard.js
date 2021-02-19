import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";
import WriteReview from "./WriteReview";

import { secondsToDatePlusWeek, trimDateString } from "../utils/formatters";

export default function Dashboard() {
  const [allAlbums, setAllAlbums] = useState([]);
  const [currentAlbum, setCurrentAlbum] = useState({});
  const [cloneAlbum, setCloneAlbum] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [clickedReview, setClickedReview] = useState(false);

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
          setAllAlbums(albumsList);
          setCurrentAlbum(albumsList[0]);
          setCloneAlbum(JSON.parse(JSON.stringify(albumsList[0])));
          // setStartDate should use
          setStartDate(albumsList[0].created_at.toDate().toString());
          setEndDate(
            secondsToDatePlusWeek(
              JSON.parse(JSON.stringify(albumsList[0])).created_at.seconds
            ).toString()
          );
          setLoaded(true);
        }
      })
      .then(() => {
        // console.log("Then block: currentAlbum", currentAlbum);
        // console.log("Then block: endDate", endDate);
      });

    return () => (mounted = false);
  }, [currentAlbum]);

  const changeCurrentAlbum = () => {
    /* Below DELETEs currentAlbum from firebase - submissions array
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
      */
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
                  Nominated by: <strong>{currentAlbum.author}</strong>
                </p>
                <p>
                  <strong>{trimDateString(startDate)}</strong> until{" "}
                  <strong>{trimDateString(endDate)}</strong>
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
            <p id="loading-list-text">Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}
