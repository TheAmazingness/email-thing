const RECOGNITION = JSON.parse(window.localStorage.getItem('recognition'));

export default class Recognition {
  constructor() {
    this.message = '';
    this.isRecording = false;
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

  init(callback) {
    if (RECOGNITION) {
      this.recognition.continuous = true;
      this.recognition.onresult = (e) => {
        let current = e.resultIndex;
        let transcript = e.results[current][0].transcript;
        this.message += transcript;
        !!callback && callback();
      };
    }
  }

  start(callback) {
    if (RECOGNITION && !this.isRecording) {
      this.init(() => !!callback && callback());
      this.recognition.start();
      this.isRecording = true;
      console.log('Starting voice recognition...');
    }
  }

  stop() {
    if (RECOGNITION && this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
      console.log('Stopping voice recognition...');
      return this.message;
    }
  }

  get transcript() {
    return this.message;
  }

  set transcript(m) {
    this.message = m;
  }
}