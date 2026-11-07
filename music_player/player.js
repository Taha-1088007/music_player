const audio= document.querySelector("#audio-player");
const filePicker = document.querySelector("#file-picker");
const playButton = document.querySelector("#play");
const progress = document.querySelector("#progress");
const volume = document.querySelector("#volume");
const songTitle = document.querySelector("#song-title");

// Choose mp3 file
filePicker.addEventListener("change", () =>
{
    const file = filePicker.files[0];

    if (!file) return;

    audio.src = URL.createObjectURL(file);
    songTitle.textContent = file.name;

    audio.play();
    playButton.innerHTML = '<img src="static/images/pause.svg" alt="Pause">';
});
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
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", () => {
    audio.volume =  Number(volume.value);

});