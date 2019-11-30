import React, { Component } from 'react';
//import AddSet from '../AddSet/AddSet';
import './AddNew.css';
import uuid from 'uuid/v4';

class AddNew extends Component {

    constructor(props){
        super(props);
        this.state = {
            "error": null,
            "date": "",
            "exercise": "",
            "numSets": "",
            //"sets": [{order:"", reps:"", weight:""}],


            "id": uuid(),
            "createdDate": "",
            "name":"",
            "user_id":"",
            "exercises": [{id: '', workout_id: '', name: '', user_id: '1'}],
            "sets":[{order:"", reps:"", weight:""}]


        }
    }

    nameChange(name){
        this.setState({
            name
        });
    }

    exerciseChanged(exercise) {
        this.setState({
            exercise
        });
    }

    setsChanged(numSets){
        this.setState({
            numSets
        });
    }

    dateChanged(date){
        this.setState({
            date
        })
    }

    

    addSet = (e) => {
        this.setState((prevState) => ({
            sets: [...prevState.sets, {order:"", reps:"", weight:""}]
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const workout = {
            name: name
        }

        this.setState({
            error: null
        })

        console.log(workout);
        this.context.addWorkout(workout);


    }

    render() {
        let{sets} = this.state;
        //console.log(uuid());
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input 
                        type="text"
                        name="name"
                        onChange={e => this.nameChange(e.target.value)}
                        />



                </div>




                {/* <div>
                    <label htmlFor="date">Date: </label>
                        <input 
                            placeholder="Squat" 
                            type="date" 
                            name='date' 
                            onChange={e => this.dateChanged(e.target.value)}
                            />
                    </div>
                    <div>
                    <label htmlFor="exercise">Exercise: </label>
                    <input 
                        placeholder="Squat" 
                        type="text" 
                        name='exercise' 
                        onChange={e => this.exerciseChanged(e.target.value)}/>
                </div>
                <button onClick={this.addSet}>+ Add Set</button>
                
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Set</th>
                                <th>Reps</th>
                                <th>Weight</th>
                            </tr>
                            {sets.map((val, idx) => {
                                let setId = `set-${idx}`, repId = `rep=${idx}`, weightId = `weight-${idx}`;
                                return (

                                <tr>
                                    <td>{idx + 1}</td>
                                    <td><input type="number" name={repId} /></td>
                                    <td><input type="number" name={weightId} /> lbs</td>
                                </tr>

                                )
                            })}

                        </tbody>
                    </table>
                </div> */}

                {/* <button className="new">+ Add Exercise</button> */}


                <button type="submit">Save</button>
                <button type="">Cancel</button>
            </form >
        );
    }
}

export default AddNew;