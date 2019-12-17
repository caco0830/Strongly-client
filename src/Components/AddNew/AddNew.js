import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './AddNew.css';
import uuid from 'uuid/v4';
import {getSets} from '../../helper';
import config from '../../config';

class AddNew extends Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
    //const workouts = context.workouts;
    //let exercises = context.exercises;
    //let sets = context.sets;
      this.state = {
        "error": null,
        "user_id": "",
        "exercises": [],
        "sets": [],
        "workout": {
          id: uuid(),
          title: '',
          createddate: new Date(),
          user_id: 1
        }
    }
  }

  componentDidMount(){
    if(this.props.match.params.workoutId){
      Promise.all([
        fetch(`${config.API_ENDPOINT}/api/workouts/${this.props.match.params.workoutId}`),
        fetch(`${config.API_ENDPOINT}/api/exercises?workout_id=${this.props.match.params.workoutId}`),
        fetch(`${config.API_ENDPOINT}/api/sets?workout_id=${this.props.match.params.workoutId}`)
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
      .then(([workout, exercises, sets]) => {
        this.setState({
          workout, 
          exercises, 
          sets});
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  nameChange(name) {
    let workout = this.state.workout;
    workout.title = name;
    this.setState({
      workout: workout
    });
  }

  updateExerciseName(title, index) {
    const exercises = this.state.exercises;
    exercises[index].title = title;

    this.setState({
      exercises: exercises
    });
  }

  updateSetWeight(weight, id){
    const sets = this.state.sets;
    sets[sets.findIndex(set => set.id === id)].weight = weight;

    this.setState({
      sets: sets
    });
  }

  updateSetReps(reps, id){
    const sets = this.state.sets;
    sets[sets.findIndex(set => set.id === id)].reps = reps;

    this.setState({
      sets: sets
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    this.postWorkout();
    

    // fetch(`${config.API_ENDPOINT}/api/workouts`, {
    //   method: 'POST',
    //   body: JSON.stringify(workout),
    //   headers:{
    //     'content-type': 'application/json'
    //   }
    // })
    // .then(res => {
    //   if(!res.ok){
    //     return res.json().then(error => {
    //       throw error;
    //     });
    //   }
    //   return res.json();
    // })
    // .then(data => {
    //   this.postExercises();
    //   this.context.addWorkout(data);
    //   this.props.history.push('/home');
    // })
    // .catch(error => {
    //   this.setState({error});
    // });
  }

  postWorkout(){

    const workout = this.state.workout;
    let method = 'POST';
    let workoutId = '';

    if(this.props.match.params.workoutId){
      method = 'PATCH';
      workoutId = `/${workout.id}`
    } 

    fetch(`${config.API_ENDPOINT}/api/workouts${workoutId}`, {
      method: method,
      body: JSON.stringify(workout),
      headers:{
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw error;
        });
      }
      return res.json();
    })
    .then(data => {
      this.postExercises();
      this.context.addWorkout(data);
      this.props.history.push('/home');
    })
    .catch(error => {
      this.setState({error});
    });

  }

  postExercises(){
    const exercises = this.state.exercises;

    

    if(exercises.length > 0){

      fetch(`${config.API_ENDPOINT}/api/exercises`, {
        method: 'POST',
        body: JSON.stringify(exercises),
        headers:{
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.context.addExercise(exercises);
        this.postSets();
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  postSets(){
    const sets = this.state.sets;

    if(sets.length > 0){

      fetch(`${config.API_ENDPOINT}/api/sets`, {
        method: 'POST',
        body: JSON.stringify(sets),
        headers:{
          'content-type': 'application/json'
        }
      })
      .then(res => {
        if(!res.ok){
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(data => {
        this.context.addSet(sets, this.state.workout.id);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }

  handleCancel = (e) => {
    this.props.history.push('/home');
  }

  addExercise = (e) => {
    
    e.preventDefault();
    this.setState({
      exercises: [
        ...this.state.exercises,
        { id: uuid(), workout_id: this.state.workout.id, title: ''}
      ]
    });
  }

  addSet = (e) => {
    e.preventDefault();
    const exerciseid = e.target.dataset.exerciseid
    this.setState({
      sets: [
        ...this.state.sets,
        { id:uuid(), reps: "", weight: "", exercise_id:exerciseid, workout_id: this.state.workout.id }
      ]
    });
  }

  handleRemoveSet = (setId) => {
    this.setState({
      sets: this.state.sets.filter(set => set.id !== setId)
    });
  }

  handleRemoveExercise(e,exId){
    e.preventDefault();
    
    this.setState({
      exercises: this.state.exercises.filter(ex => ex.id !== exId)
    });
  }

  renderExercises(exercises) {
    const sets = this.state.sets;
    return (
      <div className='AddNew__exercises-list'>
        {exercises.map((ex, index) => {
          return (
            <div key={`ex-${index}`} className='AddNew__exercises-entry'>
              <label htmlFor='exercise-name'>Exercise Name: </label>
              <input
                placeholder='Squat'
                type="text"
                name='exercise-name'
                value={ex.title}
                onChange={e => this.updateExerciseName(e.target.value, index)}
              />
              <button onClick={e => this.handleRemoveExercise(e, ex.id)}>Remove</button>
              {this.renderSets(sets, ex.id)}
            </div>
          );
        })}
        <button onClick={this.addExercise}>+ Add Exercise</button>
      </div>
    );
  }

  renderSets(sets, exerciseId) {
    //sets = sets.filter(set => set.exercise_id === exerciseId);
    sets = getSets(sets, exerciseId);

    return (
      <div className='AddNew__sets-list'>
        <div className='AddNew__sets-headers'>
          <div>Set</div>
          <div>Reps</div>
          <div>Lbs</div>
          <div>Actions</div>
        </div>
        {
          sets.map((set, index) => {
            return (
              <div key={`set-${set.id}`}className='AddNew__sets-entry'>
                <div>{index + 1}</div>
                <input
                  type='text'
                  name='set-reps'
                  value={set.reps}
                  onChange={e => this.updateSetReps(e.target.value, set.id)}
                />
                <input 
                  type='text'
                  name='set-weight'
                  value={set.weight}
                  onChange={e => this.updateSetWeight(e.target.value, set.id, index)}
                />
                
                <button onClick={() => this.handleRemoveSet(set.id)}>Remove</button>
              </div>
            );
          })
        }
        <button data-exerciseid={exerciseId} id="new" onClick={this.addSet}>+ Add Set</button>
      </div>
    );
  }

  render() {
    let exercises = this.state.exercises;
    return (
      
      <form onSubmit={this.handleSubmit}>
        <div className='AddNew__workout'>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.workout.title}
            onChange={e => this.nameChange(e.target.value)}
          />
          {this.renderExercises(exercises)}
        </div>
        <button type="submit">Save</button>
        <button type="cancel" onClick={this.handleCancel}>Cancel</button>
      </form >
    );
  }
}

export default AddNew;