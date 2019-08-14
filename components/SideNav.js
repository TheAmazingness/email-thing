import { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Compose from './Compose';
import { Mail as MailIcon, Mic as MicIcon, NoteAdd as NoteAddIcon, Settings as SettingsIcon } from '@material-ui/icons';

const SideNav = props => {
  const [open, setOpen] = useState(props.voice);
  return (
    <>
      <Drawer classes={ { paper: 'drawer-paper' } } className="drawer" variant="permanent">
        <List>
          {
            [
              ['Inbox', <MailIcon className="icon" />],
              ['Send Email', <NoteAddIcon className="icon" />, () => setOpen(true)],
              ['Voice Command', <MicIcon className="icon" />, () => props.command()]
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
          <Link as="/app" href="/settings">
            <ListItem button>
              <ListItemIcon><SettingsIcon className="icon" /></ListItemIcon>
              <div className="drawer-list-separator" />
              <ListItemText className="sidenav-text" primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Compose
        onClose={ () => setOpen(false) }
        open={ open }
        onSubmit={ data => props.onSend(data) }
      />
    </>
  );
};

export default SideNav;