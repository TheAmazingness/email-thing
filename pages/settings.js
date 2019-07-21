import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [body, setBody] = useState(
    <div className="load-wrap">
      <CircularProgress className="load-app" />
    </div>
  );
  const [settings, setSettings] = useState({
    tts: false
  });
  useEffect(() => {
    const credentials = JSON.parse(localStorage.getItem('login'));
    if (!credentials) {
      location.href = `${ location.href.split('/')[0] }/app`;
    } else {
      setBody(
        <>
          <CssBaseline />
          <CustomHead />
          <TopNav onLogout={ () => {
            localStorage.removeItem('login');
            location.href = `${ location.href.split('/')[0] }/app`;
          } } />
          <div className="settings-offset" />
          <Grid className="settings-body" container spacing={ 8 }>
            <Grid className="settings-title" item sm={ 12 }>
              <SettingsIcon className="settings-icon" />
              &emsp;Settings
            </Grid>
            <Grid item sm={ 4 }>
              <Card>
                <CardContent className="settings-name">
                  Text-to-Speech
                </CardContent>
                <CardActions className="settings-action">
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
            <Grid className="settings-apply" item sm={ 12 }>
              <Link href="/app">
                <Button color="primary" size="large" variant="outlined">
                  <CheckIcon />
                  &emsp;Apply
                </Button>
              </Link>
            </Grid>
          </Grid>
        </>
      );
      const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : false;
      setSettings({
        tts: get('tts')
      });
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(setting, checked);
  }, [settings]);
  return (
    <>
      <CssBaseline />
      { body }
    </>
  );
};

export default Settings;