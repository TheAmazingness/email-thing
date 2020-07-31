import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const BuddyList = () => {
  const [state, setState] = useState([]);
  const [buddyList, setBuddyList] = useState([]);
  const [name, setName] = useState('');
  const del = email => setState(state.filter(el => el !== email));
  const handleEmail = e => {
    if (e.key === 'Enter') {
      setState([ ...state, [name, e.target.value] ]);
      e.target.value = '';
      e
        .target
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .firstElementChild
        .firstElementChild
        .lastElementChild
        .lastElementChild
        .value = '';
      setName('');
    }
  };
  const handleName = e => {
    if (e.key === 'Enter') {
      setName(e.target.value);
    }
  };
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) :[];
    setState(get('buddyList'));
    setBuddyList(get('buddyList').map((email, i) =>
      <Grid container key={ i }>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(email) }>{ email[0] }</p>
        </Grid>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(email) }>{ email[1] }</p>
        </Grid>
      </Grid>
    ));
  }, []);
  useEffect(() => {
    localStorage.setItem('buddyList', JSON.stringify(state));
    setBuddyList(state.map((email, i) =>
      <Grid container key={ i }>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(email) }>{ email[0] }</p>
        </Grid>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(email) }>{ email[1] }</p>
        </Grid>
      </Grid>
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
        <Grid container>
          <Grid item sm={ 5 }>
            <TextField
              fullWidth
              helperText={ <>Press <kbd>Enter</kbd> to continue</> }
              label="Add Name"
              margin="normal"
              onKeyUp={ handleName }
              type="text"
              variant="outlined"
            />
          </Grid>
          {
            name !== '' &&
            <>
              <Grid item sm={ 2 } />
              <Grid item sm={ 5 }>
                <TextField
                  autoFocus
                  fullWidth
                  helperText={ <>Press <kbd>Enter</kbd> to submit</> }
                  label="Add Email"
                  margin="normal"
                  onKeyUp={ handleEmail }
                  type="email"
                  variant="outlined"
                />
              </Grid>
            </>
          }
        </Grid>
      </CardActions>
    </Card>
  );
};

export default BuddyList;