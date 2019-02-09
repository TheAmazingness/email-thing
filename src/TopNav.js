// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Settings from './Settings';
import TTS from './tts';
import Compose from "./Compose";
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const style = {
  appBar: {
    alignItems: 'center',
    zIndex: 1400
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
  settings: {
    left: 0,
    position: 'absolute'
  },
  toolbar: {
    width: '90%'
  }
};
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// TopNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TopNav Component//
class TopNav extends React.Component {
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
      <div>
        <AppBar className={ classes.appBar }>
          <Toolbar className={ classes.toolbar }>
            {
              this.props.status && (
                <Button
                  className={ classes.settings }
                  color='secondary'
                  onClick={ () => this.setState({ open: true }) }
                  variant='outlined'
                >
                  <Icon>settings</Icon>
                  &emsp;
                  Coach's Settings
                </Button>
              )
            }
            <img
              alt='AbleMail'
              className={ classes.logo }
              onClick={ () => new TTS('AbleMail').speak() }
              src='logo.png'
            />
            <Button
              className={ classes.login }
              color='secondary'
              onClick={ () => new TTS(this.props.status ? 'Sign Out' : 'Sign In').speak() }
              variant='outlined'
            >
              <Icon>how_to_reg</Icon>
              &emsp;
              { this.props.status ? 'Sign Out' : 'Sign In' }
            </Button>
          </Toolbar>
        </AppBar>
        <Settings close={ () => this.setState({ open: false }) } open={ this.state.open } />
      </div>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// TopNav Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ TopNav Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(TopNav);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //