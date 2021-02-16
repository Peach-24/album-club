import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchAlbums = () => {
    const db = firebase.firestore();
    db.collection("submissions")
      .get()
      .then((querySnapshot) => {
        let albumsList = [];
        querySnapshot.forEach((doc) => {
          albumsList.push(doc.data());
        });
        setAlbums(albumsList);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchAlbums();
  });

  return (
    <div id="current-album-container">
      {loaded ? (
        <>
          <div>
            <h4>Current Album</h4>
            <a href={albums[0].spotify_link}>
              <img id="album-cover" alt="placeholder" src={albums[0].artwork} />
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
            </div>
            <button id="write-review-button">Write a review... ✍️</button>
          </div>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
