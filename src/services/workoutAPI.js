import config from '../config';

export async function getAllWorkouts() {

    let workouts = [];

    await fetch(`${config.API_ENDPOINT}/api/workouts`, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                });
            }
            return res.json();
        })
        .then(data => {
            workouts = data;
        })
        .catch(error => {
            console.error(error);
        })

    return workouts;
}

export async function getWorkoutById(id) {
    let workout = [];

    await fetch(`${config.API_ENDPOINT}/api/workouts/${id}`, {
        method: 'GET'
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                });
            }
            return res.json();
        })
        .then(data => {
            workout = data;
        })
        .catch(error => {
            console.error(error);
        })

    return workout;
}

export async function createWorkout(workout){

    let newWorkout;
    
    await fetch(`${config.API_ENDPOINT}/api/workouts`, {
        method: 'POST',
        body: JSON.stringify(workout),
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(res => {
        if(!res.ok){
            return res.json().then(error => {
                throw error;
            })
        }
        return res.json();
    })
    .then(data => {
        newWorkout = data;
    })
    .catch(error => {
        console.error(error);
    });

    return newWorkout;
}

export function updateWorkout(workout){

    fetch(`${config.API_ENDPOINT}/api/workouts/${workout.id}`, {
      method: 'PATCH',
      body: JSON.stringify(workout),
      headers: {
        'content-type': 'application/json'
      }
    })
    .catch(error => {
        this.setState({ error });
    });
}

export function deleteWorkout(workout){
    fetch(`${config.API_ENDPOINT}/api/workouts/${workout.id}`, {
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
    .catch(error => {
        console.error(error);
    })
}