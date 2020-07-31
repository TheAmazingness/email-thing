// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import annyang from 'annyang';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// VoiceRecognitionFeature ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VoiceRecognitionFeature //
export default class VoiceRecognitionFeature {
  constructor(type) {
    if (type === 'recognition') {
      annyang.isListening() && annyang.abort();
      new TTS('Voice command').speak();
      annyang.start();
      annyang.addCommands({
        'read email': VoiceRecognitionFeature.read,
        'write': VoiceRecognitionFeature.compose
      });
    } else if (type === 'vemail') {
      new TTS('Voice email').speak();
      annyang.start();
      annyang.addCallback('result', phrase => document.dispatchEvent(new CustomEvent('vemail', { phrase: phrase })));
    }
  }

  static read() {
    annyang.abort();
    document.dispatchEvent(new CustomEvent('read'));
  }

  static compose() {
    annyang.abort();
    document.dispatchEvent(new CustomEvent('compose'));
  }
}
// VoiceRecognitionFeature ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VoiceRecognitionFeature //