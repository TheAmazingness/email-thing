import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

const Canned = () => {
  const [state, setState] = useState([]);
  const [canned, setCanned] = useState([]);
  const [icon, setIcon] = useState('');
  const del = email => setState(state.filter(el => el !== email));
  const handleEmail = e => {
    if (e.key === 'Enter') {
      setState([ ...state, [icon, e.target.value] ]);
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
      setIcon('');
    }
  };
  const handleName = e => {
    if (e.key === 'Enter') {
      setIcon(e.target.value);
    }
  };
  useEffect(() => {
    const get = item => !!localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) :[];
    setState(get('canned'));
    setCanned(get('canned').map((res, i) =>
      <Grid container key={ i }>
        <Grid className="icon-wrap" item sm={ 6 }>
          <Icon className="list" onClick={ () => del(res) }>{ res[0] }</Icon>
        </Grid>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(res) }>{ res[1] }</p>
        </Grid>
      </Grid>
    ));
  }, []);
  useEffect(() => {
    localStorage.setItem('canned', JSON.stringify(state));
    setCanned(state.map((res, i) =>
      <Grid container key={ i }>
        <Grid className="icon-wrap" item sm={ 6 }>
          <Icon className="list" onClick={ () => del(res) }>{ res[0] }</Icon>
        </Grid>
        <Grid className="center" item sm={ 6 }>
          <p className="list" onClick={ () => del(res) }>{ res[1] }</p>
        </Grid>
      </Grid>
    ));
  }, [state]);
  return (
    <Card>
      <CardContent>
        <span className="settings-name">Canned Responses</span>
        <br />
        <br />
        <Card>
          <CardContent>{ canned }</CardContent>
        </Card>
      </CardContent>
      <CardActions className="settings-action">
        <Grid container>
          <Grid item sm={ 5 }>
            <TextField
              fullWidth
              helperText={
                <>
                  Press <kbd>Enter</kbd> to continue
                  <br />
                  <br />
                  List of icons can be found <a href="https://material.io/resources/icons/" target="_blank">here</a>.
                </>
              }
              label="Icon Name"
              margin="normal"
              onKeyUp={ handleName }
              type="text"
              variant="outlined"
            />
          </Grid>
          {
            icon !== '' &&
            <>
              <Grid item sm={ 2 } />
              <Grid item sm={ 5 }>
                <TextField
                  autoFocus
                  fullWidth
                  helperText={ <>Press <kbd>Enter</kbd> to submit</> }
                  label="Response"
                  margin="normal"
                  multiline
                  onKeyUp={ handleEmail }
                  type="text"
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

export default Canned;