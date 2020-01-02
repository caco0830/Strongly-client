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
            : <div>
              <h1>{workout.title}</h1>
              <div>{createdDate ? format(createdDate, 'PPPP p') : ''}</div>
              <div className='WorkoutPage__exercises'>
                {exs.map(ex => {
                  return (
                    <div key={`ex-${ex.id}`}>
                      <div className='WorkoutPage__exercises-name'>{ex.title}</div>
                      <ul className='WorkoutPage__setList'>
                        {
                          getSets(sets, ex.id).map((set, idx) => {
                            return (
                              <li key={`${set.id}-${idx}`}>
                                <div className='WorkoutPage__set'>{`${idx + 1}. ${set.weight} lbs x ${set.reps} reps`}</div>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })}
              </div>
              <Link to={`${workoutId}/edit`}><button>Edit</button></Link>

              {/* <button type='button' onClick={this.handleDelete}>Delete</button> */}
              <button type='button' onClick={e => window.confirm("Are you sure?") && this.handleDelete(e)}>Delete</button>
            </div>
        }
      </div>);
  }
}

export default WorkoutPage;