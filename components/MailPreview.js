import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Mail from './Mail';
import font from '../utils/font';
import tts from '../utils/tts';

const MailPreview = props => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  useEffect(() => {
    open && tts('Open email');
    if (close) {
      setClose(false);
      tts('Clothes email');
    }
  });
  return (
    <div key={ Math.random() }>
      <Card className="mail-preview" raised>
        <CardActionArea className="preview-action-area" color="primary" onClick={ () => setOpen(true) }>
          <CardContent className="mp-content">
            <h2 className="mp-name" data-size={ font() }>{ props.message.from.name }</h2>
            <Divider />
            <h1 className="mp-subject" data-size={ font() }>{ props.message.subject }</h1>
          </CardContent>
        </CardActionArea>
      </Card>
      <Mail
        message={ props.message }
        onClose={ () => {
          setOpen(false);
          setClose(true);
        } }
        onHelp={ data => props.onHelp(data) }
        open={ open }
        onSend={ data => props.onSend(data) }
      />
    </div>
  );
};

export default MailPreview;