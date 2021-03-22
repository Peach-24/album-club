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
    if (
      name !== "" &&
      reviewBody !== "" &&
      Number(score) > 0 &&
      Number(score) <= 10
    ) {
      setPostReviewClicked(true);
      console.log(reviewBody);
      const reviewObj = {
        author: name,
        reviewBody,
        score,
        album: album.album_name,
        artist: album.artist_name,
      };
      const db = firebase.firestore();

      db.collection("reviews")
        .doc(album.album_id.toString())
        .set({
          artwork: album.artwork,
          artist: album.artist_name,
          album: album.album_name,
          created_at: firebase.firestore.FieldValue.serverTimestamp(),
          album_id: album.album_id,
        })
        .then(() => {
          db.collection("reviews")
            .doc(album.album_id.toString())
            .collection("submissions")
            .doc(name)
            .set(reviewObj)
            .then(() => {
              setPostMessage("Review added!");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      setPostMessage("All fields must be filled in correctly.");
    }
  };

  return (
    <div id="write-review-container">
      <div id="write-review-box">
        <h5 id="write-review-heading">What did you think?</h5>
        <label htmlFor="reviewer-name">
          <select
            id="your-review-name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          >
            <option value="">Your name</option>
            <option value="Shreeve">Shreeve</option>
            <option value="Will">Will</option>
            <option value="Kieran">Kieran</option>
            <option value="Sam">Sam</option>
            <option value="Ben">Ben</option>
            <option value="Peach">Peach</option>
            <option value="Lew">Lew</option>
          </select>
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
          <div id="score-container">
            <p>
              Score out of <strong>10</strong>
            </p>
            <input
              id="review-score"
              type="number"
              min="1"
              max="10"
              onChange={(event) => {
                setScore(event.target.value);
              }}
            />
          </div>
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
