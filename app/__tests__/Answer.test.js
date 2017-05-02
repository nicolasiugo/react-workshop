import React from 'react';
import Answer from '../src/components/Answer.js';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Answer />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
