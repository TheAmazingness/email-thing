const handleTtsClick = () => {
  let text = !document.getElementsByClassName('mail-body')[0] ?
    window.getSelection().toString() :
    document.getElementsByClassName('mail-body')[0].contentWindow.getSelection();

  if (!speechSynthesis.speaking) {
    if (text.length === 0) {
      text = 'No text selected'; // TODO: Maybe fix if have time
    }

    let voice = 34;

    // Detect Chrome
    // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
      voice = 48;
    }

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = window.speechSynthesis.getVoices()[voice];
    utterance.rate = 0.8;

    window.speechSynthesis.speak(utterance);
  }
};

export default handleTtsClick;