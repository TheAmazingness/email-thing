import React from 'react';
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import Recorder from './Recorder';
import Recognition from './Recognition';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Voice } from './Voice';

const icon = JSON.parse(window.localStorage.getItem('icon'));
const style = theme => ({
  close: {
    fontSize: JSON.parse(window.localStorage.getItem('icon')) ? '60pt' : '40pt',
    zIndex: 99999
  },
  dialog: {
    overflow: 'hidden',
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: '1.5em'
  },
  send: {
    fontSize: icon ? '60pt' : '40pt'
  }
});

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  send() {
    this.props.send(
      document.getElementById('recipient').value,
      document.getElementById('compose-body').value,
      this.mediaRecorder.base64Recording
    );
  }

  render() {
    const { classes } = this.props;
    this.mediaRecorder = new Recorder();
    let recognition = new Recognition();
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen onClose={ () => this.props.onClose() } onEntered={ () => setTimeout(() => { this.mediaRecorder.start(); recognition.start(); }, 2000) }>
        <Grid container spacing={ 8 }>
          <Grid item sm={ 10 }>
            <DialogTitle className={ classes.dialogTitle } onClick={ () => new Voice('Compose Email').activate() }>Compose Email</DialogTitle>
            <br />
          </Grid>
          <Grid item sm={ 2 }>
            <br />
            <IconButton aria-label='Close' color='primary' onClick={ () => this.props.func(false) }>
              <CloseIcon className={ classes.close } />
            </IconButton>
          </Grid>
        </Grid>
        <div className={ classes.dialog }>
          <TextField autoFocus fullWidth variant='outlined' rows='1' placeholder='To:' id='recipient' />
          <br />
          <br />
          <TextField fullWidth multiline variant='outlined' rows='20' id='compose-body' value={ this.state.content } onChange={ () => this.setState({ content: document.getElementById('compose-body').value }) } placeholder='Message' />
          <br />
          <br />
          <Button variant='outlined' color='secondary' id='btn-send' onClick={ () => { this.mediaRecorder.stop(); this.setState({ content: recognition.stop() }); this.send(); } }>
            <SendIcon className={ classes.send } />&emsp;Send Email
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Compose);