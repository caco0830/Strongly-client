import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './AddNew.css';
import uuid from 'uuid/v4';
import {findWorkout, getExercises, getSets} from '../../helper';

class AddNew extends Component {

  static contextType = AppContext;

  constructor(props, context) {
    super(props);
    const workouts = context.workouts;
    let exercises = context.exercises;
    let sets = context.sets;
        
    const workoutId = this.props.match.params.workoutId;
    const workout = findWorkout(workouts, workoutId)
    exercises = getExercises(exercises, workoutId);
      

    if(workoutId && workout){
      this.state = {
        "error": null,
        "workout_id": workoutId,
        "name": workout.name,
        "user_id": workout.user_id,
        "exercises": exercises,
        "sets": sets,
        "date": workout.createdDate
      }
    }else{
      this.state = {
        "error": null,
        "workout_id": uuid(),
        "name": "",
        "user_id": "",
        "exercises": [],
        "sets": [],
        "date": new Date()
      }
    }
  }

  nameChange(name) {
    this.setState({
      name
    });
  }

  updateExerciseName(name, index) {
    const exercises = this.state.exercises;
    exercises[index].name = name;

    this.setState({
      exercises: exercises
    });
  }

  updateSetWeight(weight, id, index){
    const sets = this.state.sets;
    sets[sets.findIndex(set => set.id === id)].weight = weight;
    
 
    sets[sets.findIndex(set => set.id === id)].set_number = index+1;

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

    const workout = {
      id: this.state.workout_id,
      name: e.target.name.value,
      createdDate: this.state.date,
      user_id: 1
    }

    this.setState({
      error: null
    });



    this.context.addWorkout(workout);
    this.context.addExercise(this.state.exercises, workout.id);
    this.context.addSet(this.state.sets);
    this.props.history.push('/home');
  }

  handleCancel = (e) => {
    this.props.history.push('/home');
  }

  addExercise = (e) => {

    e.preventDefault();
    this.setState({
      exercises: [
        ...this.state.exercises,
        { id: uuid(), workout_id: this.state.workout_id, name: '', user_id: '1' }
      ]
    });
  }

  addSet = (e) => {
    e.preventDefault();
    const exerciseid = e.target.dataset.exerciseid
    this.setState({
      sets: [
        ...this.state.sets,
        { id:uuid(), set_number: "", reps: "", weight: "", exercise_id:exerciseid }
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
                value={ex.name}
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
          <div>Lbs</div>
          <div>Reps</div>
          <div>Actions</div>
        </div>
        {
          sets.map((set, index) => {
            return (
              <div key={`set-${set.id}`}className='AddNew__sets-entry'>
                <div>{index + 1}</div>
                <input 
                  type='text'
                  name='set-weight'
                  value={set.weight}
                  onChange={e => this.updateSetWeight(e.target.value, set.id, index)}
                />
                <input
                  type='text'
                  name='set-reps'
                  value={set.reps}
                  onChange={e => this.updateSetReps(e.target.value, set.id)}
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
            value={this.state.name}
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