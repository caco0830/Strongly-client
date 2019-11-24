import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';

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
  
  
          </Switch>
        </main>
  
  
  
      </div>
      
    );
  }
}

export default App;