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
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    db.collection("suggested_albums")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let albumsList = [];
          querySnapshot.forEach((doc) => {
            albumsList.push(doc.data());
          });
          let inOrderAlbums = albumsList
            .sort((album) => album.created_at)
            .reverse();
          setAllAlbums(inOrderAlbums);
          setCurrentAlbum(inOrderAlbums[currentCount]);
          setCloneAlbum(
            JSON.parse(JSON.stringify(inOrderAlbums[currentCount]))
          );
          // setStartDate should use
          setStartDate(
            inOrderAlbums[currentCount].created_at.toDate().toString()
          );
          setEndDate(
            secondsToDatePlusWeek(
              JSON.parse(JSON.stringify(inOrderAlbums[currentCount])).created_at
                .seconds
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
    /* Below uses a count to move the album on, but always resets to 0 on load, CURRENT ALBUM STATUS NEEDS TO BE STORED IN FIREBASE ? */
    console.log("changing album!");
    setCurrentCount(currentCount + 1);
    setCurrentAlbum(allAlbums[currentCount]);

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
