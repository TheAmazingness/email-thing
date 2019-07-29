import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import { Close as CloseIcon, Feedback as FeedbackIcon } from '@material-ui/icons';
import font from '../utils/font';
import help from '../utils/help';

const Mail = props => {
  return (
    <Dialog className="mail-dialog" fullScreen open={ props.open }>
      <DialogTitle data-size={ font() }>
        { props.message.subject }
      </DialogTitle>
      <DialogContent className="mail-content" dangerouslySetInnerHTML={ { __html: props.message.body } } />
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
        <Button className="mail-close" color="primary" onClick={ () => props.onClose() }>
          <CloseIcon />
          &emsp;Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Mail;