export const countSets = (sets=[], exId) => 
    sets.filter(set => set.exercise_id === exId).length
