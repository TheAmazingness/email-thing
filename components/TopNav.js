import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const TopNav = props => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <img alt="AbleMail" className="name" src="../static/logo.png" />
        <Button color="secondary" onClick={ () => props.onLogout() } variant="outlined">
          <VpnKeyIcon />
          &emsp;Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;