import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";
import "../App.css";

export default function Schedule() {
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
    <div id="schedule-container">
      <div id="schedule-box">
        <h4>Schedule</h4>
        {/* <button onClick={() => fetchAlbums()}>Fetch albums</button>
        <button onClick={() => console.log(albums)}>
          View albums in state
        </button> */}
      </div>
      <div>
        {loaded ? (
          <ol id="schedule-list">
            {albums.map((album) => {
              return (
                <li key={album.album_name} id="schedule-list-item">
                  <img id="schedule-list-album-cover" src={album.artwork} />
                  <div id="schedule-list-album-info">
                    <h5 id="schedule-album-name">{album.album_name}</h5>
                    <p id="schedule-artist-name">By {album.artist_name}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
