// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import FontSize from './components/FontSize';
import HelpEmail from './components/HelpEmail';
import TextToSpeech from './components/TextToSpeech';
import VoiceEmail from './components/VoiceEmail';
import VoiceRecognition from './components/VoiceRecognition';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  style = theme => ({
    button: {
      fontSize: FONT_SIZE ? '24pt' : '16pt',
      padding: theme.spacing.unit
    },
    canned: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    icon: {
      fontSize: FONT_SIZE ? '30pt' : '20pt'
    },
    textCenter: {
      textAlign: 'center'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// SettingsBody Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SettingsBody Component//
class SettingsBody extends React.Component {
  /** render */
  render() {
    const { classes } = this.props;
    return (
      <div>
        <br />
        <Divider />
        <br />
        <Grid container spacing={ 8 }>
          <TextToSpeech />
          <VoiceRecognition />
        </Grid>
        <br />
        <br />
        <Grid container spacing={ 8 }>
          <VoiceEmail />
          <FontSize />
        </Grid>
        <br />
        <br />
        <Grid container spacing={ 8 }>
          <HelpEmail />
          <Grid className={ `${ classes.textCenter } ${ classes.canned }` } item sm={ 6 }>
            <Button color='primary' onClick={ () => this.props.setState({ open: true }) } variant='contained'>
              <Icon className={ classes.icon }>add_comment</Icon>
              &nbsp;
              <Typography className={ classes.button } variant='inherit'>Edit Canned Responses</Typography>
            </Button>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
      </div>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// SettingsBody Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SettingsBody Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(SettingsBody);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //