import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './AddNew.css';
import uuid from 'uuid/v4';
import { getSets } from '../../helper';
import {getWorkoutById, createWorkout, updateWorkout} from '../../services/workoutAPI';
import {getExercisesByWorkoutId, createExercises, updateExercises} from '../../services/exercisesAPI';
import {getSetsByWorkoutId, createSets, updateSets} from '../../services/setsAPI';

class AddNew extends Component {

  static contextType = AppContext;

  constructor(props) {
    super(props);
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

  async componentDidMount() {
    if (this.props.match.params.workoutId) {

      const workoutId = this.props.match.params.workoutId;
      const workout = await getWorkoutById(workoutId);
      const exercises = await getExercisesByWorkoutId(workoutId);
      const sets = await getSetsByWorkoutId(workoutId);

      this.setState({
        workout,
        exercises,
        sets
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

  updateSetWeight(weight, id) {
    const sets = this.state.sets;
    sets[sets.findIndex(set => set.id === id)].weight = weight;

    this.setState({
      sets: sets
    });
  }

  updateSetReps(reps, id) {
    const sets = this.state.sets;
    sets[sets.findIndex(set => set.id === id)].reps = reps;

    this.setState({
      sets: sets
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    if(this.props.match.params.workoutId) {
      await this.patchWorkouts();
      await this.upsertExercises();
      await this.upsertSets();
      await this.props.history.push('/home');
    } else {
      //this.postWorkout();
      await this.postWorkout();
      await this.postExercises();
      await this.postSets();
      await this.props.history.push('/home');
    }
  }

  async postWorkout() {

    const workout = this.state.workout;

    let newWorkout = await createWorkout(workout);
    this.context.addWorkout(newWorkout);
  }

  async postExercises() {
    const exercises = this.state.exercises;
    const workoutId = this.props.match.params.workoutId;
    const exercisesToCreate = [];

    if(exercises.length > 0){
      exercises.forEach(ex => {
        exercisesToCreate.push({title: ex.title, id: ex.id, workout_id: ex.workout_id})
      })

      let newExercises = await createExercises(exercisesToCreate);
      this.context.addExercise(newExercises, workoutId);
  }
  }

  async postSets() {
    const workoutId = this.props.match.params.workoutId;
    const sets = this.state.sets;
    const setsToCreate = [];

    if (sets.length > 0) {
      sets.forEach(s => {
        setsToCreate.push({
          exercise_id: s.exercise_id,
          id: s.id,
          reps: s.reps,
          weight: s.weight,
          workout_id: s.workout_id
        });
      });

      let newSets = await createSets(setsToCreate);
      this.context.addSet(newSets, workoutId);
    }
  }

  async patchWorkouts() {
    const workout = this.state.workout;
    await updateWorkout(workout);
    this.context.addWorkout(workout);
  }

  async upsertExercises() {
    const exercises = this.state.exercises;
    const workoutId = this.props.match.params.workoutId;

    const exercisesToCreate = [];
    const exercisesToUpdate = [];

    if (exercises.length > 0) {

      exercises.forEach(ex => {
        if(ex.isNew === true){
          const e = {
            id: ex.id,
            title: ex.title,
            workout_id: ex.workout_id
          }
          exercisesToCreate.push(e);
        }else{
          exercisesToUpdate.push(ex);
        }
      });

      if(exercisesToUpdate.length > 0){
        await updateExercises(exercisesToUpdate);
      }

      if(exercisesToCreate.length > 0){
        await createExercises(exercisesToCreate);
      }

      this.context.addExercise(exercises, workoutId);
    }
  }

  async upsertSets(){
    const sets = this.state.sets;
    const workoutId = this.props.match.params.workoutId;

    const setsToCreate = [];
    const setsToUpdate = [];

    if(sets.length > 0){

      sets.forEach(s => {
          if(s.isNew === true){
            setsToCreate.push({
              exercise_id: s.exercise_id,
              id: s.id,
              reps: s.reps,
              weight: s.weight,
              workout_id: s.workout_id
            });
          }else{
            setsToUpdate.push(s);
          }
      });

      if(setsToUpdate.length > 0){
        await updateSets(setsToUpdate);
      }

      if(setsToCreate.length > 0){
        await createSets(setsToCreate);
      }

      this.context.addSet(sets, workoutId);
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
        { id: uuid(), workout_id: this.state.workout.id, title: '', isNew: true }
      ]
    });
  }

  addSet = (e) => {
    e.preventDefault();
    const exerciseid = e.target.dataset.exerciseid
    this.setState({
      sets: [
        ...this.state.sets,
        { id: uuid(), reps: "", weight: "", exercise_id: exerciseid, workout_id: this.state.workout.id, isNew: true }
      ]
    });
  }

  handleRemoveSet = (setId) => {
    this.setState({
      sets: this.state.sets.filter(set => set.id !== setId)
    });
  }

  handleRemoveExercise(e, exId) {
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
              <div key={`set-${set.id}`} className='AddNew__sets-entry'>
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