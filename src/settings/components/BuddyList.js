// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import TTS from '../../features/tts';
import { style } from './../../style';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  BUDDY_LIST = JSON.parse(window.localStorage.getItem('buddyList')) || {},
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// BuddyList Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BuddyList Component//
class BuddyList extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      buddyList: null
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static add
   * @desc Add buddy to buddyList
   */
  static add() {
    new TTS('Add buddy').speak();
    let list = BUDDY_LIST;
    const address = document.getElementById('address').value;
    list[address] = document.getElementById('name').value;
    window.localStorage.setItem('buddyList', JSON.stringify(list));
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
  }
  // static add ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static delete
   * @desc Deletes specified buddy from buddyList
   */
  static delete(address) {
    new TTS('Delete buddy').speak();
    let list = BUDDY_LIST;
    delete list[address];
    window.localStorage.setItem('buddyList', JSON.stringify(list));
    setTimeout(() => window.location.reload(), 100);
  }
  // static delete ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    let jsx = [];
    for (const address in BUDDY_LIST) {
      if (BUDDY_LIST.hasOwnProperty(address)) {
        jsx.push((
          <ExpansionPanel key={ address }>
            <ExpansionPanelSummary expandIcon={ <Icon>expand_more</Icon> }>
              <Typography>{ BUDDY_LIST[address] }</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={ 8 }>
                <Grid className={ this.props.classes.verticalCenterFlex } item sm={ 10 }>
                  { address }
                </Grid>
                <Grid item sm={ 2 }>
                  <IconButton className={ this.props.classes.marginAuto } color='primary'>
                    <Icon className={ this.props.classes.fontSize36_24 } onClick={ () => BuddyList.delete(address) }>
                      delete_forever
                    </Icon>
                  </IconButton>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ));
      }
    }
    this.setState({ buddyList: jsx.length === 0 ? <Typography><br />Nothing here to see...</Typography> : jsx });
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
        onEntered={ () => new TTS('Edit buddy list').speak() }
        open={ this.props.open }
      >
        <div className={ classes.dialogBody }>
          <Grid container spacing={ 8 }>
            <Grid className={ classes.verticalCenterFlex } item sm={ 11 }>
              <Typography className={ classes.fontSize60_40 }>Buddy List</Typography>
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
          <Grid container spacing={ 8 }>
            <Grid className={ classes.textAlignCenter } item sm={ 6 }>
              <Typography className={ classes.fontSize36_24 }>Buddy List</Typography>
              <br />
              { this.state.buddyList }
            </Grid>
            <Grid className={ classes.textAlignCenter } item sm={ 6 }>
              <Typography className={ classes.fontSize36_24 }>Add Buddy List</Typography>
              <br />
              <TextField
                className={ classes.width100 }
                InputProps={ { id: 'name', style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Buddy Name'
                onClick={ () => new TTS('Add buddy name').speak() }
                placeholder='Buddy Name'
                variant='outlined'
              />
              <br />
              <br />
              <TextField
                className={ classes.width100 }
                InputProps={ { id: 'address', style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Buddy Email Address'
                onClick={ () => new TTS('Buddy email address').speak() }
                placeholder='Buddy Email Address'
                type='email'
                variant='outlined'
              />
              <br />
              <br />
              <Button color='secondary' onClick={ () => BuddyList.add() } variant='contained'>
                <Icon className={ classes.fontSize36_24 }>add_box</Icon>
                &nbsp;&nbsp;
                <Typography className={ classes.button } variant='inherit'>Add</Typography>
              </Button>
            </Grid>
          </Grid>
          <br />
        </div>
      </Dialog>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// BuddyList Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ BuddyList Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(BuddyList);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //