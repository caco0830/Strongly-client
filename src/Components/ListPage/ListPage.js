import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WorkoutCard from '../WorkoutCard/WorkoutCard';
import Loader from '../Loader/Loader';
import './ListPage.css';
import AppContext from '../../AppContext';

class ListPage extends Component {

    static contextType = AppContext;

    renderWorkouts() {
        let workouts = this.context.workouts;

        return (
            workouts.map(workout => {
                return <WorkoutCard key={workout.id} workout={workout}></WorkoutCard>
            })
        );
    }

    render() {
        return (
            <div className="ListPage">
                {
                    this.context.loading
                        ? <Loader />
                        : <div>
                            <Link to='/addNew'>
                                <div className="ListPage__addNew">ADD NEW WORKOUT</div>
                            </Link>
                            {this.renderWorkouts()}</div>
                }
            </div>
        );
    }
}

export default ListPage;
