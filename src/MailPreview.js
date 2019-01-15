import React from 'react';
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Mail from './Mail';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import Typography from "@material-ui/core/Typography";
import { speak } from './Voice';
import { withStyles } from '@material-ui/core/styles';

const icon = JSON.parse(window.localStorage.getItem('icon'));
const style = theme => ({
  card: {
    padding: theme.spacing.unit * 5
  },
  date: {
    lineHeight: 2
  },
  open: {
    fontSize: icon ? '60pt' : '40pt'
  }
});

class MailPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  static htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  static mime(payload) {
    // Needs to be optimized later
    return payload.body.data || MailPreview.mime(payload.parts.filter((el) => el.mimeType === 'text/html' || el.mimeType === 'multipart/alternative' || el.mimeType === 'multipart/related')[0]);
  }

  handleClick(bool) {
    this.setState({
      open: bool
    });
  }

  render() {
    const { classes } = this.props;
    this.from = this.props.payload.headers.filter(el => el.name === 'From')[0].value.split('<');
    this.subject = this.props.payload.headers.filter(el => el.name === 'Subject')[0].value;
    this.data = atob(MailPreview.mime(this.props.payload).replace(/_/g, '/').replace(/-/g, '+'));
    this.props.mailData(`From ${ this.from[0] }. ${ this.subject }.`);
    return (
      <Card raised className={ classes.card }>
        <Typography variant='h3' onClick={ () => speak(`From ${ this.from[0] }`) }>From: { this.from[0] }</Typography>
        <br />
        <Typography variant='h6' onClick={ () => speak(this.from[1]) }>{ `<${ this.from[1] }` }</Typography>
        <br />
        <Typography variant='h2'  onClick={ () => speak(this.subject) }>{ `${ this.subject }` }</Typography>
        <br />
        <Typography variant='h5' onClick={ () => speak(MailPreview.htmlDecode(this.props.snippet)) }>{ MailPreview.htmlDecode(this.props.snippet) }...</Typography>
        <br />
        <br />
        <Grid container spacing={ 24 }>
          <Grid item sm={ 9 }>
            <Button variant='contained' onClick={ () => { this.handleClick(true); speak('Open email'); } } size='large' color='primary' fullWidth>
              <OpenInBrowserIcon className={ classes.open } />&emsp;
              Open Email
            </Button>
          </Grid>
          <Grid item sm={ 3 }>
            <IconButton aria-label='Delete' color='primary' onClick={ () => this.props.trash() }>
              <DeleteForeverIcon className={ classes.open } />
            </IconButton>
          </Grid>
        </Grid>
        <Mail open={ this.state.open } func={ (bool) => this.handleClick(bool) } onClose={ () => this.handleClick(false) } subject={ this.subject } data={ this.data } from={ this.from[0] } address={ this.from[1] } />
      </Card>
    );
  }
}

export default withStyles(style)(MailPreview);