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
      .orderBy("created_at")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let albumsList = [];
          querySnapshot.forEach((doc) => {
            albumsList.push(doc.data());
          });
          setAlbums(albumsList);
          setLoaded(true);
        }
      });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Header title="Previous albums" />
      <div id="reviews-container">
        <div id="reviews-box">
          {loaded ? (
            <ol id="reviews-list">
              {albums.map((album) => {
                return (
                  <li key={album.album} id="reviews-list-item">
                    <Link to={`/reviews/${album.album_id}`}>
                      <img
                        id="reviews-list-album-cover"
                        src={album.artwork || "https://via.placeholder.com/300"}
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
