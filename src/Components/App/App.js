import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from '../Nav/Nav';
//import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import ListPage from '../ListPage/ListPage';
import AddNew from '../AddNew/AddNew';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import WorkoutPage from '../WorkoutPage/WorkoutPage';
import data from '../../dummy-data';
import AppContext from '../../AppContext';

class App extends Component{

  state= {
    workouts: [],
    exercises: [],
    sets: []
  }

  componentDidMount(){
    this.setState({
      workouts: data.workouts,
      exercises: data.exercises,
      sets: data.sets
    });
  }

  handleAddWorkout = workout => {
    const workouts = this.state.workouts;
    const index = workouts.findIndex(w => w.id === workout.id);
    
    if(index > -1){
      workouts[index] = workout;
    }else{
      workouts.push(workout);
    }
    
    this.setState({
      workouts
    });
  }

  handleAddExercise = (exercises, workoutId) => {
    let exerciseList = this.state.exercises.filter(ex => ex.workout_id !== workoutId);

    exerciseList = [...exerciseList, ...exercises];

    this.setState({
      exercises: exerciseList
    });
  }

  handleAddSets = sets => {
    console.log(sets);
    this.setState({
      sets: sets
    });
  }

  handleDeleteWorkout = workoutId => {
    this.setState({
      workouts: this.state.workouts.filter(workout => workout.id !== workoutId)
    });
  }

  render(){
    const value = {
      workouts: this.state.workouts,
      exercises: this.state.exercises,
      sets: this.state.sets,
      addWorkout: this.handleAddWorkout,
      addExercise: this.handleAddExercise,
      addSet: this.handleAddSets,
      deleteWorkout: this.handleDeleteWorkout
    }

    return (
      <AppContext.Provider value={value}>
        <div className='App'>
          <header className='App__header'>
            <Nav />
          </header>
          <main className='App'>
            <Switch>
              <Route
                exact
                path='/'
                component={LandingPage}
              />
              <Route
                exact
                path='/login'
                component={LoginPage}
              />
              <Route
                exact
                path='/register'
                component={RegistrationForm}
              />
              <Route
                exact
                path='/home'
                component={ListPage}
              />
              <Route
                exact
                path='/addNew'
                component={AddNew}
              />
              <Route
                exact
                path='/workout/:workoutId/edit'
                component={AddNew}
              />
              <Route 
                exact
                path='/workout/:workoutId'
                component={WorkoutPage}/>
            </Switch>
          </main>
          {/* <Footer /> */}
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;