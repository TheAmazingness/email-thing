const RECOGNITION = JSON.parse(window.localStorage.getItem('recognition'));

export default class Recognition {
  constructor() {
    this.message = '';
    if (RECOGNITION) {
      try {
        this.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new this.SpeechRecognition();
      } catch (e) {
        console.error(e);
        alert('Your browser does not support voice recognition.');
      }
    }
  }

  init() {
    if (RECOGNITION) {
      this.recognition.continuous = true;
      this.recognition.onresult = (e) => {
        let current = e.resultIndex;
        let transcript = e.results[current][0].transcript;
        this.message += transcript;
      };
    }
  }

  start() {
    if (RECOGNITION) {
      this.init();
      this.recognition.start();
      console.log('Starting voice recognition...');
    }
  }

  stop() {
    if (RECOGNITION) {
      this.recognition.stop();
      console.log('Stopping voice recognition...');
      return this.message;
    }
  }
}