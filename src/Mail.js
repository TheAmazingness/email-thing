// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  style = theme => ({
    btnText: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    close: {
      display: 'grid',
      textAlign: 'right'
    },
    from: {
      fontSize: FONT_SIZE ? '30pt' : '20pt'
    },
    dialog: {
      padding: theme.spacing.unit * 10,
      zIndex: 2000
    },
    help: {
      display: 'grid',
      textAlign: 'center'
    },
    iconButton: {
      margin: 'auto'
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
    read: {
      padding: theme.spacing.unit * 5
    },
    readEmail: {
      textAlign: 'center'
    },
    subject: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Mail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mail Component//
class Mail extends React.Component {
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
          <Grid container spacing={ 8 }>
            <Grid item sm={ 5 }>
              <Typography className={ classes.from }  onClick={ () => new TTS(this.props.from).speak() }>
                From: { this.props.from }
              </Typography>
              <Typography className={ classes.subject } onClick={ () => new TTS(this.props.subject).speak() }>
                { this.props.subject }
                </Typography>
            </Grid>
            <Grid className={ classes.readEmail } item sm={ 5 }>
              <Button
                className={ classes.read }
                color='secondary'
                onClick={ () => new TTS(document.getElementById(this.id).innerText).speak() }
                size='large'
                variant='contained'
              >
                <Icon className={ classes.icon }>record_voice_over</Icon>
                &emsp;
                <Typography className={ classes.btnText } color='inherit'>Read Email</Typography>
              </Button>
            </Grid>
            <Grid className={ classes.help } item sm={ 1 }>
              <IconButton className={ classes.iconButton } color='secondary' onClick={ () => new TTS('Help').speak() }>
                <Icon className={ classes.iconLarge }>help</Icon>
              </IconButton>
            </Grid>
            <Grid className={ classes.close } item sm={ 1 }>
              <IconButton className={ classes.iconButton } color='primary' onClick={ () => new TTS('Clothes').speak() }>
                <Icon className={ classes.iconLarge } onClick={ () => this.props.close() }>close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <pre className={ classes.pre } id='pre-mail' />
          <div id='div-mail' />
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