import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Close as CloseIcon, Mail as MailIcon, Send as SendIcon } from '@material-ui/icons';
import font from '../utils/font';

const Compose = props => {
  const [to, setTo] = useState();
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  return (
    <Dialog fullWidth onClose={ () => props.onClose() } open={ props.open }>
      <DialogTitle data-size={ font() }>
        <MailIcon />
        &emsp;Send Email
      </DialogTitle>
      <DialogContent>
        { /* TODO: Temporary fix, will make into dropdown select */ }
        <TextField
          fullWidth
          label="To:"
          margin="normal"
          onChange={ e => setTo(e.target.value) }
          variant="outlined"
          type="email"
        />
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
        <Button color="primary" onClose={ () => props.onClose() }>
          <CloseIcon />
          &emsp;Cancel
        </Button>
        {
          (!!subject && !!body) &&
          <Button color="primary" data-size={ font() } onClick={ () => { props.onSubmit([to, subject, body]); props.onClose(); } }>
            <SendIcon />
            &emsp;Send
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default Compose;