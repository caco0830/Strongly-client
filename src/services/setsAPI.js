import config from '../config';

export async function getAllSets() {

    let sets = [];

    await fetch(`${config.API_ENDPOINT}/api/sets`, {
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
            sets = data;
        })
        .catch(error => {

            console.error(error);
        })

    return sets;
}

export async function createSets(sets){

    let newSets;
    
    await fetch(`${config.API_ENDPOINT}/api/sets`, {
        method: 'POST',
        body: JSON.stringify(sets),
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
        newSets = sets;
    })
    .catch(error => {
        console.error(error);
    });

    return newSets;
}

export async function updateSets(sets){

    sets.map(s => {
        return fetch(`${config.API_ENDPOINT}/api/sets/${s.id}`, {
            method: 'PATCH',
            body: JSON.stringify(s),
            headers: {
              'content-type': 'application/json'
            }
          })
          .catch(error => {
              this.setState({ error });
          });
    });
}