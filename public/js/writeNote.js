let googleUser, googleUserId, editedNoteId;


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getSongs(googleUserId);
    } else {
        // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    }
  });
};

//Show song on page

const getSongs = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`).orderByChild("songTitle");
    console.log(notesRef);
    notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderSongDataAsHtml(data);
  });
};

const renderSongDataAsHtml = (data) => {
  let cards = ``;
  for(const songItem in data) {
    const song = data[songItem];
    // For each note create an HTML card
    console.log(songItem)
    cards += createCard(song, songItem)
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (song, songId) => {
    return `
        <div class='column is-one-third'>
            <div class="card">
                <div class="card-content">
                    <div class="content">${song.songTitle}</div>
                </div>

                <footer class="card-footer">
                    <a id="${songId}" href="#" class="card-footer-item"
                        onclick="deleteNote('${songId}')">
                        Delete
                    </a>
                    <a href="#" class="card-footer-item"
                        onclick="editNote('${songId}')">
                        Edit
                    </a>
                </footer>

            </div>
        </div>
    `;
};

const deleteNote = (songId) => {
    console.log(`Deleting note: ${songId}`);
    firebase.database().ref(`users/${googleUserId}/${songId}`).remove();
};

const editNote = (songId) => {
    console.log(`Editing note: ${songId}`);
    editedNoteId = songId;

    // Show the modal dialog
    const editNoteModal = document.querySelector("#editNoteModal");
    
    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/${songId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)

        // Show the text from the database in an editable modal
        document.querySelector("#editRankingInput").value = data.songRanking;
        document.querySelector("#editSongInput").value = data.songTitle;
    });
    // Save the updated text to the database

    // Hide the modal box once the user has made their changes
    editNoteModal.classList.toggle('is-active');
};

const saveEditedNote = () => {
    if (confirm('Are you sure you want to change this note?')) {
    // Save it!
    const editedRanking = document.querySelector("#editRankingInput").value;
    const editedSong = document.querySelector("#editSongInput").value;
    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            songRanking: editedRanking,
            songTitle: editedSong
        })
    console.log('Thing was saved to the database.');
    } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
    }
    closeEditModal();
}

const closeEditModal = () => {
 const editNoteModal = document.querySelector("#editNoteModal");
 editNoteModal.classList.toggle("is-active");
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

//ADD NEW SONGS

const songAddFunction = () => {

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

const toggleEditModal = () => {
    const editNoteModal = document.querySelector("#editTopSongsModal");
    editNoteModal.classList.toggle("is-active");
};

const saveNewSong = () => {
    const newRanking = document.querySelector("#songRanking").value;
    const newTitle = document.querySelector("#songTitle").value;
    firebase.database().ref(`users/${googleUserId}`).push(
        {
            songRanking: newRanking,
            songTitle: newTitle,
        }
    );
    console.log(newRanking);
    console.log(newTitle);
    toggleEditModal();

};