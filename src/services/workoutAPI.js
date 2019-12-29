import config from '../config';
import TokenService from '../services/token-service';

export async function getAllWorkouts() {

    let workouts = [];

    await fetch(`${config.API_ENDPOINT}/api/workouts`, {
        method: 'GET',
        headers:{
            'authorization': `bearer ${TokenService.getAuthToken()}`
        }
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
        method: 'GET',
        headers:{
            'authorization': `bearer ${TokenService.getAuthToken()}`
        }
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
        headers:{
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(workout),
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
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(workout),
    })
    .catch(error => {
        this.setState({ error });
    });
}

export function deleteWorkout(workout){
    fetch(`${config.API_ENDPOINT}/api/workouts/${workout.id}`, {
        method: 'DELETE',
        headers:{
            'authorization': `bearer ${TokenService.getAuthToken()}`
        } 
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