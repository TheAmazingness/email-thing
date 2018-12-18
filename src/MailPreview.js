import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

const style = theme => ({
  card: {
    padding: theme.spacing.unit * 3
  }
});

class MailPreview extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card raised={ true } className={ classes.card }>
        Mail Preview Element
      </Card>
    );
  }
}

export default withStyles(style)(MailPreview);