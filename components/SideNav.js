import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Mail as MailIcon, NoteAdd as NoteAddIcon, Settings as SettingsIcon } from '@material-ui/icons';

const SideNav = () => {
  return (
    <Drawer classes={ { paper: 'drawer-paper' } } className="drawer" variant="permanent">
      <div className="drawer-offset" />
      <List>
        { [
            ['Inbox', <MailIcon className="icon" />],
            ['Send email', <NoteAddIcon className="icon" />]
          ].map(info => (
            <ListItem button key={ info[0] }>
              <ListItemIcon>{ info[1] }</ListItemIcon>
              <div className="drawer-list-separator" />
              <ListItemText className="sidenav-text" primary={ info[0] } />
              <div className="drawer-offset" />
            </ListItem>
          ))
        }
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon><SettingsIcon className="icon" /></ListItemIcon>
          <div className="drawer-list-separator" />
          <ListItemText className="sidenav-text" primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideNav;