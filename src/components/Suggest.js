import React, { useState } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function Suggest() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = () => {
    if (artist !== "" && album !== "" && spotifyLink !== "" && name !== "") {
      const db = firebase.firestore();
      db.collection("submissions")
        .doc(album)
        .set({
          artist_name: artist,
          album_name: album,
          spotify_link: spotifyLink,
          author: name,
        })
        .then(() => {
          console.log("Successfully submitted.");
          setErrorMsg("Success!");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      setErrorMsg("All fields must be filled in.");
    }
  };

  return (
    <div id="suggest-container">
      <h4>Nominate an album</h4>
      <p>Fill in the details of the album you want to put forward.</p>
      <div id="submit-album-form">
        <input
          className="suggest-input"
          id="artist-field"
          placeholder="Artist"
          onChange={(event) => {
            setArtist(event.target.value);
          }}
        ></input>
        <input
          className="suggest-input"
          id="album-field"
          placeholder="Album"
          onChange={(event) => {
            setAlbum(event.target.value);
          }}
        ></input>
        <input
          className="suggest-input"
          id="spotify-link-field"
          placeholder="Spotify link"
          onChange={(event) => {
            setSpotifyLink(event.target.value);
          }}
        ></input>
        <input
          className="suggest-input"
          id="author-field"
          placeholder="Your name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <button id="suggest-submit-button" onClick={() => handleSubmit()}>
          Submit
        </button>
        {errorMsg.length > 0 ? (
          <p id="errorMsg">{errorMsg}</p>
        ) : (
          <p id="errorMsg"></p>
        )}
      </div>
    </div>
  );
}
