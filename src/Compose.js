import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
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
  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen={ true } onClose={ () => this.props.onClose() }>
        <DialogTitle className={ classes.dialogTitle }>Compose Email</DialogTitle>
        <div className={ classes.dialog }>
          <TextField autoFocus fullWidth multiline variant='outlined' rows='25' />
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Compose);