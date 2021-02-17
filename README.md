# An online album club app for friends

---

**Brief**

I'm creating a social review platform for groups of friends to nominate albums to collectively listen to, and then submit feedback on.

- I want albums displayed in the app (the current album) to link to the album on Spotify when clicked. [DONE] Achieved through use of Spotify album link, which is submitted by a user on form submission.

### Next steps

- DISPLAY ALBUM COVERS - Make use of the MusicBrainz API to allow the user to search for a release, then use the `mbid` to query the MusicBrainz Cover Art Archive.
- Create review feed for people to comment on the current album, including upvoting + sorting of reviews.
- Implement time-based restrictions for determining which is the current album (maybe using date-fns)
- Implement voting ability on suggested albums list to determine which albums are positioned higher in the list.

### Technologies

- React
- Firebase, Auth & Firestore
- React Router
- Cypress

### NOTE

Whilst in development, I'm having to use a workaround for CORS, to enable me to make use of the Spotify API whilst on localhost:3000.

To make the suggest functionality work, you'll need to visit https://cors-anywhere.herokuapp.com/ and get temporary access.

---

password : **sheffhampton**

---
