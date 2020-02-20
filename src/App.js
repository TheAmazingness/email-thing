import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GoogleDashboard from './components/pages/GoogleDashboard';
import Navbar from './components/layout/Navbar';
import Mail from './components/mail/Mail';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Compose from './components/mail/Compose';
import LandingPage from './components/layout/LandingPage';
import About from './components/pages/About';
import Settings from './components/pages/Settings';
import GoogleTokenSaver from './components/helper/GoogleTokenSaver';
import IdSaver from './components/helper/IdSaver';
import Dashboard from './components/pages/Dashboard';
import GoogleMail from './components/mail/GoogleMail';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={ LandingPage } />
        <Route path="/inbox/google/:profile" component={ GoogleTokenSaver } />
        <Route path="/inbox/google" component={ GoogleDashboard } />
        <Route path="/inbox/:profile" component={ IdSaver } />
        <Route path="/inbox" component={ Dashboard } />
        <Route path="/message/google/:id" component={ GoogleMail } />
        <Route path="/message/:id" component={ Mail } />
        <Route path="/signin" component={ SignIn } />
        <Route path="/signup" component={ SignUp } />
        <Route path="/compose" component={ Compose } />
        <Route path="/about" component={ About } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App;
