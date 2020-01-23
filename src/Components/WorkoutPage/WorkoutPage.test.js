import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutPage from './WorkoutPage';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const match = {params: {workoutId:'123'}};
  ReactDOM.render(<BrowserRouter><WorkoutPage match={match}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
