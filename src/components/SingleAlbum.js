import React from "react";
import Header from "./Header";

export default function SingleAlbum(props) {
  const albumName = props.match.params.album_name;

  return (
    <>
      <Header title={albumName} />
      <div>
        <h4>Reviews</h4>
      </div>
    </>
  );
}
