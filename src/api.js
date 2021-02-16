import axios from "axios";

const spotifyOembed = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://open.spotify.com",
});

export const fetchArtworkURL = (albumLink) => {
  return spotifyOembed.get(`/oembed?url=${albumLink}`).then((res) => {
    console.log(res.data.thumbnail_url);
    return res.data.thumbnail_url;
  });
};
