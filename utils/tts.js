const tts = phrase => {
  if (JSON.parse(localStorage.getItem('tts'))) {
    let utterance = new SpeechSynthesisUtterance(phrase);
    utterance.voice = speechSynthesis.getVoices()[48];
    speechSynthesis.speak(utterance);
  }
};

export default tts;