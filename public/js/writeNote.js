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

// DISCOGS API KEY: QBwPBLPvAdtskqAwbSsK
// DISCOGS CONSUMER SECRET: nmYPiDDYBMOTqFCwRjAGZTWmCOTWWbKi
// Searching by artist, type=artist
// Searching by album, type=master 


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

            console.log(firstArtist);
            console.log(firstArtistName, firstArtistImage);
        })

        .catch(err => {console.log(`Error: ${err}`);});

        
    }, 50); 
}
