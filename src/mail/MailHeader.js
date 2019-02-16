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
import TTS from './../tts';
import { style } from './../style';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// MailHeader Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailHeader Component//
class MailHeader extends React.Component {
  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={ 8 }>
        <Grid item sm={ TTS.status ? 5 : 8 }>
          <Typography className={ classes.fontSize30_20 }  onClick={ () => new TTS(this.props.from).speak() }>
            From: { this.props.from }
          </Typography>
          <Typography className={ classes.fontSize60_40 } onClick={ () => new TTS(this.props.subject).speak() }>
            { this.props.subject }
          </Typography>
        </Grid>
        {
          TTS.status && (
            <Grid className={ classes.textAlignCenter } item sm={ 5 }>
              <Button
                className={ classes.padding5 }
                color='secondary'
                onClick={ () => new TTS(document.getElementById(this.id).innerText).speak() }
                size='large'
                variant='contained'
              >
                <Icon className={ classes.fontSize60_40 }>record_voice_over</Icon>
                &emsp;
                <Typography className={ classes.fontSize45_30 } color='inherit'>Read Email</Typography>
              </Button>
            </Grid>
          )
        }
        <Grid className={ classes.displayGrid } item sm={ TTS.status ? 1 : 2 }>
          <IconButton className={ classes.marginAuto } color='secondary' onClick={ () => new TTS('Help').speak() }>
            <Icon className={ classes.fontSize90_60 }>help</Icon>
          </IconButton>
        </Grid>
        <Grid className={ classes.displayGrid } item sm={ TTS.status ? 1 : 2 }>
          <IconButton
            className={ classes.marginAuto }
            color='primary'
            onClick={ () => {
              new TTS('Clothes').speak();
              this.props.close();
            } }
          >
            <Icon className={ classes.fontSize90_60 }>close</Icon>
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