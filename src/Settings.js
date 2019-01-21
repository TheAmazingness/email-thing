import React from 'react';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
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
      if (!this.storage.getItem('canned')) {
        this.storage.setItem('canned', JSON.stringify({}));
      }
    } else {
      alert('Your browser doesn\'t support local storage.');
    }
    this.state = {
      tts: this.storage.getItem('tts'),
      recognition: this.storage.getItem('recognition'),
      vemail: this.storage.getItem('vemail'),
      icon: this.storage.getItem('icon'),
      helpAddress: this.storage.getItem('helpAddress'),
      canned: JSON.parse(this.storage.getItem('canned')),
      prevCan: null
    };
  }

  componentDidMount() {
    let allCan = [];
    let can = this.state.canned;
    for (const icon in can) {
      if (can.hasOwnProperty(icon)) {
        allCan.push(
          <Grid container spacing={ 8 } key={ icon }>
            <Grid item sm={ 4 }>
              <br />
              <Icon>{ icon }</Icon>
            </Grid>
            <Grid item sm={ 8 }>
              <p>{ this.state.canned[icon] }</p>
            </Grid>
          </Grid>
        );
      }
    }
    this.setState({ prevCan: allCan });
  }

  addCan() {
    this.state.canned[document.getElementById('cannedIcon').value] = document.getElementById('canned').value;
    this.storage.setItem('canned', JSON.stringify(this.state.canned));
    document.getElementById('cannedIcon').value = '';
    document.getElementById('canned').value = '';
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen onClose={ () => this.props.onClose() }>
        <DialogTitle className={ classes.dialogTitle }>Settings</DialogTitle>
        <div className={ classes.dialog }>
          <Grid container spacing={ 24 } className={ classes.grid }>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Text-to-Speech</Typography>
              <Switch checked={ JSON.parse(this.state.tts) } onChange={ (e, checked) => { this.storage.setItem('tts', checked); this.setState({ tts: this.storage.getItem('tts') }); } } />
            </Grid>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Voice Recognition</Typography>
              <Switch checked={ JSON.parse(this.state.recognition) } onChange={ (e, checked) => { this.storage.setItem('recognition', checked); this.setState({ recognition: this.storage.getItem('recognition') }); } } />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={ 24 } className={ classes.grid }>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Voice Emails</Typography>
              <Switch checked={ JSON.parse(this.state.vemail) } onChange={ (e, checked) => { this.storage.setItem('vemail', checked); this.setState({ vemail: this.storage.getItem('vemail') }); } } />
            </Grid>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Bigger Icons</Typography>
              <Switch checked={ JSON.parse(this.state.icon) } onChange={ (e, checked) => { this.storage.setItem('icon', checked); this.setState({ icon: this.storage.getItem('icon') }); } } />
            </Grid>
          </Grid>
          <br />
          <br />
          <Grid container spacing={ 24 } className={ classes.grid }>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Emergency Contact Email</Typography>
              <Input defaultValue={ this.state.helpAddress } id='helpAddress' onChange={ () => this.storage.setItem('helpAddress', document.getElementById('helpAddress').value) } type='email' />
            </Grid>
            <Grid item sm={ 6 }>
              <Typography variant='h4'>Add Canned Response</Typography>
              <Typography>(Click <a target='_blank' href='https://material.io/tools/icons/?style=baseline'>here</a> to see the available icons)</Typography>
              <Input id='cannedIcon' placeholder='Icon name' />
              <br />
              <br />
              <TextField id='canned' variant='outlined' multiline rows='5' />
              <br />
              <br />
              <Button color='secondary' onClick={ () => this.addCan() }>Add</Button>
              <br />
              <br />
              <div style={ { overflowX: 'hidden', overflowY: 'scroll' } }>
                <br />
                <br />
                { /* To improve: display and remove canned responses */ }
                <Grid container spacing={ 8 }>
                  { this.state.prevCan }
                </Grid>
                <br />
                <br />
              </div>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <Button color='primary' variant='outlined' onClick={ () => window.location.reload() }>
            <CheckIcon />&emsp;Apply
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(style)(Settings);