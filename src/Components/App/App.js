import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Nav from '../Nav/Nav';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import ListPage from '../ListPage/ListPage';
import AddNew from '../AddNew/AddNew';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import WorkoutPage from '../WorkoutPage/WorkoutPage';
import AppContext from '../../AppContext';
import config from '../../config';

class App extends Component{

  state= {
    workouts: [],
    exercises: [],
    sets: []
  }

  componentDidMount(){
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/workouts`),
      fetch(`${config.API_ENDPOINT}/api/exercises`),
      fetch(`${config.API_ENDPOINT}/api/sets`)
    ])
    .then(([workoutsRes, exercisesRes, setsRes]) => {
      if(!workoutsRes.ok)
        return workoutsRes.json().then(e => Promise.reject(e));
      if(!exercisesRes.ok)
        return exercisesRes.json().then(e => Promise.reject(e));
      if(!setsRes.ok)
        return setsRes.json().then(e => Promise.reject(e));
      return Promise.all([workoutsRes.json(), exercisesRes.json(), setsRes.json()]);
      })
      .then(([workouts, exercises, sets]) => {
        this.setState({workouts, exercises, sets});
      })
      .catch(error => {
        console.error({error});
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

  handleAddSets = (sets, workoutId) => {
    let setList = this.state.sets.filter(set => set.workout_id !== workoutId);
    setList = [...setList, ...sets];
 
    this.setState({
      sets: setList
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