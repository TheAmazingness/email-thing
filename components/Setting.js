import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Switch from '@material-ui/core/Switch';

const Setting = props => {
  const [state, setState] = useState(false);
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : false;
    setState(get(props.name));
  }, []);
  useEffect(() => { localStorage.setItem(props.name, state) }, [state]);
  const handleChange = e => setState(e.target.checked);
  return (
    <Card>
      <CardContent className="settings-name">{ props.children }</CardContent>
      <CardActions className="settings-action">
        <Switch
          checked={ state }
          onChange={ handleChange }
        />
      </CardActions>
    </Card>
  );
};

export default Setting;