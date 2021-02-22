import axios from "axios";

const spotifyOembed = axios.create({
  baseURL: "https://open.spotify.com",
});

// https://open.spotify.com/oembed?url=https://open.spotify.com/album/42kVfUV56KG0Ao8EbqaX51?si=hYxnlfxASdumXzgOfk1Vng

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  mode: "no-cors",
};

export const fetchArtworkURL = (albumLink) => {
  // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
  return axios
    .get(`https://open.spotify.com/oembed?url=${albumLink}`, { headers })
    .then((res) => {
      console.log(res.data.thumbnail_url);
      return res.data.thumbnail_url;
    });
};
