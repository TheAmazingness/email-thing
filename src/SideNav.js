// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Compose from './Compose';
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const VOICE_COMMAND = JSON.parse(window.localStorage.getItem('recognition')) || false;
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// SideNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SideNav Component//
class SideNav extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Drawer className={ classes.drawer } classes={ { paper: classes.drawerPaper } } variant='permanent'>
        <List component='nav'>
          <div className={ classes.toolbar } />
          <div className={ classes.toolbar } />
          <Divider />
          <ListItem
            button
            divider
            onClick={ () => this.setState({ open: true }) }
          >
            <ListItemIcon>
              <Icon className={ classes.fontSize60_40 }>add_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography className={ classes.fontSize60_40 }>Write</Typography>
            </ListItemText>
          </ListItem>
          {
            VOICE_COMMAND && (
              <div>
                <div className={ classes.toolbar } />
                <Divider />
                <ListItem button divider onClick={ () => new TTS('Voice command').speak() }>
                  <ListItemIcon>
                    <Icon className={ classes.fontSize60_40 }>record_voice_over</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={ classes.fontSize60_40 }>Voice Command</Typography>
                  </ListItemText>
                </ListItem>
              </div>
            )
          }
          <div className={ classes.toolbar } />
          <Divider />
          <ListItem button divider onClick={ () => new TTS('Settings').speak() }>
            <ListItemIcon>
              <Icon className={ classes.fontSize60_40 }>settings</Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography className={ classes.fontSize60_40 }>Settings</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Compose close={ () => this.setState({ open: false }) } open={ this.state.open } />
      </Drawer>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// SideNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SideNav Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(SideNav);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //