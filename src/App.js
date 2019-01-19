import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClientSettings from './ClientSettings';
import Compose from './Compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Mailbox from './Mailbox';
import Recognition from './Recognition';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Settings from './Settings';
import SettingsIcon from '@material-ui/icons/Settings'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Voice } from './Voice';
import { withStyles } from '@material-ui/core/styles';

const icon = JSON.parse(window.localStorage.getItem('icon'));
const style = theme => ({
  appBar: {
    zIndex: 1400,
    alignItems: 'center'
  },
  auth: {
    position: 'absolute',
    right: '-40vw'
  },
  body: {
    height: '100vh',
    margin: 0,
    overflow: 'hidden',
    width: '100vw',
    display: 'flex'
  },
  bold: {
    fontWeight: icon ? '' : 'bold'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 12.5,
    overflowY: 'scroll'
  },
  drawer: {
    flexShrink: 0,
    width: 400
  },
  drawerPaper: {
    width: 400
  },
  icon: {
    fontSize: icon ? '60pt' : '40pt'
  },
  logo: {
    height: '5vh'
  },
  settings: {
    position: 'absolute',
    left: '-40vw'
  },
  toolbar: theme.mixins.toolbar
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.recognition = new Recognition();
    this.isRecording = false;
    this.emailCount = 0;
    this.state = {
      auth: null,
      compose: false,
      settings: false,
      clientSettings: false,
      recognition: JSON.parse(window.localStorage.getItem('recognition')) ? (
        <div>
          <div className={ this.props.classes.toolbar } />
          <Divider />
          <ListItem button={ true } onClick={ () => { new Voice('Voice Command').activate(); this.handleRecognition(); } }>
            <ListItemIcon>
              <RecordVoiceOverIcon className={ this.props.classes.icon } />
            </ListItemIcon>
            <ListItemText>
              <br />
              <Typography variant='h3' color='inherit' className={ this.props.classes.bold }>Voice Command</Typography>
              <br />
            </ListItemText>
          </ListItem>
          <Divider />
        </div>
      ) : null
    }
  }

  login(status = false) {
    if (status) {
      this.setState({ auth: <Button variant='contained' color='secondary' id='btn-logout' className={ this.props.classes.auth } onClick={ () => { new Voice('Sign out').activate(); setTimeout(() => window.location.reload(), 3000); } }>Sign Out</Button> });
    } else {
      this.setState({ auth: <Button variant='contained' color='secondary' id='btn-login' className={ this.props.classes.auth } onClick={ () => { new Voice('Sign in').activate(); } }>Sign In</Button> });
    }
  }

  handleCompose(bool) {
    this.setState({
      compose: bool
    });
  }

  handleSettings(bool) {
    this.setState({
      settings: bool
    });
  }

  getEmail(profile) {
    this.address = profile.emailAddress;
  }

  send(recipient, body, recording) {
    // if (!!recording) {
    //   recording.then((result) => {
    //     this.emailContent = `MIME-Version: 1.0\r\nFrom: ${ this.address }\r\nTo: ${ recipient }\r\nSubject: Email from ${ this.address }\r\nContent-Type: multipart/related\r\nReply-To: ${ this.address }\r\nboundary="myboundary"\r\n--myboundary\r\nContent-Type: text/plain\r\n\r\n${ body }\nSent with AbleMail.\r\n\r\n--myboundary\r\nContent-Type: audio/webp\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename="audio.webp"\r\n\r\n${ result }`;
    //     this.gmailSend();
    //   });
    // } else {
      this.emailContent = `Content-Type: text/plain\r\nFrom: ${ this.address }\r\nTo: ${ recipient }\r\nSubject: Email from ${ this.address }\r\nReply-To: ${ this.address }\r\n\r\n${ body }\nSent with AbleMail.`;
      this.gmailSend();
    // }
  }

  gmailSend() {
    window.gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: btoa(this.emailContent).replace(/\+/g, '-').replace(/\//g, '_')
      }
    }).then(() => setTimeout(() => window.location.reload(), 500));
  }

  handleRecognition() {
    if (this.isRecording) {
      this.recognition.stop();
    } else {
      setTimeout(() => {
        this.recognition.start(() => {
          let message = this.recognition.transcript.toLowerCase();
          switch (true) {
            case /compose/.test(message):
              document.getElementById('btn-compose').click();
              this.recognition.transcript = '';
              this.recognition.stop();
              break;
            case /read emails/.test(message):
              new Voice(`You have ${ this.emailCount } emails. ${ this.mailData } That's all of your emails.`).activate();
              this.recognition.transcript = '';
              this.recognition.stop();
              break;
          }
        });
      }, 2000);
    }
    this.isRecording = !this.isRecording;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.body }>
        <CssBaseline />
        <AppBar className={ classes.appBar }>
          <Toolbar>
            <Settings open={ this.state.settings } onClose={ () => this.handleSettings(false) } />
            <Button variant='outlined' color='secondary' className={ classes.settings } onClick={ () => { this.handleSettings(true); new Voice('Settings').activate() } }>
              <SettingsIcon />&emsp;Coach's Settings
            </Button>
            {/*<img onClick={ () => new Voice('AbleMail') } className={ classes.logo } src='logo.png' alt='AbleMail' />*/}
            { this.state.auth }
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' classes={ { paper: classes.drawerPaper } } className={ classes.drawer }>
          <List component='nav'>
            <div className={ classes.toolbar } />
            <div className={ classes.toolbar } />
            <Divider />
            <ListItem button={ true } onClick={ () => { this.recognition.stop(); this.handleCompose(true); new Voice('Compose email').activate(); } } id='btn-compose'>
              <ListItemIcon>
                <AddCircleOutlineIcon className={ classes.icon } />
              </ListItemIcon>
              <ListItemText>
                <br />
                <Typography variant='h3' color='inherit' className={ classes.bold }>Compose</Typography>
                <br />
              </ListItemText>
            </ListItem>
            <Divider />
            { this.state.recognition }
            <div className={ classes.toolbar } />
            <Divider />
            <ListItem button={ true } onClick={ () => new Voice('Settings').activate() }>
              <ListItemIcon>
                <SettingsIcon className={ classes.icon } />
              </ListItemIcon>
              <ListItemText>
                <br />
                <ClientSettings open={ this.state.clientSettings } onClose={ () => this.setState({ clientSettings: false }) } />
                <Typography variant='h3' color='inherit' className={ classes.bold } onClick={ () => { this.setState({ clientSettings: true }); new Voice('Settings').activate() } }>Settings</Typography>
                <br />
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        </Drawer>
        <main className={ classes.content }>
          <div className={ classes.toolbar }>
            <Mailbox isLogin={ (status) => this.login(status) } mailData={ (data) => { this.mailData = data; this.emailCount++; } } getEmail={ (profile) => this.getEmail(profile) } />
            <Compose open={ this.state.compose } onClose={ () => this.handleCompose(false) } send={ (recipient, body, recording) => this.send(recipient, body, recording) } func={ (bool) => this.setState({ compose: bool }) } />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(style)(App);