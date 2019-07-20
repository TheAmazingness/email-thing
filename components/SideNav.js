import { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Compose from './Compose';
import Settings from './Settings';
import { Mail as MailIcon, NoteAdd as NoteAddIcon, Settings as SettingsIcon } from '@material-ui/icons';

const SideNav = props => {
  const [open, setOpen] = useState({ compose: false, settings: false });
  const setState = (k, v) => setOpen({ ...open, [k]: v });
  return (
    <>
      <Drawer classes={ { paper: 'drawer-paper' } } className="drawer" variant="permanent">
        <List>
          {
            [
              ['Inbox', <MailIcon className="icon" />],
              ['Send Email', <NoteAddIcon className="icon" />, () => setState('compose', true)]
            ].map(info =>
                <span key={ info[0] }>
              <ListItem button onClick={ () => info[2] && info[2]() }>
                <ListItemIcon>{ info[1] }</ListItemIcon>
                <div className="drawer-list-separator" />
                <ListItemText className="sidenav-text" primary={ info[0] } />
              </ListItem>
              <br />
              <br />
            </span>
            )
          }
        </List>
        <Divider />
        <List>
          <ListItem button onClick={ () => setState('settings', true) }>
            <ListItemIcon><SettingsIcon className="icon" /></ListItemIcon>
            <div className="drawer-list-separator" />
            <ListItemText className="sidenav-text" primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Compose
        onClose={ () => setState('compose', false) }
        open={ open.compose }
        onSubmit={ data => props.onSend(data) }
      />
      <Settings onClose={ () => setState('settings', false) } open={ open.settings } />
    </>
  );
};

export default SideNav;