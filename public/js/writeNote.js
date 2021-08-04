// DEEZER API:
// Reference: https://developers.deezer.com/api/search#connections
// TRACK SEARCH: https://api.deezer.com/search/track?q=astrothunder&limit=5
// ARTIST SEARCH: https://api.deezer.com/search/artist?q=eminem&limit=5
// ALBUM SEARCH: https://api.deezer.com/search/album?q=graduation&limit=5

const proxy = `https://api.codetabs.com/v1/proxy?quest=`;
//const proxy = `https://cors-anywhere.herokuapp.com/`;
let googleUser;
let googleUserId;

window.onload = (event) => {
    // Use this to retain user state between html pages.
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUserId = user.uid;
            getSongs(googleUserId);
            getArtists(googleUserId);
            getAlbums(googleUserId);
        } else {
            // If not logged in, navigate back to login page.
            window.location = 'index.html'; 
        }
    });
};

// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL SONG VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let editedSongId;
let songCount;

let allSongs;

let song1Name;
let song1ArtistName;
let song1Preview;
let song1Pic;
let song1PicSmall;
let song1Link;
let song1Id;

let song2Name;
let song2ArtistName;
let song2Preview;
let song2Pic;
let song2PicSmall;
let song2Link;
let song2Id;

let song3Name;
let song3ArtistName;
let song3Preview;
let song3Pic;
let song3PicSmall;
let song3Link;
let song3Id;

let song4Name;
let song4ArtistName;
let song4Preview;
let song4Pic;
let song4PicSmall;
let song4Link;
let song4Id;

let song5Name;
let song5ArtistName;
let song5Preview;
let song5Pic;
let song5PicSmall;
let song5Link;
let song5Id;


// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW SONGS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////

const getSongs = (googleUserId) => {
    const notesRef = firebase.database().ref(`users/${googleUserId}/songFolder`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderSongDataAsHtml(data);
    });
};

const renderSongDataAsHtml = (data) => {
    let cards = ``;
    songCount = 0;
    for(const songItem in data) {
        songCount++;
        const song = data[songItem];
        // For each note create an HTML card
        console.log(songItem)
        cards += createSongCard(song, songItem)
    }
    
    // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#app').innerHTML = cards;

    if(songCount>=10) {
        console.log("bye bye button")
        document.getElementById("addSongButton").style.display = "none";
        document.getElementById("songLimitMessage").style.display = "";
    }
    else {
        document.getElementById("addSongButton").style.display = "";
        document.getElementById("songLimitMessage").style.display = "none";
    }
};

const createSongCard = (song, songId) => {
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
                    <div class="content">${song.songId}</div>
                </div>

                <footer class="card-footer">
                    <a id="${songId}" class="card-footer-item"
                        onclick="deleteSong('${songId}')">
                        Delete
                    </a>
                    <a class="card-footer-item"
                        onclick="editSong('${songId}')" data-target="editSongsModal">
                        Edit
                    </a>
                </footer>

            </div>
        </div>
    `;
};


// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// SONG MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////


const deleteSong = (songId) => {
    console.log(`Deleting note: ${songId}`);
    firebase.database().ref(`users/${googleUserId}/songFolder/${songId}`).remove();
};

const toggleEditSongsModal = () => {
    document.getElementById("songEditSearch").value = "";
    document.getElementById("editedSearchingTable").style.display = "none";

    console.log("toggling the edit modal...")
    document.querySelector("#editSongsModal").classList.toggle("is-active");
};

const toggleNewSongsModal = () => {
    console.log("toggling the new songs modal...")
    document.querySelector("#newSongsModal").classList.toggle("is-active");

    document.getElementById("songName").value = "";
    document.getElementById("songArtist").value = "";
    document.getElementById("songCover").value = "";
    document.getElementById("songLink").value = "";
    document.getElementById("songPreview").value = "";
    document.getElementById("songDeezerId").value = "";
    document.getElementById("songSearch").value = "";
    document.getElementById("songRanking").value = "";
    document.getElementById("searchingTable").style.display = "none";
};

const saveNewSong = () => {
    const newSongRanking = document.querySelector("#songRanking").value;
    const newSongName = document.querySelector("#songName").value;
    const newSongArtist = document.querySelector("#songArtist").value;
    const newSongCover = document.querySelector("#songCover").value;
    const newSongLink = document.querySelector("#songLink").value;
    const newSongPreview = document.querySelector("#songPreview").value;
    const newSongId = document.querySelector("#songDeezerId").value;

    if (newSongRanking === "") {
        alert("You are missing a song ranking.")
    }
    else if (newSongName === "") {
        alert("You are missing a song name.")
    }
    else if (newSongArtist === "") {
        alert("You are missing a song artist.")
    }
    else if (newSongCover === "") {
        alert("You are missing a song cover.")
    }
    else {
        firebase.database().ref(`users/${googleUserId}/songFolder`).push(
            {
                songRanking: newSongRanking,
                songName: newSongName,
                songArtist: newSongArtist,
                songCover: newSongCover,
                songLink: newSongLink,
                songPreview: newSongPreview,
                songId: newSongId
            }
        );
        console.log("okay, bye")
        toggleNewSongsModal();
    }
};



const editSong = (songId) => {
    console.log(`Editing note: ${songId}`);
    toggleEditSongsModal();
    editedSongId = songId;

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
        document.querySelector("#editSongDeezerId").value = data.songId;
    });
    // Save the updated text to the database
 
};
 
const saveEditedSong = () => {
    if (confirm('Are you sure you want to change this note?')) {
        // Save it!
        const editedRanking = document.querySelector("#editSongRanking").value;
        const editedSong = document.querySelector("#editSongName").value;
        const editedArtist = document.querySelector("#editSongArtist").value;
        const editedCover = document.querySelector("#editSongCover").value;
        const editedLink = document.querySelector("#editSongLink").value;
        const editedPreview = document.querySelector("#editSongPreview").value;
        const editedId = document.querySelector("#editSongDeezerId").value;
        
        if (editedRanking === "") {
            alert("You are missing a song ranking.")
        }
        else if (editedSong === "") {
            alert("You are missing a song name.")
        }
        else if (editedArtist === "") {
            alert("You are missing a song artist.")
        }
        else if (editedCover === "") {
            alert("You are missing a song cover.")
        }
        else {
            firebase.database().ref(`users/${googleUserId}/songFolder/${editedSongId}`)
                .update({
                    songRanking: editedRanking,
                    songName: editedSong,
                    songArtist: editedArtist,
                    songCover: editedCover,
                    songLink: editedLink,
                    songPreview: editedPreview,
                    songId: editedId
                })
            console.log('Thing was saved to the database.');
            toggleEditSongsModal();
        }
    }
    
}

// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////


const songAddFunction = () => {
    setTimeout(function(){
        const songSearchSeperate = document.querySelector('#songSearch').value;
        const songSearch = songSearchSeperate.trim().split(' ').join('+')
        console.log(songSearch);
        const song = `https://api.deezer.com/search/track?q=${songSearch}&limit=5`;
        console.log(song);

        const proxy = `https://api.codetabs.com/v1/proxy?quest=`;
        //const proxy = `https://cors-anywhere.herokuapp.com/`;
        
        if (songSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("searchingTable").style.display = "none";
        }

        else {
            document.getElementById("searchingTable").style.display = "";
            fetch(proxy + song)
            .then(response => response.json())
            .then(data => {  

                allSongs = data.data;

                song1Name = allSongs[0].title;
                song1ArtistName = allSongs[0].artist.name;
                song1Preview = allSongs[0].preview;
                song1Pic = allSongs[0].album.cover_xl;
                song1PicSmall = allSongs[0].album.cover_small;
                song1Link = allSongs[0].link;
                song1Id = allSongs[0].id;

                song2Name = allSongs[1].title;
                song2ArtistName = allSongs[1].artist.name;
                song2Preview = allSongs[1].preview;
                song2Pic = allSongs[1].album.cover_xl;
                song2PicSmall = allSongs[1].album.cover_small;
                song2Link = allSongs[1].link;
                song2Id = allSongs[1].id;

                song3Name = allSongs[2].title;
                song3ArtistName = allSongs[2].artist.name;
                song3Preview = allSongs[2].preview;
                song3Pic = allSongs[2].album.cover_xl;
                song3PicSmall = allSongs[2].album.cover_small;
                song3Link = allSongs[2].link;
                song3Id = allSongs[2].id;

                song4Name = allSongs[3].title;
                song4ArtistName = allSongs[3].artist.name;
                song4Preview = allSongs[3].preview;
                song4Pic = allSongs[3].album.cover_xl;
                song4PicSmall = allSongs[3].album.cover_small;
                song4Link = allSongs[3].link;
                song4Id = allSongs[3].id;

                song5Name = allSongs[4].title;
                song5ArtistName = allSongs[4].artist.name;
                song5Preview = allSongs[4].preview;
                song5Pic = allSongs[4].album.cover_xl;
                song5PicSmall = allSongs[4].album.cover_small;
                song5Link = allSongs[4].link;
                song5Id = allSongs[4].id;


                // console.log("HERE IS YOUR RESULT:");
                // console.log("Song name: " + song1Name);
                // console.log("Artist name: " + song1ArtistName);
                // console.log("Song image: " + song1Pic);
                // console.log("Song preview: " + song1Preview);
                // console.log("Song link: " + song1Link);
                // console.log("Song ID: " + song1Id);

                document.getElementById("songPicRow1").innerHTML = `<img src="${song1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("songNameRow1").innerHTML = song1Name;
                document.getElementById("songArtistRow1").innerHTML = song1ArtistName;

                document.getElementById("songPicRow2").innerHTML = `<img src="${song2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("songNameRow2").innerHTML = song2Name;
                document.getElementById("songArtistRow2").innerHTML = song2ArtistName;

                document.getElementById("songPicRow3").innerHTML = `<img src="${song3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("songNameRow3").innerHTML = song3Name;
                document.getElementById("songArtistRow3").innerHTML = song3ArtistName;

                document.getElementById("songPicRow4").innerHTML = `<img src="${song4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("songNameRow4").innerHTML = song4Name;
                document.getElementById("songArtistRow4").innerHTML = song4ArtistName;

                document.getElementById("songPicRow5").innerHTML = `<img src="${song5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("songNameRow5").innerHTML = song5Name;
                document.getElementById("songArtistRow5").innerHTML = song5ArtistName;
            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}

const addRow1ToInputs = () => {
    document.getElementById("songName").value = song1Name;
    document.getElementById("songArtist").value = song1ArtistName;
    document.getElementById("songCover").value = song1Pic;
    document.getElementById("songLink").value = song1Link;
    document.getElementById("songPreview").value = song1Preview;
    document.getElementById("songDeezerId").value = song1Id;
}

const addRow2ToInputs = () => {
    document.getElementById("songName").value = song2Name;
    document.getElementById("songArtist").value = song2ArtistName;
    document.getElementById("songCover").value = song2Pic;
    document.getElementById("songLink").value = song2Link;
    document.getElementById("songPreview").value = song2Preview;
    document.getElementById("songDeezerId").value = song2Id;
}

const addRow3ToInputs = () => {
    document.getElementById("songName").value = song3Name;
    document.getElementById("songArtist").value = song3ArtistName;
    document.getElementById("songCover").value = song3Pic;
    document.getElementById("songLink").value = song3Link;
    document.getElementById("songPreview").value = song3Preview;
    document.getElementById("songDeezerId").value = song3Id;
}

const addRow4ToInputs = () => {
    document.getElementById("songName").value = song4Name;
    document.getElementById("songArtist").value = song4ArtistName;
    document.getElementById("songCover").value = song4Pic;
    document.getElementById("songLink").value = song4Link;
    document.getElementById("songPreview").value = song4Preview;
    document.getElementById("songDeezerId").value = song4Id;
}

const addRow5ToInputs = () => {
    document.getElementById("songName").value = song5Name;
    document.getElementById("songArtist").value = song5ArtistName;
    document.getElementById("songCover").value = song5Pic;
    document.getElementById("songLink").value = song5Link;
    document.getElementById("songPreview").value = song5Preview;
    document.getElementById("songDeezerId").value = song5Id;
}



// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT SONG SEARCH FUNCTIONALITY//////////////////////////////////////////////////////


const songEditFunction = () => {
    setTimeout(function(){
        const songSearchSeperate = document.querySelector('#songEditSearch').value;
        const songSearch = songSearchSeperate.trim().split(' ').join('+')
        console.log(songSearch);
        const song = `https://api.deezer.com/search/track?q=${songSearch}&limit=5`;
        console.log(song);
        
        if (songSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("editedSearchingTable").style.display = "none";
        }

        else {
            document.getElementById("editedSearchingTable").style.display = "";
            fetch(proxy + song)
            .then(response => response.json())
            .then(data => {  

                allSongs = data.data;

                song1Name = allSongs[0].title;
                song1ArtistName = allSongs[0].artist.name;
                song1Preview = allSongs[0].preview;
                song1Pic = allSongs[0].album.cover_xl;
                song1PicSmall = allSongs[0].album.cover_small;
                song1Link = allSongs[0].link;
                song1Id = allSongs[0].id;

                song2Name = allSongs[1].title;
                song2ArtistName = allSongs[1].artist.name;
                song2Preview = allSongs[1].preview;
                song2Pic = allSongs[1].album.cover_xl;
                song2PicSmall = allSongs[1].album.cover_small;
                song2Link = allSongs[1].link;
                song2Id = allSongs[1].id;

                song3Name = allSongs[2].title;
                song3ArtistName = allSongs[2].artist.name;
                song3Preview = allSongs[2].preview;
                song3Pic = allSongs[2].album.cover_xl;
                song3PicSmall = allSongs[2].album.cover_small;
                song3Link = allSongs[2].link;
                song3Id = allSongs[2].id;

                song4Name = allSongs[3].title;
                song4ArtistName = allSongs[3].artist.name;
                song4Preview = allSongs[3].preview;
                song4Pic = allSongs[3].album.cover_xl;
                song4PicSmall = allSongs[3].album.cover_small;
                song4Link = allSongs[3].link;
                song4Id = allSongs[3].id;

                song5Name = allSongs[4].title;
                song5ArtistName = allSongs[4].artist.name;
                song5Preview = allSongs[4].preview;
                song5Pic = allSongs[4].album.cover_xl;
                song5PicSmall = allSongs[4].album.cover_small;
                song5Link = allSongs[4].link;
                song5Id = allSongs[4].id;


                // console.log("HERE IS YOUR RESULT:");
                // console.log("Song name: " + editSong1Name);
                // console.log("Artist name: " + editSong1ArtistName);
                // console.log("Song image: " + editSong1Pic);
                // console.log("Song preview: " + editSong1Preview);
                // console.log("Song link: " + editSong1Link);
                // console.log("Song ID: " + editSong1Id);

                document.getElementById("editSongPicRow1").innerHTML = `<img src="${song1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("editSongNameRow1").innerHTML = song1Name;
                document.getElementById("editSongArtistRow1").innerHTML = song1ArtistName;

                document.getElementById("editSongPicRow2").innerHTML = `<img src="${song2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("editSongNameRow2").innerHTML = song2Name;
                document.getElementById("editSongArtistRow2").innerHTML = song2ArtistName;

                document.getElementById("editSongPicRow3").innerHTML = `<img src="${song3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("editSongNameRow3").innerHTML = song3Name;
                document.getElementById("editSongArtistRow3").innerHTML = song3ArtistName;

                document.getElementById("editSongPicRow4").innerHTML = `<img src="${song4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("editSongNameRow4").innerHTML = song4Name;
                document.getElementById("editSongArtistRow4").innerHTML = song4ArtistName;

                document.getElementById("editSongPicRow5").innerHTML = `<img src="${song5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("editSongNameRow5").innerHTML = song5Name;
                document.getElementById("editSongArtistRow5").innerHTML = song5ArtistName;
            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}

const editRow1ToInputs = () => {
    document.getElementById("editSongName").value = song1Name;
    document.getElementById("editSongArtist").value = song1ArtistName;
    document.getElementById("editSongCover").value = song1Pic;
    document.getElementById("editSongLink").value = song1Link;
    document.getElementById("editSongPreview").value = song1Preview;
    document.getElementById("editSongDeezerId").value = song1Id;
}

const editRow2ToInputs = () => {
    document.getElementById("editSongName").value = song2Name;
    document.getElementById("editSongArtist").value = song2ArtistName;
    document.getElementById("editSongCover").value = song2Pic;
    document.getElementById("editSongLink").value = song2Link;
    document.getElementById("editSongPreview").value = song2Preview;
    document.getElementById("editSongDeezerId").value = song2Id;
}

const editRow3ToInputs = () => {
    document.getElementById("editSongName").value = song3Name;
    document.getElementById("editSongArtist").value = song3ArtistName;
    document.getElementById("editSongCover").value = song3Pic;
    document.getElementById("editSongLink").value = song3Link;
    document.getElementById("editSongPreview").value = song3Preview;
    document.getElementById("editSongDeezerId").value = song3Id;
}

const editRow4ToInputs = () => {
    document.getElementById("editSongName").value = song4Name;
    document.getElementById("editSongArtist").value = song4ArtistName;
    document.getElementById("editSongCover").value = song4Pic;
    document.getElementById("editSongLink").value = song4Link;
    document.getElementById("editSongPreview").value = song4Preview;
    document.getElementById("editSongDeezerId").value = song4Id;
}

const editRow5ToInputs = () => {
    document.getElementById("editSongName").value = song5Name;
    document.getElementById("editSongArtist").value = song5ArtistName;
    document.getElementById("editSongCover").value = song5Pic;
    document.getElementById("editSongLink").value = song5Link;
    document.getElementById("editSongPreview").value = song5Preview;
    document.getElementById("editSongDeezerId").value = song5Id;
}

// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ALBUM VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let editedAlbumId;
let albumCount;

let allAlbums;

let album1Name;
let album1Pic;
let album1PicSmall;
let album1Link;
let album1Artist;

let album2Name;
let album2Pic;
let album2PicSmall;
let album2Link;
let album2Artist;

let album3Name;
let album3Pic;
let album3PicSmall;
let album3Link;
let album3Artist;

let album4Name;
let album4Pic;
let album4PicSmall;
let album4Link
let album4Artist;

let album5Name;
let album5Pic;
let album5PicSmall;
let album5Link;
let album5Artist;


// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////


const getAlbums = (googleUserId) => {
    console.log("Getting the albums")
    const notesRef = firebase.database().ref(`users/${googleUserId}/albumFolder`);
    console.log(notesRef);
    notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderAlbumDataAsHtml(data);
  });
};

const renderAlbumDataAsHtml = (data) => {
    console.log("Got the data, now putting it in the html")
    let cards = ``;
    albumCount = 0;
    for(const albumItem in data) {
        albumCount++;
        const album = data[albumItem];
        // For each note create an HTML card
        console.log(albumItem)
        cards += createAlbumCard(album, albumItem)
    };
    // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#appAlbum').innerHTML = cards;

    if(albumCount>=10) {
        console.log("bye bye button")
        document.getElementById("addAlbumButton").style.display = "none";
        document.getElementById("albumLimitMessage").style.display = "";
    }
    else {
        document.getElementById("addAlbumButton").style.display = "";
        document.getElementById("albumLimitMessage").style.display = "none";
    }
};

const createAlbumCard = (album, albumId) => {
    return `
        <div class='column is-one-third'>
            <div class="card">
                <div class="card-content">
                    <div class="content">${album.albumRanking}</div>
                    <div class="content">${album.albumName}</div>
                    <div class="content">${album.albumArtist}</div>
                    <div class="content">${album.albumPic}</div>
                    <div class="content">${album.albumLink}</div>
                </div>
                <footer class="card-footer">
                    <a id="${albumId}" class="card-footer-item"
                        onclick="deleteAlbum('${albumId}')">
                        Delete
                    </a>
                    <a class="card-footer-item"
                        onclick="editAlbum('${albumId}')">
                        Edit
                    </a>
                </footer>
            </div>
        </div>
    `;
};





// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ALBUM MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////


const deleteAlbum = (albumId) => {
    console.log(`Deleting note: ${albumId}`);
    firebase.database().ref(`users/${googleUserId}/albumFolder/${albumId}`).remove();
};

const toggleEditAlbumsModal = () => {
    document.getElementById("editAlbumSearch").value = "";
    document.getElementById("editAlbumSearchingTable").style.display = "none";

    console.log("toggling the edit albums modal...")
    document.querySelector("#editAlbumsModal").classList.toggle("is-active");
};

const toggleNewAlbumsModal = () => {
    console.log("toggling the new albums modal...")
    document.querySelector("#newAlbumsModal").classList.toggle("is-active");

    document.getElementById("albumName").value = "";
    document.getElementById("albumPic").value = "";
    document.getElementById("albumArtist").value = "";
    document.getElementById("albumLink").value = "";
    document.getElementById("albumRanking").value = "";
    document.getElementById("albumSearch").value = "";
    document.getElementById("albumSearchingTable").style.display = "none";
};


const saveNewAlbum = () => {
    const newAlbumRanking = document.querySelector("#albumRanking").value;
    const newAlbumName = document.querySelector("#albumName").value;
    const newAlbumPic = document.querySelector("#albumPic").value;
    const newAlbumLink = document.querySelector("#albumLink").value;
    const newAlbumArtist = document.querySelector("#albumArtist").value;

    if (newAlbumRanking === "") {
        alert("You are missing an album ranking.")
    }
    else if (newAlbumName === "") {
        alert("You are missing an album name.")
    }
    else if (newAlbumArtist === "") {
        alert("You are missing an album artist.")
    }
    else if (newAlbumPic === "") {
        alert("You are missing an album cover.")
    }
    else {
        firebase.database().ref(`users/${googleUserId}/albumFolder`).push(
            {
                albumRanking: newAlbumRanking,
                albumName: newAlbumName,
                albumPic: newAlbumPic,
                albumLink: newAlbumLink,
                albumArtist: newAlbumArtist
            }
        );
        console.log("okay, bye")
        toggleNewAlbumsModal();
    }


};


const editAlbum = (albumId) => {
    console.log(`Editing note: ${albumId}`);
    toggleEditAlbumsModal();
    editedAlbumId = albumId;

    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/albumFolder/${albumId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)
 
        // Show the text from the database in an editable modal
        document.querySelector("#editAlbumRanking").value = data.albumRanking;
        document.querySelector("#editAlbumName").value = data.albumName;
        document.querySelector("#editAlbumPic").value = data.albumPic;
        document.querySelector("#editAlbumLink").value = data.albumLink;
        document.querySelector("#editAlbumArtist").value = data.albumArtist;
    });
    // Save the updated text to the database
 
};
 
const saveEditedAlbum = () => {
    if (confirm('Are you sure you want to change this note?')) {
        // Save it!
        const editedAlbumRanking = document.querySelector("#editAlbumRanking").value;
        const editedAlbumName = document.querySelector("#editAlbumName").value;
        const editedAlbumPic = document.querySelector("#editAlbumPic").value;
        const editedLink = document.querySelector("#editAlbumLink").value;
        const editedAlbumArtist = document.querySelector("#editAlbumArtist").value;

        if (editedAlbumRanking === "") {
            alert("You are missing an album ranking.")
        }
        else if (editedAlbumName === "") {
            alert("You are missing an album name.")
        }
        else if (editedAlbumArtist === "") {
            alert("You are missing an album artist.")
        }
        else if (editedAlbumPic === "") {
            alert("You are missing an album cover.")
        }
        else {
            firebase.database().ref(`users/${googleUserId}/albumFolder/${editedAlbumId}`)
                .update({
                    albumRanking: editedAlbumRanking,
                    albumName: editedAlbumName,
                    albumPic: editedAlbumPic,
                    albumLink: editedLink,
                    albumArtist: editedAlbumArtist
                })
            console.log('Thing was saved to the database.');
            toggleEditAlbumsModal();
        }
    }
    
}




// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////

const albumAddFunction = () => {
    setTimeout(function(){
        const albumSearchSeperate = document.querySelector('#albumSearch').value;
        const albumSearch = albumSearchSeperate.trim().split(' ').join('+')
        console.log(albumSearch);
        const album = `https://api.deezer.com/search/album?q=${albumSearch}&limit=5`;
        console.log(album);
        
        if (albumSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("albumSearchingTable").style.display = "none";
        }

        else {
            document.getElementById("albumSearchingTable").style.display = "";
            fetch(proxy + album)
            .then(response => response.json())
            .then(data => {  

                allAlbums = data.data;

                album1Name = allAlbums[0].title;
                album1Pic = allAlbums[0].cover_xl;
                album1PicSmall = allAlbums[0].cover_small;
                album1Link = allAlbums[0].link;
                album1Artist = allAlbums[0].artist.name;

                album2Name = allAlbums[1].title;
                album2Pic = allAlbums[1].cover_xl;
                album2PicSmall = allAlbums[1].cover_small;
                album2Link = allAlbums[1].link;
                album2Artist = allAlbums[1].artist.name;

                album3Name = allAlbums[2].title;
                album3Pic = allAlbums[2].cover_xl;
                album3PicSmall = allAlbums[2].cover_small;
                album3Link = allAlbums[2].link;
                album3Artist = allAlbums[2].artist.name;

                album4Name = allAlbums[3].title;
                album4Pic = allAlbums[3].cover_xl;
                album4PicSmall = allAlbums[3].cover_small;
                album4Link = allAlbums[3].link;
                album4Artist = allAlbums[3].artist.name;

                album5Name = allAlbums[4].title;
                album5Pic = allAlbums[4].cover_xl;
                album5PicSmall = allAlbums[4].cover_small;
                album5Link = allAlbums[4].link;
                album5Artist = allAlbums[4].artist.name;

                // console.log("HERE IS YOUR RESULT:");
                // console.log("Album name: " + album1Name);
                // console.log("Album image: " + album1Pic);
                // console.log("Album link: " + album1Link);
                // console.log("Album link: " + album1Artist);

                document.getElementById("albumPicRow1").innerHTML = `<img src="${album1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("albumNameRow1").innerHTML = album1Name;
                document.getElementById("albumArtistRow1").innerHTML = album1Artist;

                document.getElementById("albumPicRow2").innerHTML = `<img src="${album2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("albumNameRow2").innerHTML = album2Name;
                document.getElementById("albumArtistRow2").innerHTML = album2Artist;

                document.getElementById("albumPicRow3").innerHTML = `<img src="${album3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("albumNameRow3").innerHTML = album3Name;
                document.getElementById("albumArtistRow3").innerHTML = album3Artist;

                document.getElementById("albumPicRow4").innerHTML = `<img src="${album4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("albumNameRow4").innerHTML = album4Name;
                document.getElementById("albumArtistRow4").innerHTML = album4Artist;

                document.getElementById("albumPicRow5").innerHTML = `<img src="${album5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("albumNameRow5").innerHTML = album5Name;
                document.getElementById("albumArtistRow5").innerHTML = album5Artist;
            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}

// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ALBUM SEARCH FUNCTIONALITY//////////////////////////////////////////////////////


const albumEditFunction = () => {
    setTimeout(function(){
        const albumSearchSeperate = document.querySelector('#editAlbumSearch').value;
        const albumSearch = albumSearchSeperate.trim().split(' ').join('+')
        console.log(albumSearch);
        const album = `https://api.deezer.com/search/album?q=${albumSearch}&limit=5`;
        console.log(album);
        
        if (albumSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("editAlbumSearchingTable").style.display = "none";
        }

        else {
            document.getElementById("editAlbumSearchingTable").style.display = "";
            fetch(proxy + album)
            .then(response => response.json())
            .then(data => {  

                allAlbums = data.data;

                album1Name = allAlbums[0].title;
                album1Pic = allAlbums[0].cover_xl;
                album1PicSmall = allAlbums[0].cover_small;
                album1Link = allAlbums[0].link;
                album1Artist = allAlbums[0].artist.name;

                album2Name = allAlbums[1].title;
                album2Pic = allAlbums[1].cover_xl;
                album2PicSmall = allAlbums[1].cover_small;
                album2Link = allAlbums[1].link;
                album2Artist = allAlbums[1].artist.name;

                album3Name = allAlbums[2].title;
                album3Pic = allAlbums[2].cover_xl;
                album3PicSmall = allAlbums[2].cover_small;
                album3Link = allAlbums[2].link;
                album3Artist = allAlbums[2].artist.name;

                album4Name = allAlbums[3].title;
                album4Pic = allAlbums[3].cover_xl;
                album4PicSmall = allAlbums[3].cover_small;
                album4Link = allAlbums[3].link;
                album4Artist = allAlbums[3].artist.name;

                album5Name = allAlbums[4].title;
                album5Pic = allAlbums[4].cover_xl;
                album5PicSmall = allAlbums[4].cover_small;
                album5Link = allAlbums[4].link;
                album5Artist = allAlbums[4].artist.name;

                // console.log("HERE IS YOUR RESULT:");
                // console.log("Album name: " + album1Name);
                // console.log("Album image: " + album1Pic);
                // console.log("Album link: " + album1Link);
                // console.log("Album link: " + album1Artist);

                document.getElementById("editAlbumPicRow1").innerHTML = `<img src="${album1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("editAlbumNameRow1").innerHTML = album1Name;
                document.getElementById("editAlbumArtistRow1").innerHTML = album1Artist;

                document.getElementById("editAlbumPicRow2").innerHTML = `<img src="${album2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("editAlbumNameRow2").innerHTML = album2Name;
                document.getElementById("editAlbumArtistRow2").innerHTML = album2Artist;

                document.getElementById("editAlbumPicRow3").innerHTML = `<img src="${album3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("editAlbumNameRow3").innerHTML = album3Name;
                document.getElementById("editAlbumArtistRow3").innerHTML = album3Artist;

                document.getElementById("editAlbumPicRow4").innerHTML = `<img src="${album4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("editAlbumNameRow4").innerHTML = album4Name;
                document.getElementById("editAlbumArtistRow4").innerHTML = album4Artist;

                document.getElementById("editAlbumPicRow5").innerHTML = `<img src="${album5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("editAlbumNameRow5").innerHTML = album5Name;
                document.getElementById("editAlbumArtistRow5").innerHTML = album5Artist;

            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}


const addAlbumRow1ToInputs = () => {
    document.getElementById("albumName").value = album1Name;
    document.getElementById("albumPic").value = album1Pic;
    document.getElementById("albumLink").value = album1Link;
    document.getElementById("albumArtist").value = album1Artist;
}

const addAlbumRow2ToInputs = () => {
    document.getElementById("albumName").value = album2Name;
    document.getElementById("albumPic").value = album2Pic;
    document.getElementById("albumLink").value = album2Link;
    document.getElementById("albumArtist").value = album2Artist;
}

const addAlbumRow3ToInputs = () => {
    document.getElementById("albumName").value = album3Name;
    document.getElementById("albumPic").value = album3Pic;
    document.getElementById("albumLink").value = album3Link;
    document.getElementById("albumArtist").value = album3Artist;
}

const addAlbumRow4ToInputs = () => {
    document.getElementById("albumName").value = album4Name;
    document.getElementById("albumPic").value = album4Pic;
    document.getElementById("albumLink").value = album4Link;
    document.getElementById("albumArtist").value = album4Artist;
}

const addAlbumRow5ToInputs = () => {
    document.getElementById("albumName").value = album5Name;
    document.getElementById("albumPic").value = album5Pic;
    document.getElementById("albumLink").value = album5Link;
    document.getElementById("albumArtist").value = album5Artist;
}



const editAlbumRow1ToInputs = () => {
    console.log("editing for 1")
    document.getElementById("editAlbumName").value = album1Name;
    document.getElementById("editAlbumPic").value = album1Pic;
    document.getElementById("editAlbumLink").value = album1Link;
    document.getElementById("editAlbumArtist").value = album1Artist;
}

const editAlbumRow2ToInputs = () => {
    document.getElementById("editAlbumName").value = album2Name;
    document.getElementById("editAlbumPic").value = album2Pic;
    document.getElementById("editAlbumLink").value = album2Link;
    document.getElementById("editAlbumArtist").value = album2Artist;
}

const editAlbumRow3ToInputs = () => {
    document.getElementById("editAlbumName").value = album3Name;
    document.getElementById("editAlbumPic").value = album3Pic;
    document.getElementById("editAlbumLink").value = album3Link;
    document.getElementById("editAlbumArtist").value = album3Artist;
}

const editAlbumRow4ToInputs = () => {
    document.getElementById("editAlbumName").value = album4Name;
    document.getElementById("editAlbumPic").value = album4Pic;
    document.getElementById("editAlbumLink").value = album4Link;
    document.getElementById("editAlbumArtist").value = album4Artist;
}

const editAlbumRow5ToInputs = () => {
    document.getElementById("editAlbumName").value = album5Name;
    document.getElementById("editAlbumPic").value = album5Pic;
    document.getElementById("editAlbumLink").value = album5Link;
    document.getElementById("editAlbumArtist").value = album5Artist;
}

// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL ARTIST VARIABLES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let editedArtistId;
let artistCount;

let allArtists;

let artist1Name;
let artist1Pic;
let artist1PicSmall;
let artist1Link;

let artist2Name;
let artist2Pic;
let artist2PicSmall;
let artist2Link;

let artist3Name;
let artist3Pic;
let artist3PicSmall;
let artist3Link;

let artist4Name;
let artist4Pic;
let artist4PicSmall;
let artist4Link

let artist5Name;
let artist5Pic;
let artist5PicSmall;
let artist5Link;


// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////
// CODE TO SHOW ALBUMS ON PAGE /////////////////////////////////////////////////////////////////////////////////////////////


const getArtists = (googleUserId) => {
    console.log("Getting the artists")
    const notesRef = firebase.database().ref(`users/${googleUserId}/artistFolder`);
    console.log(notesRef);
    notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderArtistDataAsHtml(data);
  });
};

const renderArtistDataAsHtml = (data) => {
    console.log("Got the data, now putting it in the html")
    let cards = ``;
    artistCount = 0;
    for(const artistItem in data) {
        artistCount++;
        const artist = data[artistItem];
        // For each note create an HTML card
        console.log(artistItem)
        cards += createArtistCard(artist, artistItem)
    };
    // Inject our string of HTML into our viewNotes.html page
    document.querySelector('#appArtist').innerHTML = cards;

    if(artistCount>=10) {
        console.log("bye bye button")
        document.getElementById("addArtistButton").style.display = "none";
        document.getElementById("artistLimitMessage").style.display = "";
    }
    else {
        document.getElementById("addArtistButton").style.display = "";
        document.getElementById("artistLimitMessage").style.display = "none";
    }
};

const createArtistCard = (artist, artistId) => {
    return `
        <div class='column is-one-third'>
            <div class="card">
                <div class="card-content">
                    <div class="content">${artist.artistRanking}</div>
                    <div class="content">${artist.artistName}</div>
                    <div class="content">${artist.artistPic}</div>
                    <div class="content">${artist.artistLink}</div>
                </div>
                <footer class="card-footer">
                    <a id="${artistId}" class="card-footer-item"
                        onclick="deleteArtist('${artistId}')">
                        Delete
                    </a>
                    <a class="card-footer-item"
                        onclick="editArtist('${artistId}')">
                        Edit
                    </a>
                </footer>
            </div>
        </div>
    `;
};





// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////
// ARTIST MODAL ACTIVATION BELOW ///////////////////////////////////////////////////////////////


const deleteArtist = (artistId) => {
    console.log(`Deleting note: ${artistId}`);
    firebase.database().ref(`users/${googleUserId}/artistFolder/${artistId}`).remove();
};

const toggleEditArtistsModal = () => {
    document.getElementById("editArtistSearch").value = "";
    document.getElementById("editArtistSearchingTable").style.display = "none";

    console.log("toggling the edit artists modal...")
    document.querySelector("#editArtistsModal").classList.toggle("is-active");
};

const toggleNewArtistsModal = () => {
    console.log("toggling the new artists modal...")
    document.querySelector("#newArtistsModal").classList.toggle("is-active");

    document.getElementById("artistName").value = "";
    document.getElementById("artistPic").value = "";
    document.getElementById("artistLink").value = "";
    document.getElementById("artistRanking").value = "";
    document.getElementById("artistSearch").value = "";
    document.getElementById("artistSearchingTable").style.display = "none";
};


const saveNewArtist = () => {
    const newArtistRanking = document.querySelector("#artistRanking").value;
    const newArtistName = document.querySelector("#artistName").value;
    const newArtistPic = document.querySelector("#artistPic").value;
    const newArtistLink = document.querySelector("#artistLink").value;
    
    if (newArtistRanking === "") {
        alert("You are missing an artist ranking.")
    }
    else if (newArtistName === "") {
        alert("You are missing an artist name.")
    }
    else if (newArtistPic === "") {
        alert("You are missing an artist image.")
    }
    else {
        firebase.database().ref(`users/${googleUserId}/artistFolder`).push(
            {
                artistRanking: newArtistRanking,
                artistName: newArtistName,
                artistPic: newArtistPic,
                artistLink: newArtistLink,
            }
        );
        console.log("okay, bye")
        toggleNewArtistsModal();
    }
};


const editArtist = (artistId) => {
    console.log(`Editing note: ${artistId}`);
    toggleEditArtistsModal();
    editedArtistId = artistId;

    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/artistFolder/${artistId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        console.log(data)
 
        // Show the text from the database in an editable modal
        document.querySelector("#editArtistRanking").value = data.artistRanking;
        document.querySelector("#editArtistName").value = data.artistName;
        document.querySelector("#editArtistPic").value = data.artistPic;
        document.querySelector("#editArtistLink").value = data.artistLink;
    });
    // Save the updated text to the database
 
};
 
const saveEditedArtist = () => {
    if (confirm('Are you sure you want to change this note?')) {
        // Save it!
        const editedArtistRanking = document.querySelector("#editArtistRanking").value;
        const editedArtistName = document.querySelector("#editArtistName").value;
        const editedArtistPic = document.querySelector("#editArtistPic").value;
        const editedLink = document.querySelector("#editArtistLink").value;

        if (editedArtistRanking === "") {
            alert("You are missing an artist ranking.")
        }
        else if (editedArtistName === "") {
            alert("You are missing an artist name.")
        }
        else if (editedArtistPic === "") {
            alert("You are missing an artist image.")
        }
        else {
            firebase.database().ref(`users/${googleUserId}/artistFolder/${editedArtistId}`)
                .update({
                    artistRanking: editedArtistRanking,
                    artistName: editedArtistName,
                    artistPic: editedArtistPic,
                    artistLink: editedLink
                })
            console.log('Thing was saved to the database.');
            toggleEditArtistsModal();
        }
    }
    
}




<<<<<<< HEAD

=======
>>>>>>> 3072cb88137d4a42dd8ca5b023ced0d99e2b2d61
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// NEW ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////

const artistAddFunction = () => {
    setTimeout(function(){
        const artistSearchSeperate = document.querySelector('#artistSearch').value;
        const artistSearch = artistSearchSeperate.trim().split(' ').join('+')
        console.log(artistSearch);
        const artist = `https://api.deezer.com/search/artist?q=${artistSearch}&limit=5`;
        console.log(artist);
        
        if (artistSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("artistSearchingTable").style.display = "none";
        }

        else {
            document.getElementById("artistSearchingTable").style.display = "";
            fetch(proxy + artist)
            .then(response => response.json())
            .then(data => {  

                allArtists = data.data;

                artist1Name = allArtists[0].name;
                artist1Pic = allArtists[0].picture_xl;
                artist1PicSmall = allArtists[0].picture_small;
                artist1Link = allArtists[0].link;

                artist2Name = allArtists[1].name;
                artist2Pic = allArtists[1].picture_xl;
                artist2PicSmall = allArtists[1].picture_small;
                artist2Link = allArtists[1].link;

                artist3Name = allArtists[2].name;
                artist3Pic = allArtists[2].picture_xl;
                artist3PicSmall = allArtists[2].picture_small;
                artist3Link = allArtists[2].link;

                artist4Name = allArtists[3].name;
                artist4Pic = allArtists[3].picture_xl;
                artist4PicSmall = allArtists[3].picture_small;
                artist4Link = allArtists[3].link;

                artist5Name = allArtists[4].name;
                artist5Pic = allArtists[4].picture_xl;
                artist5PicSmall = allArtists[4].picture_small;
                artist5Link = allArtists[4].link;

                // console.log("HERE IS YOUR RESULT:");
                // console.log("Artist name: " + artist1Name);
                // console.log("Artist image: " + artist1Pic);
                // console.log("Artist link: " + artist1Link);

                document.getElementById("artistPicRow1").innerHTML = `<img src="${artist1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("artistNameRow1").innerHTML = artist1Name;

                document.getElementById("artistPicRow2").innerHTML = `<img src="${artist2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("artistNameRow2").innerHTML = artist2Name;

                document.getElementById("artistPicRow3").innerHTML = `<img src="${artist3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("artistNameRow3").innerHTML = artist3Name;

                document.getElementById("artistPicRow4").innerHTML = `<img src="${artist4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("artistNameRow4").innerHTML = artist4Name;

                document.getElementById("artistPicRow5").innerHTML = `<img src="${artist5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("artistNameRow5").innerHTML = artist5Name;
            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}

// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////
// EDIT ARTIST SEARCH FUNCTIONALITY//////////////////////////////////////////////////////


const artistEditFunction = () => {
    setTimeout(function(){
        const artistSearchSeperate = document.querySelector('#editArtistSearch').value;
        const artistSearch = artistSearchSeperate.trim().split(' ').join('+')
        console.log(artistSearch);
        const artist = `https://api.deezer.com/search/artist?q=${artistSearch}&limit=5`;
        console.log(artist);
        
        if (artistSearch === "") {
            console.log("nothing is being searched");
            document.getElementById("editArtistSearchingTable").style.display = "none";
        }

        else {
            document.getElementById("editArtistSearchingTable").style.display = "";
            fetch(proxy + artist)
            .then(response => response.json())
            .then(data => {  

                allArtists = data.data;

                artist1Name = allArtists[0].name;
                artist1Pic = allArtists[0].picture_xl;
                artist1PicSmall = allArtists[0].picture_small;
                artist1Link = allArtists[0].link;

                artist2Name = allArtists[1].name;
                artist2Pic = allArtists[1].picture_xl;
                artist2PicSmall = allArtists[1].picture_small;
                artist2Link = allArtists[1].link;

                artist3Name = allArtists[2].name;
                artist3Pic = allArtists[2].picture_xl;
                artist3PicSmall = allArtists[2].picture_small;
                artist3Link = allArtists[2].link;

                artist4Name = allArtists[3].name;
                artist4Pic = allArtists[3].picture_xl;
                artist4PicSmall = allArtists[3].picture_small;
                artist4Link = allArtists[3].link;

                artist5Name = allArtists[4].name;
                artist5Pic = allArtists[4].picture_xl;
                artist5PicSmall = allArtists[4].picture_small;
                artist5Link = allArtists[4].link;

                // console.log("HERE IS YOUR RESULT:");
                // console.log("Artist name: " + artist1Name);
                // console.log("Artist image: " + artist1Pic);
                // console.log("Artist link: " + artist1Link);

                document.getElementById("editArtistPicRow1").innerHTML = `<img src="${artist1PicSmall}" alt="Row 1 Art"></img>`;
                document.getElementById("editArtistNameRow1").innerHTML = artist1Name;

                document.getElementById("editArtistPicRow2").innerHTML = `<img src="${artist2PicSmall}" alt="Row 2 Art"></img>`;
                document.getElementById("editArtistNameRow2").innerHTML = artist2Name;

                document.getElementById("editArtistPicRow3").innerHTML = `<img src="${artist3PicSmall}" alt="Row 3 Art"></img>`;
                document.getElementById("editArtistNameRow3").innerHTML = artist3Name;

                document.getElementById("editArtistPicRow4").innerHTML = `<img src="${artist4PicSmall}" alt="Row 4 Art"></img>`;
                document.getElementById("editArtistNameRow4").innerHTML = artist4Name;

                document.getElementById("editArtistPicRow5").innerHTML = `<img src="${artist5PicSmall}" alt="Row 5 Art"></img>`;
                document.getElementById("editArtistNameRow5").innerHTML = artist5Name;


            })

            .catch(err => {console.log(`Error: ${err}`);});
        }
    }, 50);

    
}


const addArtistRow1ToInputs = () => {
    document.getElementById("artistName").value = artist1Name;
    document.getElementById("artistPic").value = artist1Pic;
    document.getElementById("artistLink").value = artist1Link;
}

const addArtistRow2ToInputs = () => {
    document.getElementById("artistName").value = artist2Name;
    document.getElementById("artistPic").value = artist2Pic;
    document.getElementById("artistLink").value = artist2Link;
}

const addArtistRow3ToInputs = () => {
    document.getElementById("artistName").value = artist3Name;
    document.getElementById("artistPic").value = artist3Pic;
    document.getElementById("artistLink").value = artist3Link;
}

const addArtistRow4ToInputs = () => {
    document.getElementById("artistName").value = artist4Name;
    document.getElementById("artistPic").value = artist4Pic;
    document.getElementById("artistLink").value = artist4Link;
}

const addArtistRow5ToInputs = () => {
    document.getElementById("artistName").value = artist5Name;
    document.getElementById("artistPic").value = artist5Pic;
    document.getElementById("artistLink").value = artist5Link;
}



const editArtistRow1ToInputs = () => {
    console.log("editing for 1")
    document.getElementById("editArtistName").value = artist1Name;
    document.getElementById("editArtistPic").value = artist1Pic;
    document.getElementById("editArtistLink").value = artist1Link;
}

const editArtistRow2ToInputs = () => {
    document.getElementById("editArtistName").value = artist2Name;
    document.getElementById("editArtistPic").value = artist2Pic;
    document.getElementById("editArtistLink").value = artist2Link;
}

const editArtistRow3ToInputs = () => {
    document.getElementById("editArtistName").value = artist3Name;
    document.getElementById("editArtistPic").value = artist3Pic;
    document.getElementById("editArtistLink").value = artist3Link;
}

const editArtistRow4ToInputs = () => {
    document.getElementById("editArtistName").value = artist4Name;
    document.getElementById("editArtistPic").value = artist4Pic;
    document.getElementById("editArtistLink").value = artist4Link;
}

const editArtistRow5ToInputs = () => {
    document.getElementById("editArtistName").value = artist5Name;
    document.getElementById("editArtistPic").value = artist5Pic;
    document.getElementById("editArtistLink").value = artist5Link;
<<<<<<< HEAD
}
=======
}
>>>>>>> 3072cb88137d4a42dd8ca5b023ced0d99e2b2d61
