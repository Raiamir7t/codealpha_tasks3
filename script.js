// Demo playlist (replace with your own songs and audio files)
const playlist = [
    {
        title: "Dreams",
        artist: "Fleetwood Mac",
        src: "songs/dreams.mp3",
        duration: "4:17"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "songs/blinding_lights.mp3",
        duration: "3:20"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "songs/shape_of_you.mp3",
        duration: "3:53"
    }
];

let currentSong = 0;
let isPlaying = false;
let autoplay = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const playlistList = document.getElementById('playlist-list');
const autoplayCheckbox = document.getElementById('autoplay');

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    durationEl.textContent = song.duration;
    highlightPlaylist(index);
}

function highlightPlaylist(index) {
    Array.from(playlistList.children).forEach((li, i) => {
        li.classList.toggle('active', i === index);
    });
}

function playSong() {
    audio.play();
    isPlaying = true;
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
}

function nextSong() {
    currentSong = (currentSong + 1) % playlist.length;
    loadSong(currentSong);
    if (isPlaying || autoplay) playSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + playlist.length) % playlist.length;
    loadSong(currentSong);
    if (isPlaying || autoplay) playSong();
}

playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('ended', () => {
    if (autoplay) {
        nextSong();
    } else {
        isPlaying = false;
    }
});

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

autoplayCheckbox.addEventListener('change', () => {
    autoplay = autoplayCheckbox.checked;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Render playlist
playlist.forEach((song, i) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener('click', () => {
        currentSong = i;
        loadSong(currentSong);
        playSong();
    });
    playlistList.appendChild(li);
});

// Initial load
loadSong(currentSong);
