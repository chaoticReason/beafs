
/*//////////// u t i l s ////////*/

function convertTime(seconds){
    seconds = Math.round(seconds);
    var min = Math.floor(seconds / 60);
    var sec = seconds % 60;

    if(min < 10)
      min = "0" + min;
    if(sec < 10)
      sec = "0" + sec;

    return min + ":" + sec;
}


/*/////////// e l e m e n t s //////////*/
function get() {
  this.title = document.getElementById("song-title");
  this.artist = document.getElementById("artist");
  this.next = document.getElementById("next");
  this.prev = document.getElementById("prev");
  this.playPause = document.getElementById("play");
  this.loop = document.getElementById("repeat");
  this.like = document.getElementById("like");
  this.pl = document.getElementById("playlist-btn");
  this.plBox = document.getElementById("playlist-box");
  this.cov = document.getElementById("longforcover");
  this.h1 = document.getElementById("fortitle");
  this.h2 = document.getElementById("forartist");
  //this.lyr = document.getElementById("forlyrics");

  this.playPauseImg = document.getElementById("play-img");
  this.loopImg = document.getElementById("repeat-img");
  this.likeImg = document.getElementById("like-img");
  this.plImg = document.getElementById("playlist-btn-img");

  this.seekbarContainer = document.getElementById("progress");
  this.seekbar = document.getElementById("progress-bar");
  this.seekbarPassed = document.getElementById("progress-passed");
  this.time = document.getElementById("time-passed");
  this.duration = document.getElementById("time-remained");
};

function actions() {
  this.audioFile.onended = () => this.pressNext();
  this.playPause.onclick = () => this.togglePlayPause();
  this.like.onclick = () => this.toggleLike();
  this.next.onclick = () => this.pressNext();
  this.prev.onclick = () => this.pressPrev();
  this.loop.onclick = () => this.toggleLoop();
  this.pl.onclick = () => this.togglePl();
  this.audioFile.ontimeupdate = () => this.timeUpdate();
  this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
  this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
  this.seekbar.max = this.audioFile.duration;
  this.duration.innerText = convertTime(this.audioFile.duration);
};

function createAudio(){
  this.audioFile = new Audio();
}
/*//////////////// p l a y e r ///////////////////*/

let Player = {
  audioData: audios,
  audio: {},
  currentPlaying: 0,
  isPlaying: false,
  isLoop: false,
  isPl: false,

  start: function() {
    get.call(this);
    createAudio.call(this);
    this.update();
  },

  update: function() {
    this.audio = this.audioData[this.currentPlaying];
    this.title.innerText = this.audio.title;
    this.artist.innerText = this.audio.artist;
    this.cov.src = this.audio.cover;
    this.h1.textContent = this.audio.title;
    this.h2.textContent = this.audio.artist;
    //this.lyr.innerText = this.audio.lyrics;
    this.setLike(this.audio.like);

    this.audioFile.src = this.audio.file;

    this.audioFile.onloadeddata = () => {
      actions.call(this);
      this.audioFile.loop = this.isLoop;
    };
  },

  setLike: function() {
    if(this.audio.like)
      this.likeImg.src = SRC_HEART_IMG;
    else {
      this.likeImg.src = SRC_HEART_WHITE_IMG;
    }
  },
  toggleLike: function() {
    if (this.audio.like) {
      this.likeImg.src = SRC_HEART_WHITE_IMG;
      this.audio.like = false;
    } else {
      this.likeImg.src = SRC_HEART_IMG;
      this.audio.like = true;
    }
  },
  togglePlayPause: function() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  play: function() {
    this.isPlaying = true;
    this.audioFile.play();
    this.playPauseImg.src = SRC_PAUSE_WHITE_IMG;
  },

  pause: function() {
    this.isPlaying = false;
    this.audioFile.pause();
    this.playPauseImg.src = SRC_PLAY_WHITE_IMG;
  },
  toggleLoop: function() {
    if (this.audioFile.loop) {
      this.loopImg.src = SRC_REPEAT_WHITE_IMG;
      this.isLoop = false;
      this.audioFile.loop = false;
    } else {
      this.loopImg.src = SRC_REPEAT_IMG;
      this.isLoop = true;
      this.audioFile.loop = true;
    }
  },
  pressNext: function() {
    this.currentPlaying++;
    this.tumbler(); //check if currentPlaying -1 or max
    this.update();
    this.play();
  },
  pressPrev: function() {
    this.currentPlaying--;
    this.tumbler();
    this.update();
    this.play();
  },
  togglePl: function(){
    if(this.isPl){
      this.plImg.src = SRC_PL_IMG;
      this.plBox.style.visibility = "hidden";
      this.isPl = false;
    }else {
      this.plImg.src = SRC_PL_WHITE_IMG;
      this.plBox.style.visibility = "visible";
      this.isPl = true;
    }
  },
  setSeek: function(value) {
    this.audioFile.currentTime = value;
  },

  timeUpdate: function() {
    this.time.innerText = convertTime(this.audioFile.currentTime);
    this.seekbar.value = this.audioFile.currentTime;
    let w = this.seekbar.value / this.seekbar.max;
    w *= this.seekbarContainer.clientWidth;
    w += 5;
    let str = "width:" + Math.round(w) + "px";
    this.seekbarPassed.setAttribute("style",str);
  },

  tumbler: function() {
    if (this.currentPlaying == this.audioData.length)
      this.currentPlaying = 0;
    else if (this.currentPlaying == -1)
      this.currentPlaying = this.audioData.length - 1;
  }
};

/*////// s t a r t //////////*/
function start() {
  var player = Object.create(Player);
  player.start();
};

window.onload = start();
