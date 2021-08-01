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
// Note: Supports artist/album/track search, but only returns images for albums (not artists or tracks)
// https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=cher&api_key=267c4bed17d4a2204fae1460444c4719&format=json

// DISCOGS API KEY: QBwPBLPvAdtskqAwbSsK
// DISCOGS CONSUMER SECRET: nmYPiDDYBMOTqFCwRjAGZTWmCOTWWbKi
// Searching by artist, type=artist
// Searching by album, type=master 
// Note: Discogs HAS artist images and albums/album art, but not track search
// https://api.discogs.com/database/search?q=${artistSearch}&type=artist&key=${musicKey}&secret=${secretKey}

// DEEZER API:
// Reference: https://developers.deezer.com/api/search#connections
// TRACK SEARCH: https://api.deezer.com/search/track?q=astrothunder
// ARTIST SEARCH: https://api.deezer.com/search/artist?q=eminem
// ALBUM SEARCH: https://api.deezer.com/search/album?q=graduation

// SPOTIFY CLIENT ID: 06f3519a4bcf4ec4bade4bee2bff8ac9
// SPOTIFY CLIENT SECRET: 1bbe650898604e4f856d09e1896382f9
// Spotify is hard to login

// MUSICBRAINZ 
// Note: does not return artist images
// https://musicbrainz.org/ws/2/area/45f07934-675a-46d6-a577-6f8637a411b1?inc=aliases&fmt=json



// APPLE MUSIC API
// have to be 18+ to use

const handleNoteSubmit = () => {
    setTimeout(function(){
        const artistSearchSeperate = document.querySelector('#noteTitle').value;
        const artistSearch = artistSearchSeperate.trim().split(' ').join('+')
        console.log(artistSearch);

        const artist = `https://api.deezer.com/search/artist?q=${artistSearch}`;
        
        console.log(artist);


        fetch(`https://cors-anywhere.herokuapp.com/${artist}`)
        .then(response => response.json())
        .then(data => {  
            console.log("okay");
            const allArtists = data.data;

            const artist1 = allArtists[0];
            const artist1name = artist1.name;
            const artist1pic = artist1.picture_xl;


            console.log(artist1name, artist1pic);
        })

        .catch(err => {console.log(`Error: ${err}`);});

    }, 50); 
}


