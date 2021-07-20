import React from "react";
import "../App.css";

export default function Leaderboard({ scores }) {
  // console.log(scores);
  const orderedScores = scores.sort((a, b) => {
    let keyA = parseFloat(a.avg_score);
    let keyB = parseFloat(b.avg_score);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  const renderTableData = () => {
    return orderedScores.map((scores, index) => {
      const { album, artist, avg_score } = scores;
      return (
        <tr key={index}>
          <strong>
            <td id="avg-score">{avg_score}</td>
          </strong>
          <td>
            <em>{album}</em> - {artist}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table class="rankings">
        <tbody class="rankings-table">{renderTableData()}</tbody>
      </table>
    </>
  );
}
