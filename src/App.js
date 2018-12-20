import React from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
import Compose from './Compose';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import Drawer from '@material-ui/core/Drawer';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from "@material-ui/core/ListItemText";
import Mailbox from './Mailbox';
import SendIcon from '@material-ui/icons/Send';
import { speak } from './Voice';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

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
      auth: null,
      compose: false
    }
  }

  // handleLogin() {
  //   speak('Sign in');
  // }

  // componentDidMount() {
  //   load();
  //   // this.setState({
  //   //   auth: true ? <Button color='secondary' className={ this.props.classes.auth } id='btn-logout' onClick={ () => this.handleLogout() } size='large'>Sign Out</Button> : <Button color='secondary' className={ this.props.classes.auth } id='btn-login' onClick={ () => this.handleLogin() } size='large'>Sign In</Button>
  //   // });
  // }

  handleCompose(bool) {
    this.setState({
      compose: bool
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={ classes.body }>
        <CssBaseline />
        <AppBar className={ classes.appBar }>
          <Toolbar>
            <Typography variant='h4' color='inherit' onClick={ () => speak('name') }>[Name]</Typography>
            { this.state.auth }
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' classes={ { paper: classes.drawerPaper } } className={ classes.drawer }>
          <List component='nav'>
            <div className={ classes.toolbar } />
            <ListItem button={ true } onClick={ () => speak('Inbox') }>
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
            <ListItem button={ true } onClick={ () => speak('Sent') }>
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
            <ListItem button={ true } onClick={ () => speak('Drafts') }>
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
            <ListItem button={ true } onClick={ () => { this.handleCompose(true); speak('Compose email'); } }>
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
            <Mailbox />
            <Compose open={ this.state.compose } onClose={ () => this.handleCompose(false) } />
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(style)(App);