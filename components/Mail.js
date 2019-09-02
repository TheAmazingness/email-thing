import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { Close as CloseIcon, Feedback as FeedbackIcon, Reply as ReplyIcon } from '@material-ui/icons';
import Compose from './Compose';
import font from '../utils/font';
import help from '../utils/help';
import tts from '../utils/tts';
import canned from '../utils/canned';

const Mail = props => {
  const [read, setRead] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (read) {
      tts(window.getSelection().toString() !== '' ?
        window.getSelection().toString() :
        document.getElementsByClassName('mail-content')[0].innerText
      );
      setRead(false);
    }
  }, [read]);
  return (
    <>
      <Dialog className="mail-dialog" fullScreen open={ props.open }>
        <DialogTitle className="mail-subject" data-size={ font() } onClick={ () => tts(props.message.subject) }>
          { props.message.subject }
        </DialogTitle>
        <DialogContent
          className="mail-content"
          dangerouslySetInnerHTML={ { __html: props.message.body } }
          onClick={ () => setRead(true) }
        />
        <Divider />
        <DialogActions>
          {
            help() && (
              <Button className="mail-close" color="secondary" onClick={ () => props.onHelp(props.message) }>
                <FeedbackIcon />
                &emsp;Send Help Email
              </Button>
            )
          }
          <Button className="mail-close" color="secondary" onClick={ () => setOpen(true) }>
            <ReplyIcon />
            &emsp;Reply
          </Button>
          <Button className="mail-close" color="primary" onClick={ () => props.onClose() }>
            <CloseIcon />
            &emsp;Close
          </Button>
        </DialogActions>
      </Dialog>
      <Compose
        onClose={ () => setOpen(false) }
        disabled
        open={ open }
        onSubmit={ data => props.onSend(data) }
        subject={ `RE: ${ props.message.subject }` }
        to={ props.message.from.address }
      />
    </>
  );
};

export default Mail;