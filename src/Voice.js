import Voice from '@cheapundies/responsive-voice';

const SPEAK = JSON.parse(window.localStorage.getItem('tts'));
let cancel = false;

export function speak(text) {
  if (SPEAK) {
    cancel = !cancel;
    cancel && Voice.cancel();
    !cancel && Voice.speak(text, 'US English Female', { rate: 0.75 });
  }
}