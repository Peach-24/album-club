import React from "react";
import "../App.css";

export default function Header(props) {
  return (
    <div id="header">
      <h3 id="header-text">{props.title}</h3>
    </div>
  );
}
