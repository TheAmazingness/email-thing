import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Recorder from './Recorder';
import Recognition from './Recognition';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  dialog: {
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: '1.5em'
  }
});

class Compose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    };
  }

  render() {
    const { classes } = this.props;
    let mediaRecorder = new Recorder();
    let recognition = new Recognition();
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen onClose={ () => this.props.onClose() } onEntered={ () => setTimeout(() => { mediaRecorder.start(); recognition.start(); }, 2000) }>
        <DialogTitle className={ classes.dialogTitle }>Compose Email</DialogTitle>
        <div className={ classes.dialog }>
          <TextField autoFocus fullWidth multiline variant='outlined' rows='25' id='compose-body' value={ this.state.content } onChange={ () => this.setState({ content: document.getElementById('compose-body').value }) } />
          <br />
          <br />
          <Button variant='outlined' color='secondary' onClick={ () => { mediaRecorder.stop(); this.setState({ content: recognition.stop() }); } }>
            <SendIcon />&emsp;Send Email
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Compose);