let googleUser;


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};


// const handleNoteSubmit = () => {
//   // 1. Capture the form data
//   const noteTitle = document.querySelector('#noteTitle');
//   const noteText = document.querySelector('#noteText');
//   // 2. Format the data and write it to our database
//   firebase.database().ref(`users/${googleUser.uid}`).push({
//     title: noteTitle.value,
//     text: noteText.value
//   })
//   // 3. Clear the form so that we can write a new note
//   .then(() => {
//     noteTitle.value = "";
//     noteText.value = "";
//   });
// }

// LAST FM API KEY: 267c4bed17d4a2204fae1460444c4719
// LAST FM SHARED SECRET: 35b8e24da5eb70b1dd4ecc53c9ec458e
// Note: Last fm doesn't have artist images, but does have track search
// https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=267c4bed17d4a2204fae1460444c4719&form

// DISCOGS API KEY: QBwPBLPvAdtskqAwbSsK
// DISCOGS CONSUMER SECRET: nmYPiDDYBMOTqFCwRjAGZTWmCOTWWbKi
// Searching by artist, type=artist
// Searching by album, type=master 
// Note: Discogs HAS artist images and albums/album art, but not track search
// https://api.discogs.com/database/search?q=${artistSearch}&type=artist&key=${musicKey}&secret=${secretKey}

// SPOTIFY CLIENT ID: 06f3519a4bcf4ec4bade4bee2bff8ac9
// SPOTIFY CLIENT SECRET: 1bbe650898604e4f856d09e1896382f9
// Spotify is hard to login

// MUSICBRAINZ 
// Note: This one is strange
// https://musicbrainz.org/ws/2/area/45f07934-675a-46d6-a577-6f8637a411b1?inc=aliases&fmt=json

// DEEZER API:
// Works best just to search for tracks, since it has built in track previews
// https://api.deezer.com/search?q=track:%22god%27s+plan%22


const handleNoteSubmit = () => {
    setTimeout(function(){
        const artistSearchSeperate = document.querySelector('#noteTitle').value;
        const artistSearch = artistSearchSeperate.trim().split(' ').join('+')
        console.log(artistSearch);


        const musicKey = 'QBwPBLPvAdtskqAwbSsK';
        const secretKey = 'nmYPiDDYBMOTqFCwRjAGZTWmCOTWWbKi';
        const artist = `https://api.discogs.com/database/search?q=${artistSearch}&type=artist&key=${musicKey}&secret=${secretKey}`;
        console.log(artist);

        fetch (artist) // Returns a promise, which resolved, are asynchronous
        .then(response => response.json())
        .then(data => {  

            const allArtists = data.results;

            const firstArtist = allArtists[0];
            const firstArtistName = firstArtist.title;
            const firstArtistImage = firstArtist.thumb;

            console.log(allArtists);
            console.log(firstArtistName, firstArtistImage);
        })

        .catch(err => {console.log(`Error: ${err}`);});

        
    }, 50); 
}
