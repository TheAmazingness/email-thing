import React from 'react';
import Voice from '@cheapundies/responsive-voice';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from "@material-ui/core/Button";
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

const style = theme => ({
  appBar: {
    zIndex: 1400,
    alignItems: 'center'
  },
  bold: {
    fontWeight: 'bold'
  },
  drawerPaper: {
    width: 360
  },
  icon: {
    fontSize: '40pt'
  },
  login: {
    position: 'absolute',
    right: '-40vw'
  },
  toolbar: theme.mixins.toolbar
});

class App extends React.Component {

  handleLogin() {
    App.speak('login');
  }

  static speak(text) {
    Voice.speak(text, 'US English Female', { rate: 0.75 });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='body' style={ { height: '100vh', margin: 0, overflow: 'hidden', width: '100vw' } }>
        <AppBar className={ classes.appBar }>
          <Toolbar>
            <Typography variant='h4' color='inherit'>[Name]</Typography>
            <Button color='secondary' className={ classes.login } onClick={ () => this.handleLogin() } size='large'>Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' classes={ { paper: classes.drawerPaper } }>
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
      </div>
    );
  }
}

export default withStyles(style)(App);