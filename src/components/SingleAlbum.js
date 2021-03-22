import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";
import { useHistory } from "react-router-dom";

import Header from "./Header";

import { calculateAvgScore } from "../utils/formatters";

export default function SingleAlbum() {
  const [loaded, setLoaded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [suggestedBy, setSuggestedBy] = useState("");

  let history = useHistory();
  let pathSplits = history.location.pathname.split("/");

  const albumId = pathSplits[2];

  useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();

    db.collection("reviews")
      .doc(albumId)
      .collection("submissions")
      .get()
      .then((querySnapshot) => {
        if (mounted) {
          let reviewsList = [];
          querySnapshot.forEach((doc) => {
            reviewsList.push(doc.data());
          });
          setReviews(reviewsList);

          db.collection("suggested_albums")
            .doc(reviewsList[0].album)
            .get()
            .then((doc) => {
              if (doc.exists) {
                setSuggestedBy(doc.data().author);
                setLoaded(true);
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
      });

    return () => (mounted = false);
  }, [albumId]);

  return (
    <>
      {loaded ? (
        <>
          <Header title={reviews[0].artist} />
          <div id="album-reviews-container">
            <div id="album-reviews-box">
              <div id="album-review-list-header">
                <h4 id="album-reviews-list-heading">
                  <strong>{reviews[0].album}</strong>
                  <>
                    <p id="album-average-score">Suggested by {suggestedBy}</p>
                    <p id="album-average-score">
                      Average score:{" "}
                      <strong>{calculateAvgScore(reviews)}</strong>
                    </p>
                  </>
                </h4>
              </div>

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
            </div>
          </div>
        </>
      ) : (
        <>
          <Header title={"..."} />
          <div id="album-reviews-container">
            <div id="album-reviews-box">
              <p>Loading...</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
