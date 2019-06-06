import Link from 'next/Link';
import { withStyles } from '@material-ui/core';
import style from '../utils/style.json';

const Index = props => {
  const { classes } = props;
  document.title = 'AbleMail';
  return (
    <div className={ classes.app }>
      <Link href='/app'>
        <button>yeetus</button>
      </Link>
    </div>
  );
};

export default withStyles(style)(Index);