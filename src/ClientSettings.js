import React from 'react';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { speak } from './Voice';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  btnApply: {
    position: 'fixed'
  },
  dialog: {
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: '1.5em'
  },
  grid: {
    textAlign: 'center'
  }
});

class Settings extends React.Component {
  constructor(props) {
    super(props);
    if (!!typeof Storage) {
      this.storage = window.localStorage;
      if (!this.storage.getItem('tts')) {
        this.storage.setItem('tts', false);
      }
      if (!this.storage.getItem('recognition')) {
        this.storage.setItem('recognition', false);
      }
      if (!this.storage.getItem('vemail')) {
        this.storage.setItem('vemail', false);
      }
      if (!this.storage.getItem('icon')) {
        this.storage.setItem('icon', false);
      }
      if (!this.storage.getItem('helpAddress')) {
        this.storage.setItem('helpAddress', 'ablemail1540@gmail.com');
      }
    } else {
      alert('Your browser doesn\'t support local storage.');
    }
    this.state = {
      tts: this.storage.getItem('tts'),
      recognition: this.storage.getItem('recognition'),
      vemail: this.storage.getItem('vemail'),
      icon: this.storage.getItem('icon'),
      helpAddress: this.storage.getItem('helpAddress')
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen onClose={ () => this.props.onClose() }>
        <DialogTitle className={ classes.dialogTitle }>Settings</DialogTitle>
        <div className={ classes.dialog }>
          <Grid container spacing={ 24 } className={ classes.grid }>
            <Grid item sm={ 6 }>
              {
                JSON.parse(this.state.tts) ? (
                  <div>
                    <Typography variant='h4' onClick={ () => speak('Text to speech') }>Text-to-Speech</Typography>
                    <Switch checked={ JSON.parse(this.state.tts) } onChange={ (e, checked) => { this.storage.setItem('tts', checked); this.setState({ tts: this.storage.getItem('tts') }); } } />
                  </div>
                ) : ''
              }
            </Grid>
            <Grid item sm={ 6 }>
              {
                JSON.parse(this.state.recognition) ? (
                  <div>
                    <Typography variant='h4' onClick={ () => speak('Voice recognition') }>Voice Recognition</Typography>
                    <Switch checked={ JSON.parse(this.state.recognition) } onChange={ (e, checked) => { this.storage.setItem('recognition', checked); this.setState({ recognition: this.storage.getItem('recognition') }); } } />
                  </div>
                ) : ''
              }
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={ 24 } className={ classes.grid }>
            <Grid item sm={ 6 }>
              {
                JSON.parse(this.state.vemail) ? (
                  <div>
                    <Typography variant='h4' onClick={ () => speak('Voice emails') }>Voice Emails</Typography>
                    <Switch checked={ JSON.parse(this.state.vemail) } onChange={ (e, checked) => { this.storage.setItem('vemail', checked); this.setState({ vemail: this.storage.getItem('vemail') }); } } />
                  </div>
                ) : ''
              }
            </Grid>
            <Grid item sm={ 6 }>
              {
                JSON.parse(this.state.icon) ? (
                  <div>
                    <Typography variant='h4' onClick={ () => speak('Bigger icons') }>Bigger Icons</Typography>
                    <Switch checked={ JSON.parse(this.state.icon) } onChange={ (e, checked) => { this.storage.setItem('icon', checked); this.setState({ icon: this.storage.getItem('icon') }); } } />
                  </div>
                ) : ''
              }
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <Button color='primary' variant='outlined' onClick={ () => window.location.reload() } className={ classes.btnApply }>
            <CheckIcon />&emsp;Apply
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Settings);