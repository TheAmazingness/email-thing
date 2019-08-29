const voiceEmail = () => {
  return JSON.parse(localStorage.getItem('voiceEmail')) ? new Promise(resolve => {
    // let sr = new (SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
    let sr = new webkitSpeechRecognition();
    sr.lang = 'en-US';
    sr.continuous = true;
    sr.start();
    sr.onresult = e => {
      resolve(e.results[0][0].transcript);
    };
  }) : '';
};

export default voiceEmail;