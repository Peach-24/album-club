import React, { useEffect } from "react";
import "../App.css";

import Header from "./Header";
import { trimDateString } from "../utils/formatters";

export default function Schedule({ albums, fetchAlbums }) {
  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <>
      <Header title="Schedule" />
      <div id="schedule-container">
        <div id="schedule-box"></div>

        <ol id="schedule-list">
          {albums.length > 0 ? (
            albums.map((album) => {
              return (
                <li key={album.album_name} id="schedule-list-item">
                  <img
                    id="schedule-list-album-cover"
                    src={album.artwork}
                    alt="album cover"
                  />
                  <div id="schedule-list-album-info">
                    <h5 id="schedule-album-name">{album.album_name}</h5>
                    <p id="schedule-artist-name">By {album.artist_name}</p>
                    <p id="schedule-author-name">
                      ~ {album.author} {"//"}
                      {trimDateString(album.start_date.toString())}
                    </p>
                  </div>
                </li>
              );
            })
          ) : (
            <li>
              <div id="schedule-list-album-info">
                <h5 id="schedule-album-name">
                  Nominate an album on the suggest page
                </h5>
              </div>
            </li>
          )}
        </ol>
      </div>
    </>
  );
}
