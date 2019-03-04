// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import SendMail from './gapi/sendmail';
import TTS from './features/tts';
import { style } from './style';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  BUDDY_LIST = JSON.parse(window.localStorage.getItem('buddyList')) || {},
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Compose Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Compose Component//
class Compose extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      buddyList: null
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    let jsx = [];
    for (const address in BUDDY_LIST) {
      if (BUDDY_LIST.hasOwnProperty(address)) {
        jsx.push(<MenuItem key={ address } value={ address }>{ BUDDY_LIST[address] }</MenuItem>);
      }
    }
    this.setState({ buddyList: jsx });
  }
  // componentDidMount ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    return (
      <Dialog
        className={ classes.dialog }
        fullScreen
        onClose={ () => this.props.close() }
        onEntered={ () => new TTS('Write email').speak() }
        open={ this.props.open }
      >
        <div className={ classes.dialogBody }>
          <Grid container spacing={ 8 }>
            <Grid className={ classes.verticalCenterFlex } item sm={ 11 }>
              <Typography className={ classes.fontSize60_40 }>Write Email</Typography>
            </Grid>
            <Grid className={ classes.displayGrid } item sm={ 1 }>
              <IconButton
                className={ classes.marginAuto }
                color='primary'
                onClick={ () => {
                  new TTS('Clothes').speak();
                  this.props.close();
                } }
              >
                <Icon className={ classes.fontSize90_60 }>close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Select
            className={ classes.select }
            inputProps={ {
              id: 'address'
            } }
            onChange={ (event) => this.setState({ address: event.target.value }) }
            value={ this.state.address }
          >
            <MenuItem value=''>Send to:</MenuItem>
            { this.state.buddyList }
          </Select>
          <br />
          <br />
          <Divider />
          <br />
          <TextField
            fullWidth
            InputProps={ { id: 'email', style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
            label='Message'
            multiline
            placeholder='Message'
            rows={ 10 }
            variant='outlined'
          />
          <br />
          <Divider />
          <br />
          <Button
            color='secondary'
            onClick={ () => {
              new TTS('Send').speak();
              new SendMail(
                document.getElementById('email').value,
                document.getElementById('address').value
              ).send();
            } }
            variant='contained'
          >
            <Icon className={ classes.icon }>send</Icon>
            &nbsp;
            <Typography className={ classes.button } variant='inherit'>Send</Typography>
          </Button>
        </div>
      </Dialog>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// Compose Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Compose Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(Compose);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //