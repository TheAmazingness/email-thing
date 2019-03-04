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
  CANNED = JSON.parse(window.localStorage.getItem('canned')) || {},
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false;
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Canned Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Canned Component//
class Canned extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      canned: null
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static add
   * @desc Add canned message to localStorage
   */
  static add() {
    new TTS('Add canned response').speak();
    let prev = CANNED;
    const icon = document.getElementById('iconName').value;
    prev[icon] = document.getElementById('message').value;
    window.localStorage.setItem('canned', JSON.stringify(prev));
    document.getElementById('iconName').value = '';
    document.getElementById('message').value = '';
  }
  // static add ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static delete
   * @desc Deletes specified canned response
   */
  static delete(icon) {
    new TTS('Delete canned response').speak();
    let prev = CANNED;
    delete prev[icon];
    window.localStorage.setItem('canned', JSON.stringify(prev));
    setTimeout(() => window.location.reload(), 100);
  }
  // static delete ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    let jsx = [];
    for (const icon in CANNED) {
      if (CANNED.hasOwnProperty(icon)) {
        jsx.push((
          <ExpansionPanel key={ icon }>
            <ExpansionPanelSummary expandIcon={ <Icon>expand_more</Icon> }>
              <Icon>{ icon }</Icon>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={ 8 }>
                <Grid className={ this.props.classes.verticalCenterFlex } item sm={ 10 }>
                  { CANNED[icon] }
                </Grid>
                <Grid item sm={ 2 }>
                  <IconButton className={ this.props.classes.marginAuto } color='primary'>
                    <Icon className={ this.props.classes.fontSize36_24 } onClick={ () => Canned.delete(icon) }>
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
    this.setState({ canned: jsx.length === 0 ? <Typography><br />Nothing here to see...</Typography> : jsx });
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
        onEntered={ () => new TTS('Edit canned responses').speak() }
        open={ this.props.open }
      >
        <div className={ classes.dialogBody }>
          <Grid container spacing={ 8 }>
            <Grid className={ classes.verticalCenterFlex } item sm={ 11 }>
              <Typography className={ classes.fontSize60_40 }>Canned Responses</Typography>
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
              <Typography className={ classes.fontSize36_24 }>Existing Canned Responses</Typography>
              <br />
              { this.state.canned }
            </Grid>
            <Grid className={ classes.textAlignCenter } item sm={ 6 }>
              <Typography className={ classes.fontSize36_24 }>Add Canned Responses</Typography>
              <br />
              <TextField
                helperText={
                  <span>
                    See the full list of icons&nbsp;
                    <a
                      target='_blank'
                      href='https://material.io/tools/icons/?style=baseline'
                      rel='noopener noreferrer'
                    >
                      here
                    </a>
                    .
                  </span>
                }
                InputProps={ { id: 'iconName', style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Icon Name'
                onClick={ () => new TTS('Add canned response icon').speak() }
                placeholder='Icon Name'
                variant='outlined'
              />
              <br />
              <br />
              <TextField
                className={ classes.width100 }
                InputProps={ { id: 'message', style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Message'
                multiline
                onClick={ () => new TTS('Message').speak() }
                placeholder='Message'
                rows={ 8 }
                variant='outlined'
              />
              <br />
              <br />
              <Button color='secondary' onClick={ () => Canned.add() } variant='contained'>
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
// Canned Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Canned Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(Canned);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //