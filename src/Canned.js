// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
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
import TTS from './tts';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize')) || false,
  CANNED = JSON.parse({} && window.localStorage.getItem('canned')),
  style = theme => ({
    body: {
      height: '100%',
      padding: theme.spacing.unit * 10,
      width: '100%'
    },
    cannedTitle: {
      fontSize: FONT_SIZE ? '36pt' : '24pt'
    },
    center: {
      textAlign: 'center'
    },
    close: {
      display: 'grid'
    },
    dialog: {
      padding: theme.spacing.unit * 10,
      zIndex: 2000
    },
    iconButton: {
      margin: 'auto'
    },
    iconLarge: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
    },
    title: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    titleBox: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// Compose Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Compose Component//
class Compose extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      canned: null
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** componentDidMount */
  componentDidMount() {
    let jsx = [];
    for (const response in CANNED) {
      if (CANNED.hasOwnProperty(response)) {
        jsx.push((
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={ <Icon>expand_more</Icon> }>
              { response.icon }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              { response.message }
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ));
      }
    }
    this.setState({ canned: jsx });
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
        <div className={ classes.body }>
          <Grid container spacing={ 8 }>
            <Grid className={ classes.titleBox } item sm={ 11 }>
              <Typography className={ classes.title }>Canned Responses</Typography>
            </Grid>
            <Grid className={ classes.close } item sm={ 1 }>
              <IconButton
                className={ classes.iconButton }
                color='primary'
                onClick={ () => {
                  new TTS('Clothes').speak();
                  this.props.close();
                } }
              >
                <Icon className={ classes.iconLarge }>close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <br />
          <Divider />
          <br />
          <Grid container spacing={ 8 }>
            <Grid className={ classes.center } item sm={ 6 }>
              <Typography className={ classes.cannedTitle }>Existing Canned Responses</Typography>
              <br />
              { this.state.canned }
            </Grid>
            <Grid className={ classes.center } item sm={ 6 }>
              <Typography className={ classes.cannedTitle }>Add Canned Responses</Typography>
              <br />
              <TextField
                helperText={
                  <Typography>
                    See the full list of icons&nbsp;
                    <a target='_blank' href='https://material.io/tools/icons/?style=baseline'>here</a>
                    .
                  </Typography>
                }
                InputProps={ { style: { fontSize: FONT_SIZE ? '24pt' : '' } } }
                label='Icon Name'
                onClick={ () => new TTS('Add canned response icon').speak() }
                placeholder='Icon Name'
                variant='outlined'
              />
            </Grid>
          </Grid>
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