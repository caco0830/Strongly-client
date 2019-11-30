import React from 'react';
import { format } from 'date-fns';
import {NavLink} from 'react-router-dom';
import ExerciseDisplay from '../ExerciseDisplay/ExerciseDisplay';
import './WorkoutCard.css';

class WorkoutCard extends React.Component{

    render(){
        const workout = this.props.workout;
        return (
            <NavLink className='WorkoutCard__link' to={`/workout/${workout.id}`}>
                <div className="WorkoutCard">
                    <header>
                        <div className="WorkoutCard__name">{workout.name}</div>
                        <div className="WorkoutCard__date">{workout.createdDate ? format(workout.createdDate, 'MMM d') : ''}</div>
                    </header>
                    <ExerciseDisplay workoutId={workout.id} />
                </div>
            </NavLink>
        );
    }
}

export default WorkoutCard;