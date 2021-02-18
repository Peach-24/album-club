import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";
import "../App.css";

import Header from "./Header";

export default function Schedule() {
  const [albums, setAlbums] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
        inOrderAlbums.splice(0, 1);
        setAlbums(inOrderAlbums);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchAlbums();
  });

  return (
    <>
      <Header title="Albums queued" />
      <div id="schedule-container">
        <div id="schedule-box"></div>

        {loaded ? (
          <ol id="schedule-list">
            {albums.length > 0 ? (
              albums.map((album) => {
                return (
                  <li key={album.album_name} id="schedule-list-item">
                    <img
                      id="schedule-list-album-cover"
                      src={album.artwork}
                      alt="album cover"
                    />
                    <div id="schedule-list-album-info">
                      <h5 id="schedule-album-name">{album.album_name}</h5>
                      <p id="schedule-artist-name">By {album.artist_name}</p>
                      <p id="schedule-author-name">~ {album.author}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <li>
                <div id="schedule-list-album-info">
                  <h5 id="schedule-album-name">
                    Nominate an album on the suggest page
                  </h5>
                </div>
              </li>
            )}
          </ol>
        ) : (
          <div id="loading-list">
            <p id="loading-list-text">Loading...</p>
          </div>
        )}
      </div>
    </>
  );
}
