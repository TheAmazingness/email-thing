import Voice from '@cheapundies/responsive-voice';

const SPEAK = true;

export function speak(text) {
  SPEAK && Voice.speak(text, 'US English Female', { rate: 0.75 });
}