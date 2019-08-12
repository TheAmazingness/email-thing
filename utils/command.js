const command = () => {
  if (JSON.parse(localStorage.getItem('recognition'))) {
    return new Promise(resolve => {
      // let sr = new (SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
      let sr = new webkitSpeechRecognition();
      sr.lang = 'en-US';
      sr.start();
      sr.onresult = e => {
        sr.stop();
        resolve(e.results[0][0].transcript);
      };
    });
  }
};

export default command;