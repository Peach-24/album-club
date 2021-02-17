import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import { Link } from "react-router-dom";

import Header from "./Header";

export default function Reviews() {
  const [loaded, setLoaded] = useState(false);
  const [albums, setAlbums] = useState([]);

  const fetchReviewedAlbums = () => {
    const db = firebase.firestore();
    db.collection("reviews")
      .get()
      .then((querySnapshot) => {
        let albumsList = [];
        querySnapshot.forEach((doc) => {
          albumsList.push(doc.data());
        });
        // console.log(albumsList);
        setAlbums(albumsList);
        setLoaded(true);
      });
  };

  useEffect(() => {
    fetchReviewedAlbums();
  });

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
                    <Link to={`/reviews/${album.album}`}>
                      <img
                        id="reviews-list-album-cover"
                        src={album.artwork || "https://via.placeholder.com/150"}
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
