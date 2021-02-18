import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import { Link } from "react-router-dom";

import Header from "./Header";

export default function Reviews() {
  const [loaded, setLoaded] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    db.collection("reviews")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let albumsList = [];
          querySnapshot.forEach((doc) => {
            albumsList.push(doc.data());
          });
          // console.log(albumsList);
          setAlbums(albumsList);
          setLoaded(true);
        }
      });
    return () => (mounted = false);
  }, [albums]);

  return (
    <>
      <Header title="Previous albums" />
      <div id="reviews-container">
        <button onClick={() => console.log(albums)}>
          Click for albumsList
        </button>
        <div id="reviews-box">
          {loaded ? (
            <ol id="reviews-list">
              {albums.map((x) => {
                return (
                  <li key={x.album} id="reviews-list-item">
                    <Link to={`/reviews/${x.album}`}>
                      <img
                        id="reviews-list-album-cover"
                        src={x.artwork || "https://via.placeholder.com/300"}
                        alt="album cover"
                      />
                    </Link>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
