// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import MailHeader from './mail/MailHeader';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  CANNED = JSON.parse(window.localStorage.getItem('canned')) || {},
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  style = theme => ({
    cannedBtn: {
      display: 'inline-block',
      padding: `0 ${ theme.spacing.unit }px`
    },
    center: {
      textAlign: 'center'
    },
    dialog: {
      padding: theme.spacing.unit * 10,
      zIndex: 2000
    },
    icon: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    iconLarge: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
    },
    mailBody: {
      height: '100%',
      padding: theme.spacing.unit * 10,
      width: '100%'
    },
    pre: {
      fontFamily: 'Roboto',
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    quickReply: {
      alignItems: 'flex-start',
      display: 'flex'
    },
    textLarge: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    verticalCenter: {
      display: 'grid'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

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

  /** componentDidMount */
  componentDidMount() {
    let jsx = [];
    for (const icon in CANNED) {
      if (CANNED.hasOwnProperty(icon)) {
        jsx.push((
          <div className={ this.props.classes.cannedBtn } key={ icon } >
            <IconButton color='primary' onClick={ () => new TTS('Quick Reply').speak() }>
              <Icon className={ this.props.classes.iconLarge }>{ icon }</Icon>
            </IconButton>
          </div>
        ));
      }
    }
    this.setState({ canned: jsx })
  }
  // componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

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
        <div className={ classes.mailBody }>
          <MailHeader close={ () => this.props.close() } from={ this.props.from } subject={ this.props.subject } />
          <br />
          <Divider />
          <br />
          <pre className={ classes.pre } id='pre-mail' />
          <div id='div-mail' />
          <br />
          <Divider />
          <br />
          <div>
            <Typography
              className={ `${ classes.textLarge } ${ classes.quickReply }` }
              onClick={ () => new TTS('Quick Reply').speak() }
            >
              <Icon className={ classes.icon }>fast_forward</Icon>
              &nbsp;
              Quick Reply
            </Typography>
            <br />
            <br />
            <div className={ classes.center }>
              { this.state.canned }
            </div>
          </div>
          <br />
          <br />
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