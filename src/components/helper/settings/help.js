import { postBody } from '../../../helper/fetch';
import { uri } from '../../../config/server';

const handleHelpClick = (mail, help) =>
  postBody(`${ uri }/settings/help`, {
    help,
    subject: `Help: ${ mail.body.subject }`,
    text: mail.body.textAsHtml ? mail.body.textAsHtml : mail.body.text
  });

export default handleHelpClick;