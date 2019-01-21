import React from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import FlashOnIcon from '@material-ui/icons/FlashOn'
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import ReplyIcon from '@material-ui/icons/Reply'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import { Voice } from './Voice';
import { withStyles } from '@material-ui/core/styles';

const icon = JSON.parse(window.localStorage.getItem('icon'));
const style = theme => ({
  close: {
    fontSize: icon ? '60pt' : '40pt',
    zIndex: 99999
  },
  dialog: {
    padding: theme.spacing.unit * 5,
    zIndex: 2000
  },
  dialogTitle: {
    fontSize: icon ? '48pt' : '36pt'
  },
  flashIcon: {
    fontSize: '36pt'
  },
  grid: {
    margin: 10,
    textAlign: 'center'
  },
  mailBody: {
    fontSize: icon ? '36pt' : '24pt',
    padding: theme.spacing.unit * 5
  },
  record: {
    fontSize: icon ? '60pt' : '40pt',
    zIndex: 99999
  },
  replyIcon: {
    fontSize: '24pt'
  }
});

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.ok = `Dear ${ this.props.from },\r\n\nSounds great! See you then!`;
    this.no = `Dear ${ this.props.from },\r\n\nNo. That does not work for me.`;
    this.maybe = `Dear ${ this.props.from },\r\n\nI'll get back to you.`;
    this.state = {
      read: JSON.parse(window.localStorage.getItem('tts')) ? (
        <Button variant='contained' color='secondary' onClick={ () => Mail.getAllText() }>
          <RecordVoiceOverIcon className={ this.props.classes.record } />&nbsp;
          Read Email
        </Button>
      ) : null
    };
  }

  entered() {
    document.getElementsByClassName('mail-body')[0].innerHTML = this.props.data.replace(/Â/g, ' ');
  }

  static getAllText() {
    new Voice(document.getElementsByClassName('mail-body')[0].innerText).activate();
  }

  static getSelectedText() {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    }
    new Voice(text).activate();
  }

  send(value) {
    document.getElementById('btn-compose').click();
    setTimeout(() => {
      document.getElementById('recipient').value = this.props.address.substring(0, this.props.address.length - 1);
      document.getElementById('recipient').setAttribute('disabled', 'true');
      document.getElementById('compose-body').value = value;
      document.getElementById('compose-body').setAttribute('disabled', 'true');
      setTimeout(() => {
        document.getElementById('btn-send').click();
      }, 2000);
    }, 1000);
  }

  sendHelp() {
    window.gapi.client.gmail.users.getProfile({ userId: 'me' }).then((response) => {
      this.address = JSON.parse(response.body).emailAddress;
      this.emailContent = `Content-Type: text/html\r\nFrom: ${ this.address }\r\nTo: ${ window.localStorage.getItem('helpAddress') }\r\nSubject: Help!\r\nReply-To: ${ this.address }\r\n\r\nPlease help:\n\n${ this.props.data.replace(/Â/g, ' ') }`;
      window.gapi.client.gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: btoa(this.emailContent).replace(/\+/g, '-').replace(/\//g, '_')
        }
      }).then(() => setTimeout(() => window.location.reload(), 500));
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog className={ classes.dialog } open={ this.props.open } fullScreen={ true } onClose={ () => this.props.onClose() } onEntered={ () => this.entered() }>
        <Grid container spacing={ 8 }>
          <Grid item sm={ 5 }>
            <DialogTitle onClick={ () => new Voice(this.props.subject).activate() }>
              <Typography className={ classes.dialogTitle }>
                { this.props.subject }
              </Typography>
            </DialogTitle>
            <br />
          </Grid>
          <Grid item sm={ 3 }>
            <br />
            <br />
            { this.state.read }
          </Grid>
          <Grid item sm={ 2 }>
            <br />
            <IconButton aria-label='Help' color='secondary' onClick={ () => this.sendHelp() }>
              <HelpIcon className={ classes.close } />
            </IconButton>
          </Grid>
          <Grid item sm={ 2 }>
            <br />
            <IconButton aria-label='Close' color='primary' onClick={ () => this.props.func(false) }>
              <CloseIcon className={ classes.close } />
            </IconButton>
          </Grid>
        </Grid>
        <br />
        <div className={ `${ classes.mailBody } mail-body` } onClick={ () => Mail.getAllText() } onMouseUp={ () => Mail.getSelectedText() } />
        <Grid container spacing={ 8 } className={ classes.grid }>
          <Grid item sm={ 12 }>
            <Typography variant='h3' onClick={ () => new Voice('Reply').activate() }>
              <FlashOnIcon className={ classes.flashIcon } />Reply
            </Typography>
            <br />
            <br />
          </Grid>
          <Grid item sm={ 4 } />
          <Grid item sm={ 1 }>
            <IconButton aria-label='Ok' color='primary' onClick={ () => { this.send(this.ok); new Voice('Yes').activate(); } }>
              <ThumbUpIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='No' color='primary' onClick={ () => { this.send(this.no); new Voice('No').activate(); } } >
              <ThumbDownIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='Maybe' color='primary' onClick={ () => { this.send(this.maybe); new Voice('Maybe').activate(); } }>
              <SentimentDissatisfiedIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
          <Grid item sm={ 1 }>
            <IconButton aria-label='Reply' color='primary' onClick={ () => { new Voice('Reply').activate(); document.getElementById('btn-compose').click(); setTimeout(() => document.getElementById('recipient').value = this.props.address.substring(0, this.props.address.length - 1), 1000); } }>
              <ReplyIcon className={ classes.replyIcon } />
            </IconButton>
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
      </Dialog>
    );
  }
}

export default withStyles(style)(Mail);