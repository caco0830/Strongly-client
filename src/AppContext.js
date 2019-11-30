import React from 'react';

export default React.createContext({
    workouts: [],
    exercises: [],
    sets: [],
    addWorkout: () => {},
    addExercise: () => {},
    addSet: () => {},
    deleteWorkout: () => {}
});
