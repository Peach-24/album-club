import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

import Header from "./Header";

import { calculateAvgScore } from "../utils/formatters";

export default function SingleAlbum(props) {
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);

  const albumName = props.match.params.album_name;

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    db.collection("reviews")
      .doc(albumName)
      .collection("submissions")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let reviewsList = [];
          querySnapshot.forEach((doc) => {
            reviewsList.push(doc.data());
          });
          setReviews(reviewsList);
          setLoaded(true);
        }
      });

    return () => (mounted = false);
  }, [reviews]);

  return (
    <>
      <Header title={albumName} />
      <div id="album-reviews-container">
        <div id="album-reviews-box">
          <div id="album-review-list-header">
            <h4 id="album-reviews-list-heading">
              <strong>Reviews</strong>
              {loaded ? (
                <p id="album-average-score">
                  Average: {calculateAvgScore(reviews)}
                </p>
              ) : (
                <p id="album-average-score">...</p>
              )}
            </h4>
          </div>
          {loaded ? (
            <ol id="album-reviews-list">
              {reviews.map((review) => {
                return (
                  <li key={review.author} id="album-reviews-list-item">
                    <h5 id="album-review-author">{review.author}</h5>
                    <p id="album-review-body">{review.reviewBody}</p>
                    <h3 id="album-review-score">{review.score}</h3>
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
