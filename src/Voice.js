import ResponsiveVoice from '@cheapundies/responsive-voice';

const SPEAK = JSON.parse(window.localStorage.getItem('tts'));

// Need a better solution
export class Voice {
  constructor(text) {
    this.text = text;
    if (!window.localStorage.getItem('is_tts')) {
      window.localStorage.setItem('is_tts', false);
    }
  }

  onEnd() {
    window.localStorage.setItem('is_tts', this.isSpeaking);
  }

  activate() {
    if (SPEAK) {
      this.isSpeaking = JSON.parse(window.localStorage.getItem('is_tts'));
      this.isSpeaking && ResponsiveVoice.cancel();
      !this.isSpeaking && ResponsiveVoice.speak(this.text, 'US English Female', { rate: 0.75, onend: () => this.onEnd() });
      window.localStorage.setItem('is_tts', !this.isSpeaking);
    }
  }
}