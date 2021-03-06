import React from 'react';

export default React.createContext({
    workouts: [],
    exercises: [],
    sets: [],
    addWorkout: () => {},
    addExercise: () => {},
    addSet: () => {},
    deleteWorkout: () => {},
    onLogoutSuccess: () => {},
    onLoginSuccess: () => {},
    isLoading: () => {},
    hasLoaded: () => {},
    loading: null,
    windowSize: null
});
