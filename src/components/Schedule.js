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
      <div id="schedule-list">
        {loaded ? (
          <ol>
            {albums.map((album) => {
              return (
                <li key={album.album_name} id="schedule-list-item">
                  <h5>{album.album_name}</h5>
                  <p>By {album.artist_name}</p>
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
