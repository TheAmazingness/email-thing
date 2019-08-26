import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const Whitelist = () => {
  const [state, setState] = useState([]);
  const [whitelist, setWhitelist] = useState([]);
  const del = email => setState(state.filter(el => el !== email));
  const handleChange = e => {
    if (e.key === 'Enter') {
      setState([...state, e.target.value]);
      e.target.value = '';
    }
  };
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) :[];
    setState(get('whitelist'));
    setWhitelist(get('whitelist').map((email, i) =>
      <p className="whitelist-list" key={ i } onClick={ () => del(email) }>{ email }</p>
    ));
  }, []);
  useEffect(() => {
    localStorage.setItem('whitelist', JSON.stringify(state));
    setWhitelist(state.map((email, i) =>
      <p className="whitelist-list" key={ i } onClick={ () => del(email) }>{ email }</p>
    ));
  }, [state]);
  return (
    <Card>
      <CardContent>
        <span className="settings-name">Whitelist</span>
        <br />
        <br />
        <Card>
          <CardContent className="whitelist">{ whitelist }</CardContent>
        </Card>
      </CardContent>
      <CardActions className="settings-action">
        <TextField
          fullWidth
          label="Add Email"
          margin="normal"
          onKeyUp={ handleChange }
          variant="outlined"
          type="email"
        />
      </CardActions>
    </Card>
  );
};

export default Whitelist;