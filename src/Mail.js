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
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize') || false),
  style = theme => ({
    btnText: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    close: {
      textAlign: 'right'
    },
    closeIcon: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
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
    helpIcon: {
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
    subject: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Mail Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Mail Component//
class Mail extends React.Component {
  /** static enter
   * @desc gets HTML or plain text part of an email
   * @param data
   * @returns { string }
   */
  static enter(data) {
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
  // static enter ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={ classes.dialog }
        fullScreen
        onClose={ () => this.props.close() }
        onEntered={ () => document.getElementById(typeof this.props.data === 'string' ? 'pre-mail' : 'div-mail').innerHTML = Mail.enter(this.props.data) }
        open={ this.props.open }
      >
        <div className={ classes.mailBody }>
          <Grid container spacing={ 8 }>
            <Grid item sm={ 6 }>
              <Typography className={ classes.from }>From: { this.props.from }</Typography>
              <Typography className={ classes.subject }>{ this.props.subject }</Typography>
            </Grid>
            <Grid item sm={ 3 }>
              <Button className={ classes.read } color='secondary' size='large' variant='contained'>
                <Icon className={ classes.icon }>record_voice_over</Icon>
                &emsp;
                <Typography className={ classes.btnText } color='inherit'>Read Email</Typography>
              </Button>
            </Grid>
            <Grid className={ classes.help } item sm={ 2 }>
              <IconButton className={ classes.helpIcon } color='secondary'>
                <Icon className={ classes.iconLarge }>help</Icon>
              </IconButton>
            </Grid>
            <Grid className={ classes.close } item sm={ 1 }>
              <IconButton color='primary'>
                <Icon className={ classes.closeIcon } onClick={ () => this.props.close() }>close</Icon>
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