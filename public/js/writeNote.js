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
    const notesRef = firebase.database().ref(`users/${userId}`);
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
                    <div class="content">${song.songRanking}</div>
                    <div class="content">${song.songName}</div>
                    <div class="content">${song.songArtist}</div>
                    <div class="content">${song.songCover}</div>
                    <div class="content">${song.songLink}</div>
                    <div class="content">${song.songPreview}</div>
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
        document.querySelector("#editSongInput").value = data.songName;
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
            songName: editedSong
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

const toggleEditModal = () => {
    const editNoteModal = document.querySelector("#editTopSongsModal");
    editNoteModal.classList.toggle("is-active");
};

const saveNewSong = () => {
    const newSongRanking = document.querySelector("#songRanking").value;
    const newSongName = document.querySelector("#songName").value;
    const newSongArtist = document.querySelector("#songArtist").value;
    const newSongCover = document.querySelector("#songCover").value;
    const newSongLink = document.querySelector("#songLink").value;
    const newSongPreview = document.querySelector("#songPreview").value;

    firebase.database().ref(`users/${googleUserId}`).push(
        {
            songRanking: newSongRanking,
            songName: newSongName,
            songArtist: newSongArtist,
            songCover: newSongCover,
            songLink: newSongLink,
            songPreview: newSongPreview,
        }
    );
    console.log("okay, bye")
    toggleEditModal();
};


const songAddFunction = () => {
    setTimeout(function(){
        const songSearchSeperate = document.querySelector('#songSearch').value;
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
            const song1Id = song1Data.id;

            console.log("HERE IS YOUR RESULT:");
            console.log("Song name: " + song1Name);
            console.log("Artist name: " + song1ArtistName);
            console.log("Song image: " + song1pic);
            console.log("Song preview: " + song1Preview);
            console.log("Song link: " + song1link);
            console.log("Song ID: " + song1Id);

            document.getElementById("songNameRow1").innerHTML = song1Name;
            document.getElementById("songArtistRow1").innerHTML = song1ArtistName;


        })

        .catch(err => {console.log(`Error: ${err}`);});

    }, 50);

    
}
