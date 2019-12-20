import config from '../config';

export function getAll(){
    return Promise.all([
        fetch(`${config.API_ENDPOINT}/api/workouts`),
        fetch(`${config.API_ENDPOINT}/api/exercises`),
        fetch(`${config.API_ENDPOINT}/api/sets`)
      ])
      .then(([workoutsRes, exercisesRes, setsRes]) => {
        if(!workoutsRes.ok)
          return workoutsRes.json().then(e => Promise.reject(e));
        if(!exercisesRes.ok)
          return exercisesRes.json().then(e => Promise.reject(e));
        if(!setsRes.ok)
          return setsRes.json().then(e => Promise.reject(e));
        return Promise.all([workoutsRes.json(), exercisesRes.json(), setsRes.json()]);
        })
        .catch(error => {
          console.error({error});
        });
}
