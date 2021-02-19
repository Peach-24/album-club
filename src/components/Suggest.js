import React, { useState } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";
import * as api from "../api";

import Header from "./Header";

export default function Suggest() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (artist !== "" && album !== "" && spotifyLink !== "" && name !== "") {
      setSubmitting(true);
      const db = firebase.firestore();

      /** ADDING TIMESTAMPS
       * IF suggested_albums collection in firebase is empty, then startDate = `created_at: firebase.firestore.FieldValue.serverTimestamp()`
       * IF suggested_albums collection has a document in it
       *
       *
       */

      api.fetchArtworkURL(spotifyLink).then((link) => {
        db.collection("suggested_albums")
          .doc(album)
          .set({
            artist_name: artist,
            album_name: album,
            spotify_link: spotifyLink,
            author: name,
            artwork: link,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log("Successfully submitted.");
            setErrorMsg("Success!");
            setSubmitting(false);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      });
    } else {
      setErrorMsg("All fields must be filled in.");
    }
  };

  return (
    <>
      <Header title="Nominate an album" />
      <div id="suggest-container">
        <div id="submit-album-form">
          <p>Fill in the details of the album you want to put forward.</p>
          <label htmlFor="artist name">
            <input
              className="suggest-input"
              id="artist-field"
              placeholder="Artist"
              onChange={(event) => {
                setArtist(event.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="album name">
            <input
              className="suggest-input"
              id="album-field"
              placeholder="Album"
              onChange={(event) => {
                setAlbum(event.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="spotify link">
            <input
              className="suggest-input"
              id="spotify-link-field"
              placeholder="Spotify link"
              onChange={(event) => {
                setSpotifyLink(event.target.value);
              }}
            ></input>
          </label>
          <label htmlFor="your name">
            <select
              id="author-field"
              className="suggest-input"
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
              <option value="Lewis">Lewis</option>
            </select>
          </label>

          {submitting ? (
            <button id="suggest-submit-button" disabled>
              Hold on...
            </button>
          ) : (
            <button id="suggest-submit-button" onClick={() => handleSubmit()}>
              Submit
            </button>
          )}

          {errorMsg.length > 0 ? (
            <p id="errorMsg">{errorMsg}</p>
          ) : (
            <p id="errorMsg"></p>
          )}
        </div>
      </div>
    </>
  );
}
