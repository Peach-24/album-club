import React from "react";
import "../App.css";

export default function Dashboard() {
  return (
    <div id="current-album-container">
      <h4>Current Album</h4>
      <a href="https://placeholder.com">
        <img
          id="album-cover"
          alt="placeholder"
          src="https://via.placeholder.com/175"
        />
      </a>
      <button id="listen-spotify-button">Listen to on Spotify</button>
      <div id="current-album-info">
        <p>Artist:</p>
        <p>Album:</p>
        <p>Listening dates</p>
      </div>
    </div>
  );
}
