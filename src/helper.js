export const countSets = (sets=[], exId) => 
    sets.filter(set => set.exercise_id === exId).length

export const findWorkout = (workouts=[], workoutId) => 
    workouts.find(workout => workout.id === workoutId)

export const getExercises = (exercises=[], workoutId) =>
    exercises.filter(ex => ex.workout_id === workoutId)

export const getSets = (sets=[], exId) => 
sets.filter(set => set.exercise_id === exId)