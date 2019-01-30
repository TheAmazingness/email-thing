// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Mail from './Mail';
// Other ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize') || false),
  style = theme => ({
    from: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    email: {
      fontSize: FONT_SIZE ? '0pt' : '12pt'
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    gridIcon: {
      display: 'grid',
      textAlign: 'center'
    },
    icon: {
      fontSize: FONT_SIZE ? '90pt' : '60pt'
    },
    iconButton: {
      margin: 'auto'
    },
    open: {
      fontSize: FONT_SIZE ? '45pt' : '30pt'
    },
    openIcon: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    },
    padding: {
      padding: theme.spacing.unit * 5
    },
    snippet: {
      fontSize: FONT_SIZE ? '36pt' : '24pt'
    },
    subject: {
      fontSize: FONT_SIZE ? '60pt' : '40pt'
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// MailPreview Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailPreview Component//
class MailPreview extends React.Component {
  /** constructor */
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  // constructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** static htmlDecode
   * @desc HTML decodes a string
   * @param input
   * @returns { string }
   */
  static htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }
  // static htmlDecode ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  /** render */
  render() {
    const { classes } = this.props;
    this.from = this.props.result.payload.headers.filter(e => e.name === 'From')[0].value.split('<');
    this.subject = this.props.result.payload.headers.filter(e => e.name === 'Subject')[0].value;
    return (
      <Card className={ classes.padding } raised>
        <Grid container spacing={ 8 }>
          <Grid item sm={ 8 }>
            <Typography className={ classes.from }>From: { this.from[0] }</Typography>
          </Grid>
          <Grid className={ classes.grid } item sm={ 4 }>
            <Typography className={ classes.email }>{ `<${ this.from[1] }` }</Typography>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <Typography className={ classes.subject }>{ `${ this.subject }` }</Typography>
        <br />
        <Typography className={ classes.snippet }>{ MailPreview.htmlDecode(this.props.result.snippet) }...</Typography>
        <br />
        <br />
        <Grid container spacing={ 16 }>
          <Grid item sm={ 10 }>
            <Button
              className={ classes.padding }
              color='primary'
              fullWidth
              onClick={ () => this.setState({ open: true }) }
              size='large'
              variant='contained'
            >
              <Icon className={ classes.openIcon }>open_in_browser</Icon>
              &emsp;
              <Typography className={ classes.open } variant='inherit'>Open Email</Typography>
            </Button>
          </Grid>
          <Grid className={ classes.gridIcon } item sm={ 2 }>
            <IconButton className={ classes.iconButton } color='primary'>
              <Icon className={ classes.icon }>delete_forever</Icon>
            </IconButton>
          </Grid>
        </Grid>
        <Mail
          close={ () => this.setState({ open: false }) }
          data={ this.props.result.payload.body.data || this.props.result.payload.parts }
          from={ this.from[0] }
          open={ this.state.open }
          subject={ this.subject }
        />
      </Card>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// MailPreview Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailPreview Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(MailPreview);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //