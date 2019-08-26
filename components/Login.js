import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const Login = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [keep, setKeep] = useState(true);
  const setState = s => e => {
    s(e.target.value);
    if (e.key === 'Enter' && (!!email && !!password)) {
      props.onSubmit([email, password, keep]);
    }
  };
  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      fullWidth
      open={ props.open }
    >
      <DialogTitle id="form-dialog-title">
        <VpnKeyIcon />
        &emsp;Sign in
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          onKeyUp={ setState(setEmail) }
          variant="outlined"
          type="email"
        />
        <br />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          onKeyUp={ setState(setPassword) }
          variant="outlined"
          type="password"
        />
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={
            <Checkbox
              checked={ keep }
              onChange={ () => setKeep(!keep) }
              value="keep"
              inputProps={{
                'aria-label': 'secondary checkbox',
              }}
            />
          }
          label="Keep me logged in"
        />
        {
          (!!email && !!password) &&
          <Button color="primary" onClick={ () => props.onSubmit([email, password, keep]) }>
            Login
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default Login;