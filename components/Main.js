import CircularProgress from '@material-ui/core/CircularProgress';
import { useState, useEffect } from 'react';


const Main = () => {
  let [main, setMain] = useState(<CircularProgress color="secondary" className="main-load" />);
  return (
    <main>
      { main }
    </main>
  );
};

export default Main;