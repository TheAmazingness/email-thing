// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import MailHeader from './mail/MailHeader';
import QuickReply from './mail/QuickReply';
import { style } from './style';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Mail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mail Component//
class Mail extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      canned: null
    }
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static getHTMLpart
   * @desc gets HTML or plain text part of an email
   * @param data
   * @returns { string }
   */
  static getHTMLPart(data) {
    if (typeof data === 'object') {
      for (let i = 0; i <= data.length; i++) {
        if (typeof data[i].parts === 'undefined') {
          if (data[i].mimeType === 'text/html') {
            return atob(data[i].body.data.replace(/_/g, '/').replace(/-/g, '+'));
          }
        } else {
          return this.enter(data[i].parts);
        }
      }
      return null;
    } else if (typeof data === 'string') {
      return atob(data.replace(/_/g, '/').replace(/-/g, '+'));
    }
  }
  // static getHTMLPart ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** enter */
  enter() {
    this.id = typeof this.props.data === 'string' ? 'pre-mail' : 'div-mail';
    document.getElementById(this.id).innerHTML = Mail.getHTMLPart(this.props.data);
    new TTS('Open email').speak();
  }
  // enter ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={ classes.dialog }
        fullScreen
        onClose={ () => this.props.close() }
        onEntered={ () => this.enter() }
        open={ this.props.open }
      >
        <div className={ classes.dialogBody }>
          <MailHeader close={ () => this.props.close() } from={ this.props.from } subject={ this.props.subject } />
          <br />
          <Divider />
          <br />
          <pre className={ `${ classes.pre } ${ classes.fontSize45_30 }` } id='pre-mail' />
          <div id='div-mail' />
          <br />
          <Divider />
          <QuickReply />
        </div>
      </Dialog>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Mail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mail Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(Mail);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //