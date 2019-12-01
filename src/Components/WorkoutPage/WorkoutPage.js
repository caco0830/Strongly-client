import React from 'react';
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom';
import { format } from 'date-fns';
import {findWorkout, getExercises, getSets} from '../../helper';
import './WorkoutPage.css';

class WorkoutPage extends React.Component{
  static contextType = AppContext;
  state = {
    workout: []
  }

  handleDelete = (e) => {
    e.preventDefault();
    const workoutId = this.props.match.params.workoutId;
    this.context.deleteWorkout(workoutId);
    this.props.history.push('/home');

  }



  render(){
    const {workoutId} = this.props.match.params;
    const workouts = this.context.workouts;
    const exercises = this.context.exercises;
    const sets = this.context.sets;

    const workout = findWorkout(workouts, workoutId) || '';
    
    const exs = getExercises(exercises, workoutId);

    return (
      <div className='WorkoutPage'>
        <h1>{workout.name}</h1>
        <div>{workout.createdDate ? format(workout.createdDate, 'PPPP p') : ''}</div>
        <div className='WorkoutPage__exercises'>
          {exs.map(ex => {
            return(
              <div key={`ex-${ex.id}`}>
                <div className='WorkoutPage__exercises-name'>{ex.name}</div>
                <ul className='WorkoutPage__setList'>
                {
                  getSets(sets, ex.id).map((set, idx) => {
                    return(
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
        
        <button type='button' onClick={this.handleDelete}>Delete</button>
      </div>);
  }
}

export default WorkoutPage;