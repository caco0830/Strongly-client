import config from '../config';

export async function getAllExercises() {

    let exercises = [];

    await fetch(`${config.API_ENDPOINT}/api/exercises`, {
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
            exercises = data;
        })
        .catch(error => {
            console.error(error);
        })

    return exercises;
}

export async function getExercisesByWorkoutId(workoutId) {
    let exercises = [];

    await fetch(`${config.API_ENDPOINT}/api/exercises?workout_id=${workoutId}`, {
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
            exercises = data;
        })
        .catch(error => {
            console.error(error);
        })

    return exercises;
}

export async function createExercises(exercises) {

    let newExercises;

    await fetch(`${config.API_ENDPOINT}/api/exercises`, {
        method: 'POST',
        body: JSON.stringify(exercises),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                })
            }
            return res.json();
        })
        .then(data => {
            newExercises = exercises;
        })
        .catch(error => {
            console.error(error);
        });

    return newExercises;
}

export async function updateExercises(exercises) {

    exercises.map(ex => {
        return fetch(`${config.API_ENDPOINT}/api/exercises/${ex.id}`, {
            method: 'PATCH',
            body: JSON.stringify(ex),
            headers: {
                'content-type': 'application/json'
            }
        })
            .catch(error => {
                console.error(error);
            });
    });
}

export function deleteExercises(exerciseId) {

    return fetch(`${config.API_ENDPOINT}/api/exercises/${exerciseId}`, {
        method: 'DELETE'
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                })
            }
        })
        .catch(error => {
            console.error(error);
        });



}