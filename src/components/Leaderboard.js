import React, { useState, useEffect } from "react";
import "../App.css";
import firebase from "firebase";
import "firebase/firebase-firestore";

export default function Leaderboard({ scores }) {
  const orderedScores = scores.sort((a, b) => {
    let keyA = parseFloat(a.avg_score);
    let keyB = parseFloat(b.avg_score);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return (
    <>
      <h3>Leaderboard</h3>
      <ol>
        {orderedScores.map((album) => {
          return (
            <li key={album.album}>
              {album.album} by {album.artist}: {album.avg_score}
            </li>
          );
        })}
      </ol>
    </>
  );
}
