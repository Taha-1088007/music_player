const audio= document.querySelector("#audio-player");
const chooseFolderButton = document.querySelector("#choose-folder");
const playButton = document.querySelector("#play");
const progress = document.querySelector("#progress");
const volume = document.querySelector("#volume");
const songTitle = document.querySelector("#song-title");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next")

let songs = [];
let currentSong = 0;

// Choose music folder
chooseFolderButton.addEventListener("click", async () => {
    const folder = await window.musicAPI.chooseFolder();

    if (!folder)return;

    songs = await window.musicAPI.getFiles();
    currentSong = 0;

    if (songs.length > 0){
        playSong(currentSong);
    }else{
        songTitle.textContent = "Geen Mp3 bestanden gevonden"
    }
})

// play and pause
playButton.addEventListener("click", () => {
    if (!audio.src) return;

    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<img src="static/images/pause.svg" alt="Pause">';
    } else {
        audio.pause();
        playButton.innerHTML = '<img src="static/images/play.svg" alt="Play">';
    }
});

// Previous song
previousButton.addEventListener("click", () => {
    if (songs.length === 0) return;

    let previousSong = currentSong -1;

    if (previousSong < 0) {
        previousSong = songs.length - 1;
    }

    playSong(previousSong);
})

nextButton.addEventListener("click", () =>{
    if (songs.length === 0) return;

    let nextSong = currentSong + 1;

    if(nextSong >= songs.length) {
        nextSong = 0;
    }
    playSong(nextSong)
})

progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume =  Number(volume.value);

});

function playSong(index) {
    if (songs.length === 0) return;

    currentSong = index;
    audio.src = songs[currentSong].url;
    songTitle.textContent = songs[currentSong].name;

    audio.play();
    playButton.innerHTML = '<img src="static/images/pause.svg" alt ="Pause">';

}