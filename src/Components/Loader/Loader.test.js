import React from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Loader /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
