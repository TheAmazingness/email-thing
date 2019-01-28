// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import React from 'react';
// React ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
import Card from '@material-ui/core/Card';
// import Mail from './Mail';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
// Material UI ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
// Imports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Imports //

// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //
const
  FONT_SIZE = JSON.parse(window.localStorage.getItem('fontSize') || false),
  style = theme => ({
    card: {
      padding: theme.spacing.unit * 5
    },
    from: {
      fontSize: FONT_SIZE ? '60pt' : '30pt'
    },
    email: {
      fontSize: FONT_SIZE ? '28pt' : '14pt'
    },
    subject: {
      fontSize: FONT_SIZE ? '80pt' : '40pt',
      fontWeight: FONT_SIZE ? 'bold' : ''
    }
  });
// Constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Constants //

// MailPreview Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailPreview Component//
class MailPreview extends React.Component {
  /** render */
  render() {
    const { classes } = this.props;
    this.from = this.props.result.payload.headers.filter(el => el.name === 'From')[0].value.split('<');
    this.subject = this.props.result.payload.headers.filter(el => el.name === 'Subject')[0].value;
    return (
      <Card raised className={ classes.card }>
        <Typography className={ classes.from }>From: { this.from[0] }</Typography>
        <br />
        <Typography className={ classes.email }>{ `<${ this.from[1] }` }</Typography>
        <br />
        <Typography className={ classes.subject }>{ `${ this.subject }` }</Typography>
        <br />
        {/*<Typography>{ MailPreview.htmlDecode(this.props.snippet) }...</Typography>*/}
        <br />
        <br />
      </Card>
    );
  }
  // render ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
}
// MailPreview Component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ MailPreview Component//

// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //
export default withStyles(style)(MailPreview);
// Export ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Export //