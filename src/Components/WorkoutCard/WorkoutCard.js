import React from 'react';
import { format } from 'date-fns';
import {NavLink} from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import './WorkoutCard.css';

class WorkoutCard extends React.Component{

    render(){
        const workout = this.props.workout;
        return (
            <NavLink className='workout__card-link' to={`/workout/${workout.id}`}>
                <div className="workout__card">
                    <header>
                        <div>{workout.name}</div>
                        <div className="workout__card-date">{format(workout.createdDate, 'MMM d')}</div>
                    </header>
                    <ExerciseDisplay workoutId={workout.id} />
                </div>
            </NavLink>
        );
    }
}

export default WorkoutCard;