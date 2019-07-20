import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { Check as CheckIcon, Settings as SettingsIcon } from '@material-ui/icons';

const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : false;

const Settings = props => {
  const [settings, setSettings] = useState({
    tts: get('tts')
  });
  const setState = s => e => {
    setSettings({ ...settings, [s]: e.target.checked });
    localStorage.setItem(s, e.target.checked);
  };
  return (
    <Dialog fullWidth onClose={ () => props.onClose() } open={ props.open }>
      <DialogTitle>
        <SettingsIcon />
        &emsp;Settings
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={ 8 }>
          <Grid item sm={ 6 }>
            <Card>
              <CardContent>
                Text-to-Speech
              </CardContent>
              <CardActions>
                <Switch checked={ settings.tts } onChange={ setState('tts') } value="tts" />
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        { /* TODO: Add confirmation */ }
        <Button color="primary" onClose={ () => props.onClose() }>
          <CheckIcon />
          &emsp;Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Settings;