import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import { Link } from "react-router-dom";

import Header from "./Header";
import Leaderboard from "./Leaderboard";
import { calculateAvgScore } from "../utils/formatters";

export default function Reviews() {
  const [loaded, setLoaded] = useState(false);
  const [displayRankings, setDisplayRankings] = useState(false);
  const [scores, setScores] = useState({});
  const [albums, setAlbums] = useState([]);

  const fetchAverageScores = (num) => {
    const db = firebase.firestore();
    const scoresList = [];
    for (let i = 1; i <= num; i++) {
      db.collection("reviews")
        .doc(i.toString())
        .collection("submissions")
        .get()
        .then((querySnapshot) => {
          let reviewsList = [];
          let scoreObject = {};
          querySnapshot.forEach((doc) => {
            reviewsList.push(doc.data());
            scoreObject["artist"] = doc.data().artist;
            scoreObject["album"] = doc.data().album;
          });
          scoreObject["avg_score"] = calculateAvgScore(reviewsList);
          scoresList.push(scoreObject);
          setScores(scoresList);
        });
    }
  };

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();

    db.collection("reviews")
      .orderBy("created_at", "desc")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let albumsList = [];
          querySnapshot.forEach((doc) => {
            albumsList.push(doc.data());
          });
          setAlbums(albumsList);
          console.log("added albums: ", albumsList);
          fetchAverageScores(albumsList.length);
          setLoaded(true);
        }
      });

    return () => (mounted = false);
  }, []);

  const displayLeaderboard = () => {
    displayRankings ? setDisplayRankings(false) : setDisplayRankings(true);
  };

  return (
    <>
      <Header title="Previous albums" />
      <div id="reviews-container">
        <div id="reviews-box">
          {loaded ? (
            <>
              <button
                id="toggle-rankings-btn"
                onClick={() => displayLeaderboard()}
              >
                Rankings
              </button>
              {displayRankings ? <Leaderboard scores={scores} /> : <p></p>}
              <ol id="reviews-list">
                {albums.map((album) => {
                  return (
                    <li key={album.album} id="reviews-list-item">
                      <Link to={`/reviews/${album.album_id}`}>
                        <img
                          id="reviews-list-album-cover"
                          src={
                            album.artwork || "https://via.placeholder.com/300"
                          }
                          alt="album cover"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
