let googleUser, googleUserId, editedNoteId;


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getSongs(googleUserId);
      getArtists(googleUserId);
    } else {
        // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    }
  });
};

//Show song on page
//Show song on page
//Show song on page

const getSongs = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}/songFolder`);
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
                    <div class="content">${song.songName}</div>
                    <div class="content">${song.songArtist}</div>
                    <div class="content">${song.songCover}</div>
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

//Show artists on page
//Show artists on page
//Show artists on page

const getArtists = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}/artistFolder`);
    console.log(notesRef);
    notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderArtistDataAsHtml(data);
  });
};

const renderArtistDataAsHtml = (data) => {
  let cards = ``;
  for(const artistItem in data) {
    const artist = data[artistItem];
    // For each note create an HTML card
    console.log(artistItem)
    cards += createCard2(artist, artistItem)
  };
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app2').innerHTML = cards;
};

const createCard2 = (artist, artistId) => {
    return `
        <div class='column is-one-third'>
            <div class="card">
                <div class="card-content">
                    <div class="content">${artist.artistName}</div>
                    <div class="content">${artist.artistPicture}</div>
                </div>

                <footer class="card-footer">
                    <a id="${artistId}" href="#" class="card-footer-item"
                        onclick="deleteArtist('${artistId}')">
                        Delete
                    </a>
                    <a href="#" class="card-footer-item"
                        onclick="editArtist('${artistId}')">
                        Edit
                    </a>
                </footer>

            </div>
        </div>
    `;
};


                                    // SONGS
//edit&delete songs on page
//edit&delete songs on page
//edit&delete songs on page

const deleteNote = (songId) => {
    console.log(`Deleting note: ${songId}`);
    firebase.database().ref(`users/${googleUserId}/songFolder/${songId}`).remove();
};

const editNote = (songId) => {
    console.log(`Editing note: ${songId}`);
    editedNoteId = songId;

    // Show the modal dialog
    const editNoteModal = document.querySelector("#editNoteModal");
    
    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/songFolder/${songId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)

        // Show the text from the database in an editable modal
        document.querySelector("#editSongRanking").value = data.songRanking;
        document.querySelector("#editSongName").value = data.songName;
        document.querySelector("#editSongArtist").value = data.songArtist;
        document.querySelector("#editSongCover").value = data.songCover;
        document.querySelector("#editSongLink").value = data.songLink;
        document.querySelector("#editSongPreview").value = data.songPreview;
    });
    // Save the updated text to the database

    // Hide the modal box once the user has made their changes
    editNoteModal.classList.toggle('is-active');
};

const saveEditedNote = () => {
    if (confirm('Are you sure you want to change this note?')) {
    // Save it!
    const editedRanking = document.querySelector("#editSongRanking").value;
    const editedSong = document.querySelector("#editSongName").value;
    const editedArtist = document.querySelector("#editSongArtist").value;
    const editedCover = document.querySelector("#editSongCover").value;
    const editedLink = document.querySelector("#editSongLink").value;
    const editedPreview = document.querySelector("#editSongPreview").value;
    firebase.database().ref(`users/${googleUserId}/songFolder/${editedNoteId}`)
        .update({
            songRanking: editedRanking,
            songName: editedSong,
            songArtist: editedArtist,
            songCover: editedCover,
            songLink: editedLink,
            songPreview: editedPreview,
        })
    console.log('Thing was saved to the database.');
    } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
    }
    closeEditModal();
}

//close edit modal
const closeEditModal = () => {
 const editNoteModal = document.querySelector("#editNoteModal");
 editNoteModal.classList.toggle("is-active");
};

//close create modal
const toggleEditModal = () => {
    const editNoteModal = document.querySelector("#editTopSongsModal");
    editNoteModal.classList.toggle("is-active");
};

//CREATING NEW SONG
//CREATING NEW SONG
//CREATING NEW SONG

const saveNewSong = () => {
    const newSongRanking = document.querySelector("#songRanking").value;
    const newSongName = document.querySelector("#songName").value;
    const newSongArtist = document.querySelector("#songArtist").value;
    const newSongCover = document.querySelector("#songCover").value;
    const newSongLink = document.querySelector("#songLink").value;
    const newSongPreview = document.querySelector("#songPreview").value;

    firebase.database().ref(`users/${googleUserId}/songFolder`).push(
        {
            songRanking: newSongRanking,
            songName: newSongName,
            songArtist: newSongArtist,
            songCover: newSongCover,
            songLink: newSongLink,
            songPreview: newSongPreview
        })
    .then(() => {
    console.log("Clearning text inputs"); //FIX THIS
    newSongName = "";
    newSongArtist = "";
    newSongCover = "";
    newSongLink = "";
    newSongPreview = "";
    });
    console.log("okay, bye");
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
                                        //ARTISTS

//edit&delete artists on page
//edit&delete artists on page
//edit&delete artists on page

const deleteArtist = (artistId) => {
    console.log(`Deleting note: ${artistId}`);
    firebase.database().ref(`users/${googleUserId}/artistFolder/${artistId}`).remove();
};

const editArtist = (artistId) => {
    console.log(`Editing note: ${artistId}`);
    editedNoteId = artistId;

    // Show the modal dialog
    const editArtistModal = document.querySelector("#editArtistModal");
    
    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/artistFolder/${artistId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)

        // Show the text from the database in an editable modal
        document.querySelector("#editArtistRanking").value = data.artistRanking;
        document.querySelector("#editArtistName").value = data.artistName;
        document.querySelector("#editArtistPicture").value = data.artistPicture;
        document.querySelector("#editArtistLink").value = data.artistLink;
    });
    // Save the updated text to the database

    // Hide the modal box once the user has made their changes
    editArtistModal.classList.toggle('is-active');
};

const saveEditedArtist = () => {
    if (confirm('Are you sure you want to change this note?')) {
    // Save it!
        editedRanking = document.querySelector("#editArtistRanking").value;
        editedName = document.querySelector("#editArtistName").value;
        editedPicture = document.querySelector("#editArtistPicture").value;
        editedLink = document.querySelector("#editArtistLink").value;
    firebase.database().ref(`users/${googleUserId}/artistFolder/${editedNoteId}`)
        .update({
            artistRanking: editedRanking,
            artistName: editedName,
            artistPicture: editedPicture,
            artistLink: editedLink
        })
    console.log('Thing was saved to the database.');
    } else {
    // Do nothing!
    console.log('Thing was not saved to the database.');
    }
    closeEditArtistModal();
}

//close edit modal
const closeEditArtistModal = () => {
 const editArtistModal = document.querySelector("#editArtistModal");
 editArtistModal.classList.toggle("is-active");
};

//open/close create modal
const toggleEditArtistModal = () => {
    const editArtistModal = document.querySelector("#editTopArtistsModal");
    editArtistModal.classList.toggle("is-active");
};


//CREATING NEW ARTIST 
//CREATING NEW ARTIST 
//CREATING NEW ARTIST 
//CREATING NEW ARTIST 

const saveNewArtist = () => {
    const newArtistRanking = document.querySelector("#ArtistRanking").value;
    const newArtistName = document.querySelector("#ArtistName").value;
    const newArtistPicture = document.querySelector("#ArtistPicture").value;
    const newArtistLink = document.querySelector("#ArtistLink").value;

    firebase.database().ref(`users/${googleUserId}/artistFolder`).push(
        {
            artistRanking: newArtistRanking,
            artistName: newArtistName,
            artistPicture: newArtistPicture,
            artistLink: newArtistLink
        }
    )
    .then(() => {
    console.log("Clearning text inputs"); //FIX THIS
    newSongName = "";
    newSongArtist = "";
    newSongCover = "";
    newSongLink = "";
    })
    console.log("okay, bye");
    toggleEditArtistModal();
};

//EDIT HERE TO SEARCH FOR ARTISTS INSTEAD OF SONG
const artistAddFunction = () => {
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