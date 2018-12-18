import React from 'react';
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
      <div>

      </div>
    );
  }
}

export default withStyles(style)(MailPreview);