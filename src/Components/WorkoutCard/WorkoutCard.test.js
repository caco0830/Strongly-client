import React from 'react';
import ReactDOM from 'react-dom';
import WorkoutCard from './WorkoutCard';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><WorkoutCard workout='123'/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
