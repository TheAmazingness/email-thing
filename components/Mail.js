import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';

const Mail = props => {
  return (
    <Dialog fullScreen open={ props.open }>
      <DialogTitle>
        { props.message.subject }
      </DialogTitle>
      <DialogContent>
        <pre>
          { props.message.body }
        </pre>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button color="primary" onClick={ () => props.onClose() }>
          <CloseIcon />
          &emsp;Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Mail;