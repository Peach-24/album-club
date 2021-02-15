import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function Schedule() {
  const [albums, setAlbums] = useState([]);

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
      });
  };

  // useEffect(() => {}, []);

  return (
    <div>
      <h4>Schedule</h4>
      <button onClick={() => fetchAlbums()}>Fetch albums</button>
      <button onClick={() => console.log(albums)}>View albums in state</button>
    </div>
  );
}
