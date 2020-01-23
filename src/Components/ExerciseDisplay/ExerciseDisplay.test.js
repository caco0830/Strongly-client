import React from 'react';
import ReactDOM from 'react-dom';
import ExerciseDisplay from './ExerciseDisplay';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ExerciseDisplay /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
