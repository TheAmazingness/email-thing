import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Close as CloseIcon, Mail as MailIcon, Send as SendIcon } from '@material-ui/icons';
import font from '../utils/font';
import buddyList from '../utils/buddyList';

const Compose = props => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  const [list, setList] = useState(
    <TextField
      fullWidth
      label="To:"
      margin="normal"
      onChange={ e => setTo(e.target.value) }
      variant="outlined"
      type="email"
    />
  );
  useEffect(() => {
    buddyList() && setList(
      <Select className="compose-select" onChange={ e => setTo(e.target.value) } value={ to }>
        {
          JSON.parse(localStorage.getItem('buddyList')).map(el =>
            <MenuItem key={ el } value={ el }>{ el }</MenuItem>
          )
        }
      </Select>
    );
  }, [to]);
  return (
    <Dialog fullWidth onClose={ () => props.onClose() } open={ props.open }>
      <DialogTitle data-size={ font() }>
        <MailIcon />
        <span className="compose-title">&emsp;Send Email</span>
      </DialogTitle>
      <DialogContent>
        { list }
        <br />
        <TextField
          fullWidth
          label="Subject"
          margin="normal"
          onChange={ e => setSubject(e.target.value) }
          variant="outlined"
          type="text"
        />
        <br />
        <TextField
          fullWidth
          label="Body"
          margin="normal"
          multiline
          onChange={ e => setBody(e.target.value) }
          variant="filled"
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={ () => props.onClose() }>
          <CloseIcon />
          &emsp;Cancel
        </Button>
        {
          (!!subject && !!body) &&
          <Button
            color="primary"
            data-size={ font() }
            onClick={ () => {
              props.onSubmit([to, subject, body]);
              props.onClose();
            } }
          >
            <SendIcon />
            &emsp;Send
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default Compose;