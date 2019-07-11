import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Mail from '../components/Mail';

const Main = props => {
  const [open, setOpen] = useState(false);
  return (
    <main>
      {
        props.data.map(message =>
          <div key={ Math.random() }>
            <Card className="mail-preview" raised>
              <CardActionArea className="preview-action-area" color="primary" onClick={ () => setOpen(true) }>
                <CardContent>
                  <h2>{ message.from.name }</h2>
                  <br />
                  <Divider />
                  <br />
                  <h1>{ message.subject }</h1>
                </CardContent>
              </CardActionArea>
            </Card>
            <Mail onClose={ () => setOpen(false) } open={ open } message={ message } />
          </div>
        )
      }
    </main>
  );
};

export default Main;