// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Voice from '@cheapundies/responsive-voice';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const TEXT_TO_SPEECH = JSON.parse(window.localStorage.getItem('tts')) || false;
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

export default class TTS {
  /** constructor
   * @param text
   */
  constructor(text) {
    this.speaking = Voice.isPlaying();
    this.text = text;
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** speak */
  speak() {
    if (TEXT_TO_SPEECH) {
      if (!this.speaking) {
        Voice.speak(this.text, 'US English Female', { rate: 0.75, onend: () => this.speaking = false });
        this.speaking = true;
      } else {
        Voice.cancel();
        this.speaking = false;
      }
    }
  }
  // speak ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** status */
  static get status() {
    return TEXT_TO_SPEECH;
  }
  // static get status ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}