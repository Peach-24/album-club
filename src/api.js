import axios from "axios";

export const fetchArtworkURL = (albumLink) => {
  return axios
    .get(
      `https://dry-retreat-81729.herokuapp.com/https://open.spotify.com/oembed?url=${albumLink}`
    )
    .then((res) => {
      console.log(res.data.thumbnail_url);
      return res.data.thumbnail_url;
    });
};
