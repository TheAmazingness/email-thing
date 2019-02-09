// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import TTS from "./tts";
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  TEXT_TO_SPEECH = JSON.parse(window.localStorage.getItem('tts')) || false,
  VOICE_COMMAND = JSON.parse(window.localStorage.getItem('recognition')) || false,
  style = theme => ({
    body: {
      height: '100%',
      padding: theme.spacing.unit * 10,
      width: '100%'
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
      tts: TEXT_TO_SPEECH
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
          <br />
          <Grid container spacing={ 8 }>
            <Grid item sm={ 6 }>
              {/*<Switch*/}
                {/*checked={ this.state.tts }*/}
                {/*onChange={() => {*/}
                  {/*window.localStorage.setItem('tts', !this.state.tts);*/}
                  {/*this.setState(state => { return { tts: !state.tts } });*/}
                {/*} }*/}
              {/*/>*/}
            </Grid>
            <Grid item sm={ 6 }>

            </Grid>
          </Grid>
        </div>
      </Dialog>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Settings Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Settings Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(Settings);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //