const VEMAIL = JSON.parse(window.localStorage.getItem('vemail'));

export default class Recorder {
  constructor() {
    if (VEMAIL) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
        this.mediaRecorder.addEventListener('dataavailable', (event) => {
          this.audioChunks.push(event.data);
        });
        this.mediaRecorder.addEventListener('stop', () => {
          let audioBlob = new Blob(this.audioChunks);
          this.audioUrl = URL.createObjectURL(audioBlob);
        });
      });
    }
  }

  start() {
    if (VEMAIL) {
      this.mediaRecorder.start();
      console.log('Starting recording...');
    }
  }

  stop() {
    if (VEMAIL) {
      this.mediaRecorder.stop();
      console.log('Stopping recording...');
    }
  }
  
  get recording() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(new Audio(this.audioUrl)), 100);
    });
  }
}