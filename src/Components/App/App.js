import React, { Component } from 'react';
import {Switch} from 'react-router-dom';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import ListPage from '../ListPage/ListPage';
import AddNew from '../AddNew/AddNew';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import WorkoutPage from '../WorkoutPage/WorkoutPage';
import AppContext from '../../AppContext';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import TokenService from '../../services/token-service';
import { getAllWorkouts } from '../../services/workoutAPI';
import { getAllExercises } from '../../services/exercisesAPI';
import { getAllSets } from '../../services/setsAPI';
import './App.css'


class App extends Component {

  state = {
    workouts: [],
    exercises: [],
    sets: [],
    loading: true,
    windowSize: null
  }

  handleResize = e => {
    const windowSize = window.innerWidth;
    
    this.setState(prevState => {
      return {
        windowSize
      }
    });
  }


  async componentDidMount() {

    if (TokenService.hasAuthToken()) {
      const workouts = await getAllWorkouts();
      const exercises = await getAllExercises();
      const sets = await getAllSets();

      window.addEventListener("resize", this.handleResize);

      this.setState({ workouts, exercises, sets, loading: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleAddWorkout = workout => {
    const workouts = this.state.workouts;
    const index = workouts.findIndex(w => w.id === workout.id);

    if (index > -1) {
      workouts[index] = workout;
    } else {
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

  onLogoutSuccess = () => {
    this.setState({
      workouts: [],
      exercises: [],
      sets: []
    })
  }

  onLoginSuccess = async () => {
    const workouts = await getAllWorkouts();
    const exercises = await getAllExercises();
    const sets = await getAllSets();

    this.setState({ workouts, exercises, sets, loading: false });
  }

  isLoading = () => {
    this.setState({
      loading: true
    });
  }

  hasLoaded = () => {
    this.setState({
      loading: false
    });
  }

  render() {
    const value = {
      workouts: this.state.workouts,
      exercises: this.state.exercises,
      sets: this.state.sets,
      addWorkout: this.handleAddWorkout,
      addExercise: this.handleAddExercise,
      addSet: this.handleAddSets,
      deleteWorkout: this.handleDeleteWorkout,
      onLogoutSuccess: this.onLogoutSuccess,
      onLoginSuccess: this.onLoginSuccess,
      isLoading: this.isLoading,
      hasLoaded: this.hasLoaded,
      loading: this.state.loading,
      windowSize: this.state.windowSize
    }

    return (
      <AppContext.Provider value={value}>
        <div className='App'>
          <header className='App__header'>
            <Nav />
          </header>
          <main className='App__Main'>
            <Switch>
              <PublicOnlyRoute
                exact
                path='/'
                component={LandingPage}
              />
              <PublicOnlyRoute
                exact
                path='/login'
                component={LoginPage}
              />
              <PublicOnlyRoute
                exact
                path='/register'
                component={RegistrationForm}
              />
              <PrivateRoute
                exact
                path='/home'
                component={ListPage}
              />
              <PrivateRoute
                exact
                path='/addNew'
                component={AddNew}
              />
              <PrivateRoute
                exact
                path='/workout/:workoutId/edit'
                component={AddNew}
              />
              <PrivateRoute
                exact
                path='/workout/:workoutId'
                component={WorkoutPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;