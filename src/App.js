import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import style from './style';
import { withStyles } from '@material-ui/styles';

function App(props) {
  const { classes } = props;
  const [loaded, setLoaded] = useState(<CircularProgress color="secondary" />);
  return (
    <div className={ classes.app }>
      <CssBaseline/>
      { loaded }
    </div>
  );
}

export default withStyles(style)(App);
