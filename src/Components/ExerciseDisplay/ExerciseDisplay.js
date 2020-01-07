import React from 'react';
import AppContext from '../../AppContext';
import {countSets} from '../../helper';

import './ExerciseDisplay.css';

class ExerciseDisplay extends React.Component{
    static contextType = AppContext;

    getExercises(){
        let exercises = this.context.exercises;
        let sets = this.context.sets;
        let workoutId = this.props.workoutId;
        
        exercises = exercises.filter(ex => {return ex.workout_id === workoutId}) || "";

        return (
            <div className='ExerciseDisplay'>
                <div className='ExerciseDisplay__headers'>
                    <div>Exercise</div>
                    <div>Sets</div>
                </div>
                {exercises.map((ex,idx) => {
                    return (
                        <div key={ex.id} className='ExerciseDisplay__exercise'>
                            <div className='ExerciseDisplay__name'> {ex.title}</div>
                            <div className='ExerciseDisplay__sets'>{countSets(sets, ex.id)}</div>
                        </div>
                    )
                })}
            </div>
        );
    }

    render(){
        return(
            <div>
                {this.getExercises()}
            </div>
        );
    }


}

export default ExerciseDisplay;