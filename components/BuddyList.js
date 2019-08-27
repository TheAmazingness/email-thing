import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const BuddyList = () => {
  const [state, setState] = useState([]);
  const [buddyList, setBuddyList] = useState([]);
  const del = email => setState(state.filter(el => el !== email));
  const handleChange = e => {
    if (e.key === 'Enter') {
      setState([...state, e.target.value]);
      e.target.value = '';
    }
  };
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) :[];
    setState(get('buddyList'));
    setBuddyList(get('buddyList').map((email, i) =>
      <p className="list" key={ i } onClick={ () => del(email) }>{ email }</p>
    ));
  }, []);
  useEffect(() => {
    localStorage.setItem('buddyList', JSON.stringify(state));
    setBuddyList(state.map((email, i) =>
      <p className="list" key={ i } onClick={ () => del(email) }>{ email }</p>
    ));
  }, [state]);
  return (
    <Card>
      <CardContent>
        <span className="settings-name">Buddy List</span>
        <br />
        <br />
        <Card>
          <CardContent>{ buddyList }</CardContent>
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

export default BuddyList;