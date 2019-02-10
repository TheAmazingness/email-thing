// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Canned from './Canned';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  TEXT_TO_SPEECH = JSON.parse(window.localStorage.getItem('tts')) || false,
  VOICE_COMMAND = JSON.parse(window.localStorage.getItem('recognition')) || false,
  VOICE_EMAIL = JSON.parse(window.localStorage.getItem('voiceEmail')) || false,
  style = theme => ({
    body: {
      height: '100%',
      padding: theme.spacing.unit * 10,
      width: '100%'
    },
    btnIcon: {
      fontSize: FONT_SIZE ? '30pt' : '20pt'
    },
    button: {
      fontSize: FONT_SIZE ? '24pt' : '16pt',
      padding: theme.spacing.unit
    },
    canned: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    close: {
      display: 'grid'
    },
    dialog: {
      padding: theme.spacing.unit * 10,
      zIndex: 2000
    },
    iconButton: {
      margin: 'auto'
    },
    iconLarge: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
    },
    input: {
      fontSize: FONT_SIZE ? '30pt' : '24pt'
    },
    label: {
      fontSize: FONT_SIZE ? '36pt' : '24pt'
    },
    textCenter: {
      textAlign: 'center'
    },
    title: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    titleBox: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Settings Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Settings Component//
class Settings extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      fontSize: FONT_SIZE,
      open: false,
      recognition: VOICE_COMMAND,
      tts: TEXT_TO_SPEECH,
      voiceEmail: VOICE_EMAIL
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={ classes.dialog }
        fullScreen
        onClose={ () => this.props.close() }
        onEntered={ () => new TTS('Settings').speak() }
        open={ this.props.open }
      >
        <div className={ classes.body }>
          <Grid container spacing={ 8 }>
            <Grid className={ classes.titleBox } item sm={ 11 }>
              <Typography className={ classes.title }>Settings</Typography>
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
          { /* Text-to-Speech | Voice Recognition ~~~~ */ }
          <Grid container spacing={ 8 }>
            <Grid className={ classes.textCenter } item sm={ 6 }>
              <FormControlLabel
                classes={ { label: classes.label } }
                control={
                  <Switch
                    checked={ this.state.tts }
                    onChange={() => {
                      window.localStorage.setItem('tts', !this.state.tts);
                      new TTS(`Text to speech: ${ !this.state.tts ? 'enabled' : 'disabled' }`).speak();
                      this.setState(state => { return { tts: !state.tts } });
                    } }
                  />
                }
                label='Text-to-Speech'
                labelPlacement='top'
              />
            </Grid>
            <Grid className={ classes.textCenter } item sm={ 6 }>
              <FormControlLabel
                classes={ { label: classes.label } }
                control={
                  <Switch
                    checked={ this.state.recognition }
                    onChange={() => {
                      window.localStorage.setItem('recognition', !this.state.recognition);
                      new TTS(`Voice recognition: ${ !this.state.recognition ? 'enabled' : 'disabled' }`).speak();
                      this.setState(state => { return { recognition: !state.recognition } });
                    } }
                  />
                }
                label='Voice Recognition'
                labelPlacement='top'
              />
            </Grid>
          </Grid>
          { /* Text-to-Speech | Voice Recognition ~~~~ */ }
          <br />
          <br />
          { /* Voice Email | Font Size ~~~~~~~~~~~~~~~ */ }
          <Grid container spacing={ 8 }>
            <Grid className={ classes.textCenter } item sm={ 6 }>
              <FormControlLabel
                classes={ { label: classes.label } }
                control={
                  <Switch
                    checked={ this.state.voiceEmail }
                    onChange={() => {
                      window.localStorage.setItem('voiceEmail', !this.state.voiceEmail);
                      new TTS(`Voice emails: ${ !this.state.voiceEmail ? 'enabled' : 'disabled' }`).speak();
                      this.setState(state => { return { voiceEmail: !state.voiceEmail } });
                    } }
                  />
                }
                label='Voice Emails'
                labelPlacement='top'
              />
            </Grid>
            <Grid className={ classes.textCenter } item sm={ 6 }>
              <FormControlLabel
                classes={ { label: classes.label } }
                control={
                  <Switch
                    checked={ this.state.fontSize }
                    onChange={() => {
                      window.localStorage.setItem('fontSize', !this.state.fontSize);
                      new TTS(`Font size: ${ !this.state.tts ? 'enabled' : 'disabled' }`).speak();
                      this.setState(state => { return { fontSize: !state.fontSize } });
                    } }
                  />
                }
                label='Larger Font Size'
                labelPlacement='top'
              />
            </Grid>
          </Grid>
          { /* Voice Email | Font Size ~~~~~~~~~~~~~~~ */ }
          <br />
          <br />
          { /* Help Email | Canned Responses ~~~~~~~~~ */ }
          <Grid container spacing={ 8 }>
            <Grid className={ classes.textCenter } item sm={ 6 }>
              <Typography className={ classes.label }>Help Email</Typography>
              <br />
              <TextField
                InputProps={ { style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Help Email'
                onClick={ () => new TTS('Help email').speak() }
                placeholder='Help Email'
                type='email'
                variant='outlined'
              />
            </Grid>
            <Grid className={ `${ classes.textCenter } ${ classes.canned }` } item sm={ 6 }>
              <Button color='primary' onClick={ () => this.setState({ open: true }) } variant='contained'>
                <Icon className={ classes.icon }>add_comment</Icon>
                &nbsp;
                <Typography className={ classes.button } variant='inherit'>Edit Canned Responses</Typography>
              </Button>
            </Grid>
          </Grid>
          { /* Help Email | Canned Responses ~~~~~~~~~ */ }
          <br />
          <Divider />
          <br />
          <Button
            color='secondary'
            onClick={ () => {
              new TTS('Apply new settings').speak();
              window.location.reload();
            } }
            variant='contained'
          >
            <Icon className={ classes.icon }>check</Icon>
            &nbsp;
            <Typography className={ classes.button } variant='inherit'>Apply</Typography>
          </Button>
          <br />
          <br />
          <br />
        </div>
        <Canned close={ () => this.setState({ open: false }) } open={ this.state.open } />
      </Dialog>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Settings Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Settings Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(Settings);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //