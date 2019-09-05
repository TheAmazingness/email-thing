import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { Close as CloseIcon, Mail as MailIcon, Mic as MicIcon, Send as SendIcon } from '@material-ui/icons';
import font from '../utils/font';
import buddyList from '../utils/buddyList';
import voiceEmail from '../utils/voiceEmail';
import canned from '../utils/canned';

const Compose = props => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState();
  const [body, setBody] = useState();
  const [voice, setVoice] = useState(0);
  const [compose, setCompose] = useState();
  const [reply, setReply] = useState();
  const [list, setList] = useState(
    <TextField
      disabled={ props.disabled }
      fullWidth
      label="To:"
      margin="normal"
      onChange={ e => setTo(e.target.value) }
      type="email"
      value={ props.to || to }
      variant="outlined"
    />
  );
  useEffect(() => {
    buddyList() && setList(
      <Select
        className="compose-select"
        disabled={ props.disabled }
        onChange={ e => setTo(e.target.value) }
        value={ props.to || to }
      >
        {
          JSON.parse(localStorage.getItem('buddyList')).map(el =>
            <MenuItem key={ el[1] } value={ el[1] }>{ el[0] }</MenuItem>
          )
        }
      </Select>
    );
  }, [to]);
  useEffect(() => {
    voice !== 0 && (async () => {
      let res = voiceEmail() || '';
      voice === 1 ? setSubject(res) : voice === 2 ? setBody(res) : null;
      setVoice(0);
    })();
  }, [voice]);
  useEffect(() => {
    let mic = !!localStorage.getItem('voiceEmail');
    setCompose(
      <Grid container spacing={ 8 }>
        <Grid item sm={ mic ? 5 : 6 }>{ list }</Grid>
        <Grid item sm={ mic ? 5 : 6 }>
          <TextField
            disabled={ props.disabled }
            fullWidth
            label="Subject"
            margin="normal"
            onChange={ e => setSubject(e.target.value) }
            type="text"
            value={ props.subject || subject }
            variant="outlined"
          />
        </Grid>
        {
          mic &&
          <Grid className="icon-wrap" item sm={ 2 }>
            <IconButton color="secondary">
              <MicIcon />
            </IconButton>
          </Grid>
        }
        <Grid item sm={ mic ? 10 : 12 }>
          <TextField
            fullWidth
            label="Body"
            margin="normal"
            multiline
            onChange={ e => setBody(e.target.value) }
            type="text"
            value={ body }
            variant="filled"
          />
        </Grid>
        {
          mic &&
          <Grid className="icon-wrap" item sm={ 2 }>
            <IconButton color="secondary">
              <MicIcon />
            </IconButton>
          </Grid>
        }
      </Grid>
    );
    canned() && setReply(
      <Grid container>
        <Grid item sm={ 12 }>
          <h1 data-size={ font() }>Quick Reply</h1>
        </Grid>
        {
          JSON.parse(localStorage.getItem('canned')).map(e =>
            <Grid item key={ e[0] } sm={ 2 }>
              <IconButton color="secondary" onClick={ () => setBody(e[1]) }>
                <Icon>{ e[0] }</Icon>
              </IconButton>
            </Grid>
          )
        }
      </Grid>
    );
  }, []);
  return (
    <Dialog fullWidth maxWidth="xl" onClose={ () => props.onClose() } open={ props.open }>
      <DialogTitle data-size={ font() }>
        <MailIcon />
        <span className="compose-title">&emsp;Send Email</span>
      </DialogTitle>
      <DialogContent>
        { compose }
        <br />
        { reply }
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={ () => props.onClose() }>
          <CloseIcon />
          &emsp;Cancel
        </Button>
        {
          ((!!subject  || props.disabled) && !!body) &&
          <Button
            color="primary"
            data-size={ font() }
            onClick={ () => { props.onSubmit([to, subject, body]); props.onClose(); } }
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