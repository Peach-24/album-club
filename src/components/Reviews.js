import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";

export default function Reviews() {
  const [albums, setAlbums] = useState([]);

  // const fetchReviewedAlbums = () => {
  //     const db = firebase.firestore();
  //     db.collection("reviews")
  //       .get()
  //       .then((querySnapshot) => {
  //         let albumsList = [];
  //         querySnapshot.forEach((doc) => {
  //           albumsList.push(doc.data());
  //         });
  //         setAlbums(albumsList);
  //         setLoaded(true);
  //       });
  //   };

  return (
    <>
      <Header title="Previous albums" />
      <div id="reviews-container">
        <div id="reviews-box">
          <ol id="reviews-list"></ol>
        </div>
      </div>
    </>
  );
}
