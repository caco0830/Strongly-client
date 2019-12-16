import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import WorkoutCard from '../WorkoutCard/WorkoutCard';
import './ListPage.css';
import AppContext from '../../AppContext';

class ListPage extends Component {

    static contextType = AppContext;
    
    renderWorkouts(){
        let workouts = this.context.workouts;

        return (
            workouts.map(workout => {
                return <WorkoutCard key={workout.id} workout={workout}></WorkoutCard>
            })
        );
    }

    render() {
        return (
            <div className="workout">
                <Link to='/addNew'>
                    <button>Log new exercise</button>
                </Link>
                {this.renderWorkouts()}
                
            </div>
        );
    }
}

export default ListPage;
