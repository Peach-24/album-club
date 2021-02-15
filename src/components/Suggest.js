import React, { useState } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function Suggest() {
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [spotifyLink, setSpotifyLink] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    const db = firebase.firestore();
    db.collection("submissions")
      .doc(album)
      .set({
        artist_name: artist,
        album_name: album,
        spotify_link: spotifyLink,
      })
      .then(() => {
        console.log("Successfully submitted.");
        setMessage("Success!");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div id="suggest-container">
      <h4>Nominate an album</h4>
      <div id="submit-album-form">
        <p>Fill in the details of the album you want to put forward.</p>
        <input
          className="suggest-input"
          placeholder="Artist"
          onChange={(event) => {
            setArtist(event.target.value);
          }}
        ></input>
        <input
          className="suggest-input"
          placeholder="Album"
          onChange={(event) => {
            setAlbum(event.target.value);
          }}
        ></input>
        <input
          className="suggest-input"
          placeholder="Spotify link"
          onChange={(event) => {
            setSpotifyLink(event.target.value);
          }}
        ></input>
      </div>
      <button onClick={() => handleSubmit()}>Submit suggestion</button>
      {message.length > 0 ? <p>{message}</p> : <p></p>}
    </div>
  );
}
