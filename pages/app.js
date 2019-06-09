import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Main from '../components/Main';
import style from '../utils/style';

const App = () => {
  document.title = 'AbleMail';
  return (
    <div className="app">
      <TopNav/>
      <SideNav/>
      <Main/>
      <style global="true">{ style }</style>
    </div>
  );
};

export default App;