import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Switch from '@material-ui/core/Switch';
import CustomHead from '../components/Head';
import TopNav from '../components/TopNav';
import { Check as CheckIcon, Settings as SettingsIcon } from '@material-ui/icons';

const Settings = () => {
  let setting;
  let checked;
  const [settings, setSettings] = useState({
    tts: false
  });
  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('login'));
    !credentials ? location.href = `${ location.href.split('/')[0] }/app` : null;
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : false;
    setSettings({
      tts: get('tts')
    });
  }, []);
  useEffect(() => {
    localStorage.setItem(setting, checked);
  }, [settings]);
  return (
    <>
      <CssBaseline />
      <CustomHead />
      <TopNav onLogout={ () => {
        localStorage.removeItem('login');
        location.href = `${ location.href.split('/')[0] }/app`;
      } } />
      <div className="settings-offset" />
      <SettingsIcon />
      &emsp;Settings
      <Grid container spacing={ 8 }>
        <Grid item sm={ 6 }>
          <Card>
            <CardContent>
              Text-to-Speech
            </CardContent>
            <CardActions>
              <Switch
                checked={ settings.tts }
                onChange={ () => {
                  setting = 'tts';
                  checked = !settings.tts;
                  setSettings({ ...settings, 'tts': checked });
                } }
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Link href="/app">
        <Button color="primary">
          <CheckIcon />
          &emsp;Apply
        </Button>
      </Link>
    </>
  );
};

export default Settings;