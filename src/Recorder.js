const VEMAIL = JSON.parse(window.localStorage.getItem('vemail'));

export default class Recorder {
  constructor() {
    if (VEMAIL) {
      this.isRecording = false;
      this.result = new Promise((resolve) => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          this.mediaRecorder.addEventListener('dataavailable', (event) => {
            this.audioChunks.push(event.data);
          });
          this.mediaRecorder.addEventListener('stop', () => {
            let audioBlob = new Blob(this.audioChunks);
            let reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        });
      });
    }
  }

  start() {
    if (VEMAIL && !this.isRecording) {
      this.mediaRecorder.start();
      this.isRecording = true;
      console.log('Starting recording...');
    }
  }

  stop() {
    if (VEMAIL && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
      console.log('Stopping recording...');
    }
  }

  get base64Recording() {
    return this.result;
  }
}