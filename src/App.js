import React from 'react';
import Voice from '@cheapundies/responsive-voice';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import SendIcon from '@material-ui/icons/Send';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { load } from './gmail';

/* For testing purposes. DELETE LATER */ import MailPreview from './MailPreview';

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
    fontWeight: 'bold'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 12.5,
    overflowY: 'scroll'
  },
  drawer: {
    flexShrink: 0,
    width: 360
  },
  drawerPaper: {
    width: 360
  },
  icon: {
    fontSize: '40pt'
  },
  toolbar: theme.mixins.toolbar
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: null
    }
  }


  handleLogin() {
    App.speak('Sign in');
  }

  static speak(text) {
    Voice.speak(text, 'US English Female', { rate: 0.75 });
  }

  componentDidMount() {
    load();
    // this.setState({
    //   auth: true ? <Button color='secondary' className={ this.props.classes.auth } id='btn-logout' onClick={ () => this.handleLogout() } size='large'>Sign Out</Button> : <Button color='secondary' className={ this.props.classes.auth } id='btn-login' onClick={ () => this.handleLogin() } size='large'>Sign In</Button>
    // });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.body }>
        <CssBaseline />
        <AppBar className={ classes.appBar }>
          <Toolbar>
            <Typography variant='h4' color='inherit'>[Name]</Typography>
            { this.state.auth }
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' classes={ { paper: classes.drawerPaper } } className={ classes.drawer }>
          <List component='nav'>
            <div className={ classes.toolbar } />
            <ListItem button={ true }>
              <Divider />
              <ListItemIcon>
                <InboxIcon className={ classes.icon } />
              </ListItemIcon>
              <ListItemText>
                <br />
                <Typography variant='h3' color='inherit' className={ classes.bold }>Inbox</Typography>
                <br />
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={ classes.toolbar } />
            <Divider />
            <ListItem button={ true }>
              <ListItemIcon>
                <SendIcon className={ classes.icon } />
              </ListItemIcon>
              <ListItemText>
                <br />
                <Typography variant='h3' color='inherit' className={ classes.bold }>Sent</Typography>
                <br />
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={ classes.toolbar } />
            <Divider />
            <ListItem button={ true }>
              <ListItemIcon>
                <DraftsIcon className={ classes.icon } />
              </ListItemIcon>
              <ListItemText>
                <br />
                <Typography variant='h3' color='inherit' className={ classes.bold }>Drafts</Typography>
                <br />
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={ classes.toolbar } />
            <Divider />
            <ListItem button={ true }>
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
          </List>
        </Drawer>
        <main className={ classes.content }>
          <div className={ classes.toolbar }>
            <MailPreview />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(style)(App);