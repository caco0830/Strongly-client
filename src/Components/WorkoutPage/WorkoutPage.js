import React from 'react';
import AppContext from '../../AppContext';
import {Link} from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import {getSets} from '../../helper';
import config from '../../config';
import './WorkoutPage.css';

class WorkoutPage extends React.Component{
  static contextType = AppContext;
  state = {
    workout: [],
    exercises: [],
    sets: [],
    createdDate:''
  }

  //TODO: when component mounts, fetch the correct workout, exercises, and sets

  componentDidMount(){
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
      this.setState({workout, exercises, sets, createdDate: workout.createddate});
    })
    .catch(error => {
      console.error(error);
    })
  }


  handleDelete = (e) => {
    e.preventDefault();
    const workoutId = this.props.match.params.workoutId;
    // this.context.deleteWorkout(workoutId);
    // this.props.history.push('/home');

    fetch(`${config.API_ENDPOINT}/api/workouts/${workoutId}`, {
      method: 'DELETE' 
    })
    .then(res => {
      if(!res.ok){
        return res.json().then(error => {
          throw error;
        });
      }
      return res;
    })
    .then(data => {
      console.log('called back')
      this.props.history.push('/home');
      this.context.deleteWorkout(workoutId);
      
    })
    .catch(error => {
      console.error(error);
    })

  }

  render(){
    let {workoutId} = this.props.match.params;
    
    const sets = this.state.sets;
    let createdDate = this.state.createdDate;

    if(createdDate !== ''){
      createdDate = parseISO(createdDate);
    }

    const workout = this.state.workout;
    const exs = this.state.exercises;

    return (
      <div className='WorkoutPage'>
        <h1>{workout.title}</h1>
        <div>{createdDate ? format(createdDate, 'PPPP p') : ''}</div>
        <div className='WorkoutPage__exercises'>
          {exs.map(ex => {
            return(
              <div key={`ex-${ex.id}`}>
                <div className='WorkoutPage__exercises-name'>{ex.title}</div>
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