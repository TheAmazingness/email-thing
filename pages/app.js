import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import { withStyles } from '@material-ui/core';
import style from '../utils/style.json';

const App = props => {
  const { classes } = props;
  document.title = 'AbleMail';
  return (
    <div className={classes.app}>
      <TopNav/>
      <SideNav/>
      <Main/>
    </div>
  );
};

export default withStyles(style)(App);