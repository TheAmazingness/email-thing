import { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import CustomHead from '../utils/head';

const App = () => {
  const [load, setLoad] = useState(
    //<div className="load-wrap">
    //  <CircularProgress className="load-app"/>
    //</div>
    <>
      <TopNav />
      <SideNav />
      <Main />
    </>
  );
  // setLoad(
  //   <>
  //     <TopNav/>
  //     <SideNav/>
  //     <Main/>
  //   </>
  // );
  return (
    <div className="app">
      <CssBaseline />
      <CustomHead />
      { load }
    </div>
  );
};

export default App;