import config from '../config';
import TokenService from '../services/token-service';

export async function getAllSets() {

    let sets = [];

    await fetch(`${config.API_ENDPOINT}/api/sets`, {
        method: 'GET',
        headers: {
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
            sets = data;
        })
        .catch(error => {
            console.error(error);
        })

    return sets;
}

export async function getSetsByWorkoutId(workoutId) {
    let sets = [];

    await fetch(`${config.API_ENDPOINT}/api/sets?workout_id=${workoutId}`, {
        method: 'GET',
        headers: {
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
            sets = data;
        })
        .catch(error => {

            console.error(error);
        })

    return sets;
}

export async function createSets(sets) {

    let newSets;

    await fetch(`${config.API_ENDPOINT}/api/sets`, {
        method: 'POST',
        body: JSON.stringify(sets),
        headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
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
            newSets = sets;
        })
        .catch(error => {
            console.error(error);
        });

    return newSets;
}

export async function updateSets(sets) {

    sets.map(s => {
        return fetch(`${config.API_ENDPOINT}/api/sets/${s.id}`, {
            method: 'PATCH',
            body: JSON.stringify(s),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .catch(error => {
                this.setState({ error });
            });
    });
}

export async function deleteSets(setId) {
    fetch(`${config.API_ENDPOINT}/api/sets/${setId}`, {
        method: 'DELETE',
        headers: {
            'authorization': `bearer ${TokenService.getAuthToken()}`
        }
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(error => {
                    throw error;
                })
            }
            return res;
        })
        .catch(error => {
            console.error(error);
        })

}