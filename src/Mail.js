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
  },
  pre: {
    fontFamily: 'Roboto'
  }
});

let count = 0;

class Mail extends React.Component {
  entered() {
    document.getElementById(`body-${ count }`).innerHTML = this.props.data;
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.data);
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen={ true } onClose={ () => this.props.onClose() } onEntered={ () => this.entered() }>
        <DialogTitle className={ classes.dialogTitle } onClick={ () => speak(this.props.subject) }>{ this.props.subject }</DialogTitle>
        <div className={ classes.dialog } id={ `body-${ count }` }>
          {/*<pre className={ classes.pre }>{ this.props.data }</pre>*/}
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Mail);