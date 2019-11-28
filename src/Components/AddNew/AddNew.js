import React, { Component } from 'react';
//import AddSet from '../AddSet/AddSet';

import './AddNew.css';

class AddNew extends Component {

    constructor(props){
        super(props);
        this.state = {
            "date": "",
            "exercise": "",
            "numSets": "",
            "sets": [{order:"", reps:"", weight:""}]

        }
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

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {



    }

    addSet = (e) => {
        this.setState((prevState) => ({
            sets: [...prevState.sets, {order:"", reps:"", weight:""}]
        }))
    }



    render() {
        let{sets} = this.state;
        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
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
                {/* <div>
                    <label htmlFor="sets">Sets: </label>
                    <input 
                        placeholder="" 
                        type="number" 
                        name='lastname'
                        min="1" 
                        onChange={e => this.setsChanged(e.target.value)}/>
                </div> */}
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Set</th>
                                <th>Reps</th>
                                <th>Weight</th>
                            </tr>
                            {sets.map((val, idx) => {
                                let /*setId = `set-${idx}`,*/ repId = `rep=${idx}`, weightId = `weight-${idx}`;
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
                </div>

                {/* <button className="new">+ Add Exercise</button> */}


                <button type="submit">Save</button>
                <button type="">Cancel</button>
            </form >
        );
    }
}

export default AddNew;