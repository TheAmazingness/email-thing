import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import { speak } from "./Voice";
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  dialog: {
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: '30pt'
  }
});

class Mail extends React.Component {
  entered() {
    document.getElementsByClassName('mail-body')[0].innerHTML = this.props.data;
  }

  static getAllText() {
    speak(document.getElementsByClassName('mail-body')[0].innerText);
  }

  static getSelectedText() {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    speak(text);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen={ true } onClose={ () => this.props.onClose() } onEntered={ () => this.entered() }>
        <DialogTitle className={ classes.dialogTitle } onClick={ () => speak(this.props.subject) }>{ this.props.subject }</DialogTitle>
        <div className={ `${ classes.dialog } mail-body` } onClick={ () => Mail.getAllText() } onMouseUp={ () => Mail.getSelectedText() } />
      </Dialog>
    );
  }
}

export default withStyles(style)(Mail);