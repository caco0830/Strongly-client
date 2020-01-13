import React from 'react';
import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { getSets } from '../../helper';
import { getWorkoutById, deleteWorkout } from '../../services/workoutAPI';
import { getExercisesByWorkoutId } from '../../services/exercisesAPI';
import { getSetsByWorkoutId } from '../../services/setsAPI';
import Loader from '../Loader/Loader';
import './WorkoutPage.css';

class WorkoutPage extends React.Component {
  static contextType = AppContext;
  state = {
    workout: [],
    exercises: [],
    sets: [],
    createdDate: '',
    confirmDelete: false
  }


  //makes a call when the component is monted to load workouts, exercises and sets and adds them to the state
  async componentDidMount() {

    this.context.isLoading();

    const workoutId = this.props.match.params.workoutId;
    const workout = await getWorkoutById(workoutId);
    const exercises = await getExercisesByWorkoutId(workoutId);
    const sets = await getSetsByWorkoutId(workoutId);

    this.context.hasLoaded();

    this.setState({
      workout,
      exercises,
      sets,
    });
  }

  //deletes the workout from the database 
  handleDelete = async (e) => {
    e.preventDefault();
    const workout = this.state.workout;

    await deleteWorkout(workout);
    this.context.deleteWorkout(workout.id);
    this.props.history.push('/home');
  }

  render() {
    let { workoutId } = this.props.match.params;

    const sets = this.state.sets;
    let createdDate = this.state.createdDate;

    if (createdDate !== '') {
      createdDate = parseISO(createdDate);
    }

    const workout = this.state.workout;
    const exs = this.state.exercises;

    return (
      <div className='WorkoutPage'>

        {
          this.context.loading
            ? <Loader />
            : <div className='WorkoutPage__Main'>
                <div className='WorkoutPage__WorkoutDetails'>
                  <div className='WorkoutPage__Name'>{workout.title}</div>
                  <div className='WorkoutPage__Date'>{workout.createddate ? format(parseISO(workout.createddate), 'MMM d') : ''}</div>
                </div>
                <div className='WorkoutPage__divider'></div>
                <div className='WorkoutPage__exercises'>
                  {exs.map(ex => {
                    return (
                      <div key={`ex-${ex.id}`} className='WorkoutPage__exerciseCard'>
                        <div className='WorkoutPage__exerciseCard-name'>{ex.title}</div>
                        <ol className='WorkoutPage__setList'>
                          {
                            getSets(sets, ex.id).map((set, idx) => {
                              return (
                                <li key={`${set.id}-${idx}`}>
                                  <div className='WorkoutPage__set'>{`${set.weight} lbs x ${set.reps} reps`}</div>
                                </li>
                              )
                            })
                          }
                        </ol>
                      </div>
                    )
                  })}
                </div>

                <div className="WorkoutPage__buttons">
                  <Link to={`${workoutId}/edit`}><button className="WorkoutPage__button WorkoutPage__Button-blue">Edit</button></Link>
                  <button className="WorkoutPage__button WorkoutPage__Button-red" type='button' onClick={e => window.confirm("Are you sure?") && this.handleDelete(e)}>Delete</button>
                </div>
            </div>
        }
      </div>);
  }
}

export default WorkoutPage;