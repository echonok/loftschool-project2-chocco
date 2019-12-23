(() => {
  let video;
  let durationControl;
  let soundControl;
  let intervalId;

  const addEvents = () => {
    
    video = document.getElementById('player');

    video.addEventListener('click', playStop);

    let playButtons = document.querySelectorAll(".play");
    playButtons.forEach((elem) => elem.addEventListener('click', playStop));

    let micControl = document.getElementById("mic");
    micControl.addEventListener('click', soundOf);

    durationControl = document.getElementById('durationLevel');
    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('onmousemove', setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval);
    durationControl.min = 0;
    durationControl.value = 0;

    soundControl = document.getElementById('micLevel');
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    soundControl.min = 0;
    soundControl.max = 10;
    soundControl.value = soundControl.max;
  };

  const playStop = () => {
    const playButtons = document.querySelectorAll('.video__player-img');
    playButtons.forEach(elem => elem.classList.toggle('video__player-img--active'));
    
    const PlayPauseButtons = document.querySelectorAll('.duration__img');
    PlayPauseButtons.forEach(elem => elem.classList.toggle('duration__img--hidden'));

    durationControl.max = video.duration;
    if (video.paused) {
      video.play();
      intervalId = setInterval(updateDuration, 1);
    } else {
      video.pause();
      clearInterval(intervalId);
    }
  }

  const soundOf = () => {
    if (video.volume === 0) {
      video.volume = soundLevel;
      soundControl.value = soundLevel * 10;
    } else {
      soundLevel = video.volume;
      video.volume = 0;
      soundControl.value = 0;
    }
  }

  const stopInterval = () => {
    clearInterval(intervalId);
  }

  const setVideoDuration = () => {
    video.currentTime = durationControl.value;
    intervalId = setInterval(updateDuration, 1000 / 66);
  }

  const changeSoundVolume = () => {
    video.volume = soundControl.value / 10;
  }

  const updateDuration = () => {
    durationControl.value = video.currentTime;
  }

  addEvents();

})()

