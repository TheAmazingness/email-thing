// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import TTS from '../tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  style = theme => ({
    textAlignCenter: {
      textAlign: 'center'
    },
    from: {
      fontSize: FONT_SIZE ? '30pt' : '20pt'
    },
    icon: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    iconButton: {
      margin: 'auto'
    },
    iconLarge: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
    },
    read: {
      padding: theme.spacing.unit * 5
    },
    subject: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    textLarge: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    verticalCenterGrid: {
      display: 'verticalCenterFlex'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// MailHeader Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailHeader Component//
class MailHeader extends React.Component {
  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={ 8 }>
        <Grid item sm={ TTS.status ? 5 : 8 }>
          <Typography className={ classes.from }  onClick={ () => new TTS(this.props.from).speak() }>
            From: { this.props.from }
          </Typography>
          <Typography className={ classes.subject } onClick={ () => new TTS(this.props.subject).speak() }>
            { this.props.subject }
          </Typography>
        </Grid>
        {
          TTS.status && (
            <Grid className={ classes.textAlignCenter } item sm={ 5 }>
              <Button
                className={ classes.read }
                color='secondary'
                onClick={ () => new TTS(document.getElementById(this.id).innerText).speak() }
                size='large'
                variant='contained'
              >
                <Icon className={ classes.icon }>record_voice_over</Icon>
                &emsp;
                <Typography className={ classes.textLarge } color='inherit'>Read Email</Typography>
              </Button>
            </Grid>
          )
        }
        <Grid className={ classes.verticalCenterGrid } item sm={ TTS.status ? 1 : 2 }>
          <IconButton className={ classes.iconButton } color='secondary' onClick={ () => new TTS('Help').speak() }>
            <Icon className={ classes.iconLarge }>help</Icon>
          </IconButton>
        </Grid>
        <Grid className={ classes.verticalCenterGrid } item sm={ TTS.status ? 1 : 2 }>
          <IconButton
            className={ classes.iconButton }
            color='primary'
            onClick={ () => {
              new TTS('Clothes').speak();
              this.props.close();
            } }
          >
            <Icon className={ classes.iconLarge }>close</Icon>
          </IconButton>
        </Grid>
      </Grid>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// MailHeader Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailHeader Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(MailHeader);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //