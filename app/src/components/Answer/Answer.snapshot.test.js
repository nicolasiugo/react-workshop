import React from 'react';
import Answer from './Answer';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const mockFn = jest.fn();
  const tree = renderer
    .create(
      <Answer 
        answerId={1}
        answerContent="Una respuesta"
        onAnswerSelected={mockFn}/>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
