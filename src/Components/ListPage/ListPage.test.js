import React from 'react';
import ReactDOM from 'react-dom';
import ListPage from './ListPage';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><ListPage /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
