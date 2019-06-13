import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';

const TopNav = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img alt="AbleMail" className="name" src="../static/logo.png"/>
        <Button className="auth" color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;