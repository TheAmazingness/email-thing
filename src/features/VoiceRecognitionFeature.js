// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import annyang from 'annyang';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// VoiceRecognitionFeature ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VoiceRecognitionFeature //
export default class VoiceRecognitionFeature {
  constructor() {
    annyang.start();
    annyang.addCommands({
      'test': VoiceRecognitionFeature.read
    });
  }

  start = () => {
    new TTS('Voice command').speak();
  };

  static read() {
    annyang.abort();
    document.dispatchEvent(new CustomEvent('read'));
  };
}
// VoiceRecognitionFeature ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ VoiceRecognitionFeature //