import React from 'react';
import { format, parseISO } from 'date-fns';
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
                        <div className="WorkoutCard__name">{workout.title}</div>
                        <div className="WorkoutCard__date">{workout.createddate ? format(parseISO(workout.createddate), 'MMM d') : ''}</div>
                    </header>
                    <ExerciseDisplay workoutId={workout.id} />
                </div>
            </NavLink>
        );
    }
}

export default WorkoutCard;