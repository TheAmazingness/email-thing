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
import EmailFilter from './components/EmailFilter';
import FontSize from './components/FontSize';
import HelpEmail from './components/HelpEmail';
import TextToSpeech from './components/TextToSpeech';
import VoiceEmail from './components/VoiceEmail';
import VoiceRecognition from './components/VoiceRecognition';
import { style } from './../style';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

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
        {
          !this.props.client && (
            <Grid container spacing={ 8 }>
              <HelpEmail />
              <Grid className={ `${ classes.textAlignCenter } ${ classes.verticalCenterFlex }` } item sm={ 6 }>
                <Button color='primary' onClick={ () => this.props.setState({ openCanned: true }) } variant='contained'>
                  <Icon className={ classes.fontSize30_20 }>add_comment</Icon>
                  &nbsp;
                  <Typography className={ classes.button } variant='inherit'>Edit Canned Responses</Typography>
                </Button>
              </Grid>
            </Grid>
          )
        }
        <br />
        <br />
        {
          !this.props.client && (
            <Grid container spacing={ 8 }>
              <Grid className={ `${ classes.textAlignCenter } ${ classes.verticalCenterFlex }` } item sm={ 6 }>
                <Button color='primary' onClick={ () => this.props.setState({ openBuddy: true }) } variant='contained'>
                  <Icon className={ classes.fontSize30_20 }>person_add</Icon>
                  &nbsp;
                  <Typography className={ classes.button } variant='inherit'>Edit Buddy List</Typography>
                </Button>
              </Grid>
              <EmailFilter />
            </Grid>
          )
        }
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