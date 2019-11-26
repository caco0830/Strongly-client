import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

class App extends Component{
  
  render(){
    return (
      <div className='App'>
        <header className='App__header'>
          <Nav />
        </header>
        <main className='App'>
          <Switch>
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/login'}
              component={LoginPage}
            />
            <Route
              exact
              path={'/register'}
              component={RegistrationForm}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;