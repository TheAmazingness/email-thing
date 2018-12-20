import React from 'react';
import Card from '@material-ui/core/Card';
import { speak } from './Voice';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  card: {
    padding: theme.spacing.unit * 5
  }
});

class MailPreview extends React.Component {
  static htmlDecode(input){
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }

  render() {
    const { classes } = this.props;
    this.props.headers.forEach((e) => {
      if (e.name === 'From') {
        this.from = e.value.split('<');
      }
      if (e.name === 'Subject') {
        this.subject = e.value;
      }
    });
    return (
      <Card raised={ true } className={ classes.card }>
        <Typography variant='h3' onClick={ () => speak(`From ${ this.from[0] }`) }>From: { this.from[0] }</Typography>
        <br />
        <Typography variant='h4' onClick={ () => speak(this.from[1]) }>{ `<${ this.from[1] }` }</Typography>
        <br />
        <Typography variant='h2'  onClick={ () => speak(this.subject) }>{ `${ this.subject }` }</Typography>
        <br />
        <Typography variant='h5' onClick={ () => speak(MailPreview.htmlDecode(this.props.snippet)) }>{ MailPreview.htmlDecode(this.props.snippet) }...</Typography>
      </Card>
    );
  }
}

export default withStyles(style)(MailPreview);