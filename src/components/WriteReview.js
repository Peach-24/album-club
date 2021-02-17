import React, { useState } from "react";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function WriteReview({ album }) {
  const [name, setName] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [score, setScore] = useState(0);
  const [postReviewClicked, setPostReviewClicked] = useState(false);
  const [postMessage, setPostMessage] = useState("");

  const handlePost = () => {
    setPostReviewClicked(true);
    let reviewObj = {
      author: name,
      reviewBody,
      score,
      album: album.album_name,
      artist: album.artist_name,
    };
    const db = firebase.firestore();
    db.collection("reviews")
      .doc(album.album_name)
      .set({
        artwork: album.artwork,
        album: album.album_name,
        artist: album.artist_name,
      })
      .then(() => {
        db.collection("reviews")
          .doc(album.album_name)
          .collection("submissions")
          .doc(reviewObj.author)
          .set(reviewObj)
          .then(() => {
            console.log("added!");
            setPostMessage("Review added!");
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div id="write-review-container">
      <div id="write-review-box">
        <h5 id="write-review-heading">What did you think?</h5>
        <label htmlFor="reviewer-name">
          <input
            placeholder="Your name"
            id="your-review-name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </label>
        <label htmlFor="review-body">
          <textarea
            id="your-review-body"
            placeholder={`Your thoughts on ${album.album_name} by ${album.artist_name}.`}
            onChange={(event) => {
              setReviewBody(event.target.value);
            }}
          ></textarea>
        </label>
        <label htmlFor="score">
          <input
            id="review-score"
            type="number"
            min="1"
            max="10"
            onChange={(event) => {
              setScore(event.target.value);
            }}
          />
        </label>
        {postReviewClicked ? (
          <button id="post-review-button" disabled>
            Posting...
          </button>
        ) : (
          <button id="post-review-button" onClick={() => handlePost()}>
            Post review
          </button>
        )}
        <p id="post-message">{postMessage}</p>
      </div>
    </div>
  );
}
