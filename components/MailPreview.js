import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Mail from './Mail';

const MailPreview = props => {
  const [open, setOpen] = useState(false);
  return (
    <div key={ Math.random() }>
      <Card className="mail-preview" raised>
        <CardActionArea className="preview-action-area" color="primary" onClick={ () => setOpen(true) }>
          <CardContent>
            <h2>{ props.message.from.name }</h2>
            <br />
            <Divider />
            <br />
            <h1>{ props.message.subject }</h1>
          </CardContent>
        </CardActionArea>
      </Card>
      <Mail message={ props.message } onClose={ () => setOpen(false) } open={ open } />
    </div>
  );
};

export default MailPreview;