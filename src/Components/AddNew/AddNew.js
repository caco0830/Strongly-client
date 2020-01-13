import React, { Component } from 'react';
import AppContext from '../../AppContext';
import './AddNew.css';
import uuid from 'uuid/v4';
import { getSets } from '../../helper';
import Loader from '../Loader/Loader';
import { getWorkoutById, createWorkout, updateWorkout } from '../../services/workoutAPI';
import { getExercisesByWorkoutId, createExercises, updateExercises, deleteExercises } from '../../services/exercisesAPI';
import { getSetsByWorkoutId, createSets, updateSets, deleteSets } from '../../services/setsAPI';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';



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
      this.context.isLoading();
      const workoutId = this.props.match.params.workoutId;
      const workout = await getWorkoutById(workoutId);
      const exercises = await getExercisesByWorkoutId(workoutId);
      const sets = await getSetsByWorkoutId(workoutId);
      this.context.hasLoaded();
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

    if (this.props.match.params.workoutId) {
      await this.patchWorkouts();
    } else {
      await this.postWorkout();
    }
    await this.upsertExercises();
    await this.upsertSets();
    await this.props.history.push('/home');
  }

  async postWorkout() {

    const workout = this.state.workout;

    let newWorkout = await createWorkout(workout);
    this.context.addWorkout(newWorkout);
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
        if (ex.isNew === true) {
          const e = {
            id: ex.id,
            title: ex.title,
            workout_id: ex.workout_id
          }
          exercisesToCreate.push(e);
        } else {
          exercisesToUpdate.push(ex);
        }
      });

      if (exercisesToUpdate.length > 0) {
        await updateExercises(exercisesToUpdate);
      }

      if (exercisesToCreate.length > 0) {
        await createExercises(exercisesToCreate);
      }

      this.context.addExercise(exercises, workoutId);
    }
  }

  async upsertSets() {
    const sets = this.state.sets;
    const workoutId = this.props.match.params.workoutId;

    const setsToCreate = [];
    const setsToUpdate = [];

    if (sets.length > 0) {

      sets.forEach(s => {
        if (s.isNew === true) {
          setsToCreate.push({
            exercise_id: s.exercise_id,
            id: s.id,
            reps: s.reps,
            weight: s.weight,
            workout_id: s.workout_id
          });
        } else {
          setsToUpdate.push(s);
        }
      });

      if (setsToUpdate.length > 0) {
        await updateSets(setsToUpdate);
      }

      if (setsToCreate.length > 0) {
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

  async handleRemoveSet(e, setId) {
    e.preventDefault();
    const workoutId = this.props.match.params.workoutId;
    deleteSets(setId);

    await this.setState({
      sets: this.state.sets.filter(set => set.id !== setId)
    });

    const sets = this.state.sets;

    this.context.addSet(sets, workoutId);
  }

  async handleRemoveExercise(e, exId) {
    e.preventDefault();
    const workoutId = this.props.match.params.workoutId;
    deleteExercises(exId);

    await this.setState({
      exercises: this.state.exercises.filter(ex => ex.id !== exId)
    });

    const exercises = this.state.exercises;
    this.context.addExercise(exercises, workoutId);
  }

  renderExercises(exercises) {
    const sets = this.state.sets;
    return (
      <div className='AddNew__exercises-list'>
        {exercises.map((ex, index) => {
          return (
            <div key={`ex-${index}`} className='AddNew__exercises-entry'>
              {/* <label htmlFor='exercise-name'>Exercise Name: </label> */}
              <div className="AddNew__ExerciseHeader">
                <input
                  className='AddNew_ExerciseName'
                  title="This field is required"
                  placeholder='Squat'
                  type="text"
                  name='exercise-name'
                  value={ex.title}
                  onChange={e => this.updateExerciseName(e.target.value, index)}
                  required
                  pattern=".*\S+.*"
                />
                <RemoveCircleIcon className="AddNew__RemoveButton" onClick={e => this.handleRemoveExercise(e, ex.id)}/>
              </div>
              {this.renderSets(sets, ex.id)}
            </div>
          );
        })}
        <button className="AddNew__Button-blue AddNew__AddEx" onClick={this.addExercise}>Add Exercise</button>
      </div>
    );
  }

  renderSets(sets, exerciseId) {
    //sets = sets.filter(set => set.exercise_id === exerciseId);
    sets = getSets(sets, exerciseId);
    return (
      <table className='AddNew__sets-list'>
        <thead>
          <tr className='AddNew__sets-headers'>
            <th>Set</th>
            <th>Reps</th>
            <th>Lbs</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          sets.map((set, index) => {
            return (
                <tr key={`set-${set.id}`} className='AddNew__sets-entry'>
                  <td>{index + 1}</td>
                  <td><input
                    type='number'
                    name='set-reps'
                    value={set.reps}
                    onChange={e => this.updateSetReps(e.target.value, set.id)}
                    min='1'
                    required
                  /></td>
                  <td><input
                    type='number'
                    name='set-weight'
                    value={set.weight}
                    onChange={e => this.updateSetWeight(e.target.value, set.id, index)}
                    min='1'
                    required
                  /></td>
                  <td>
                    <RemoveCircleIcon className="AddNew__RemoveButton" onClick={e => this.handleRemoveSet(e, set.id)}/>
                  </td>
                </tr>
            );
          })
        }
          <tr>
            <td>
              <button className="AddNew__Button-blue AddNew__AddSet" data-exerciseid={exerciseId} id="new" onClick={this.addSet}>Add Set</button>
            </td>
          </tr>
        </tbody>
      </table>
    );
    
  }

  render() {
    let exercises = this.state.exercises;
    return (

      <form onSubmit={this.handleSubmit}>
        {
          this.context.loading
            ? <Loader />
            : <div className='AddNew__workout'>
              {/* <label htmlFor="name">Name: </label> */}
              <input
                className="AddNew__NameInput"
                title="A value is required"
                type="text"
                name="name"
                value={this.state.workout.title}
                placeholder="Workout Name"
                onChange={e => this.nameChange(e.target.value)}
                pattern=".*\S+.*"
                required
              />
              <div className='AddNew__Divider'></div>
              {this.renderExercises(exercises)}
              <div className='AddNew__Buttons'>
                <button className="AddNew__Button-blue AddNew__Submit" type="submit">Save</button>
                <button className="AddNew__Button-red AddNew__Cancel" type="cancel" onClick={this.handleCancel}>Cancel</button>
              </div>
            </div>
        }
      </form >
    );
  }
}

export default AddNew;