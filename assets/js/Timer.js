export default class Timer {
  constructor(element) {
    this.timer = element;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.started = false;

    this.toggleButton = this.timer.querySelector('.toggle');
    this.toggleIcon = this.toggleButton.querySelector('img');
    this.time = this.timer.querySelector('.time');

    this.init();
  }

  init = () => {
    this.toggleButton.addEventListener('click', () => {
      this.toggleTimer();
    });
  }

  toggleTimer = () => {
    this.started = !this.started;
    let toggleIcon = this.started ? 'stop' : 'play';
    this.toggleIcon.src = `assets/icons/${toggleIcon}.svg`;

    if (this.started) {
      window.timer = setInterval(this.timerCycle, 1000);
    } else {
      this.resetTimer();
    }
  }

  timerCycle = () => {
    this.hours = parseInt(this.hours);
    this.minutes = parseInt(this.minutes);
    this.seconds = parseInt(this.seconds);

    // Update time units
    this.seconds = this.seconds + 1;
    if (this.seconds === 60) {
      this.minutes = this.minutes + 1;
      this.seconds = 0;
    }

    if (this.minutes === 60) {
      this.hours = this.hours + 1;
      this.minutes = 0;
      this.seconds = 0;
    }

    // Pad time units with a leading zero
    let units = ['seconds', 'minutes', 'hours'];
    units.forEach((element) => {
      this[element] = String(this[element]).padStart(2, '0');
    });

    this.time.innerHTML = `${this.hours}:${this.minutes}:${this.seconds}`;
  }

  resetTimer = () => {
    window.clearInterval(window.timer);

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.timer.querySelector('.time').innerHTML = '00:00:00';
  }
}
