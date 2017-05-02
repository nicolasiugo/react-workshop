import React from 'react';
import ReactDOM from 'react-dom';
import Answer from './Answer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Answer />, div);
});
