console.log("Welcome to Mortify");

// Initialize the variables
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let currentSongCover = document.getElementById('currentSongCover');
let currentSongName = document.getElementById('currentSongName');
let myProgressBar = document.getElementById('myProgressBar');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let audioElement = new Audio('Songs/1.mp3');
let songs = [
    { songName: "Abstract Fashion Pop", filePath: "Songs/1.mp3", coverPath: "Covers/Cover1.jpg" },
    { songName: "A Call to the Soul", filePath: "Songs/2.mp3", coverPath: "Covers/Cover2.jpg" },
    { songName: "Ambient Classical Guitar", filePath: "Songs/3.mp3", coverPath: "Covers/Cover3.jpg" },
    { songName: "A Small Miracle", filePath: "Songs/4.mp3", coverPath: "Covers/Cover4.jpg" },
    { songName: "Futuristic Beat", filePath: "Songs/5.mp3", coverPath: "Covers/Cover5.jpg" },
    { songName: "Modern Vlog", filePath: "Songs/6.mp3", coverPath: "Covers/Cover1.jpg" },
    { songName: "My Universe", filePath: "Songs/7.mp3", coverPath: "Covers/Cover2.jpg" },
    { songName: "Risk", filePath: "Songs/8.mp3", coverPath: "Covers/Cover3.jpg" },
    { songName: "Smoke", filePath: "Songs/9.mp3", coverPath: "Covers/Cover4.jpg" },
    { songName: "Summer Walk", filePath: "Songs/10.mp3", coverPath: "Covers/Cover5.jpg" },
]

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target.classList.contains('fa-play-circle')) {
            if (songIndex == e.target.id) {
                makeAllPlay();
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
            }
            else {
                makeAllPlay();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove('fa-play-circle');
                e.target.classList.add('fa-pause-circle');
                audioElement.src = songs[songIndex].filePath;
                audioElement.currentTime = 0;
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                currentSongCover.src = songs[songIndex].coverPath;
                currentSongName.innerText = songs[songIndex].songName;
            }
        }
        else {
            makeAllPlay();
            // songIndex = parseInt(e.target.id);
            // e.target.classList.remove('fa-pause-circle');
            // e.target.classList.add('fa-play-circle');
            // audioElement.src = songs[songIndex].filePath;
            // audioElement.currentTime = 0;
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            // currentSongCover.src = songs[songIndex].coverPath;
            // currentSongName.innerText = songs[songIndex].songName;
        }
    })
})

songItem.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle pause/play click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

previous.addEventListener('click', () => {
    if (audioElement.currentTime > 5) {
        audioElement.currentTime = 0;
    }
    else {
        if (songIndex == 0) {
            songIndex = 9;
        }
        else {
            songIndex--;
        }
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        currentSongCover.src = songs[songIndex].coverPath;
        currentSongName.innerText = songs[songIndex].songName;
    }
})

next.addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex++;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    currentSongCover.src = songs[songIndex].coverPath;
    currentSongName.innerText = songs[songIndex].songName;
})