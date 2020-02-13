import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import Mail from './components/mail/Mail';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Compose from './components/mail/Compose';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/*<section className="hero is-primary is-fullheight">*/}
        {/*  <Navbar />*/}
        {/*</section>*/}
        <Navbar />
        <Switch>
          <Route exact path="/inbox" component={ Dashboard } />
          <Route path="/message/:id" component={ Mail } />
          <Route path="/signin" component={ SignIn } />
          <Route path="/signup" component={ SignUp } />
          <Route path="/compose" component={ Compose } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
