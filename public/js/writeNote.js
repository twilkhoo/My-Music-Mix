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

const songAddFunction = () => {
    setTimeout(function(){
        const songSearchSeperate = document.querySelector('#songTitle').value;
        const songSearch = songSearchSeperate.trim().split(' ').join('%20')
        console.log(songSearch);
        const song = `https://api.deezer.com/search/track?q=${songSearch}&limit=5`;
        console.log(song);

        const proxy = `https://api.codetabs.com/v1/proxy?quest=`;
        //const proxy = `https://cors-anywhere.herokuapp.com/`;

        fetch(proxy + song)
        .then(response => response.json())
        .then(data => {  

            const allSongs = data.data;
            const song1Data = allSongs[0];

            const song1Name = song1Data.title;
            const song1ArtistName = song1Data.artist.name;
            const song1Preview = song1Data.preview;
            const song1pic = song1Data.album.cover_xl;
            const song1link = song1Data.link;

            console.log("HERE IS YOUR RESULT:");
            console.log("Song name: " + song1Name);
            console.log("Artist name: " + song1ArtistName);
            console.log("Song image: " + song1pic);
            console.log("Song preview: " + song1Preview);
            console.log("Song link: " + song1link);
            

        })

        .catch(err => {console.log(`Error: ${err}`);});

    }, 50); 
}


