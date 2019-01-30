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
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize') || false),
  VOICE_COMMAND = JSON.parse(window.localStorage.getItem('recognition') || false),
  style = theme => ({
    appBar: {
      alignItems: 'center',
      zIndex: 1400
    },
    drawer: {
      flexShrink: 0,
      width: 400
    },
    drawerPaper: {
      width: 400
    },
    fontSize: {
      fontSize: FONT_SIZE ? '60pt' : '40pt',
      fontWeight: FONT_SIZE ? 'bold' : ''
    },
    login: {
      position: 'absolute',
      right: 0
    },
    logo: {
      height: '7.5vh',
      left: 0,
      margin: '0 auto',
      position: 'absolute',
      right: 0
    },
    separator: theme.mixins.toolbar,
    settings: {
      left: 0,
      position: 'absolute'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// SideNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SideNav Component//
class SideNav extends React.Component {
  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Drawer className={ classes.drawer } classes={ { paper: classes.drawerPaper } } variant='permanent'>
        <List component='nav'>
          <div className={ classes.separator } />
          <div className={ classes.separator } />
          <Divider />
          <ListItem button divider>
            <ListItemIcon>
              <Icon className={ classes.fontSize }>add_circle_outline</Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography className={ classes.fontSize }>Write</Typography>
            </ListItemText>
          </ListItem>
          {
            VOICE_COMMAND && (
              <div>
                <div className={ classes.separator } />
                <Divider />
                <ListItem button divider>
                  <ListItemIcon>
                    <Icon className={ classes.fontSize }>record_voice_over</Icon>
                  </ListItemIcon>
                  <ListItemText>
                    <Typography className={ classes.fontSize }>Voice Command</Typography>
                  </ListItemText>
                </ListItem>
              </div>
            )
          }
          <div className={ classes.separator } />
          <Divider />
          <ListItem button divider>
            <ListItemIcon>
              <Icon className={ classes.fontSize }>settings</Icon>
            </ListItemIcon>
            <ListItemText>
              <Typography className={ classes.fontSize }>Settings</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// SideNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ SideNav Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(SideNav);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //