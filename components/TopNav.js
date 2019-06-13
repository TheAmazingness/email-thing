import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const TopNav = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img alt="AbleMail" className="name" src="../static/logo.png"/>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;