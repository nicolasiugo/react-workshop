import React from 'react';
import {shallow} from 'enzyme';
import Answer from './Answer';

it('renders without crashing', () => {
  const mockFn = jest.fn();

  const wrapper = shallow(
    <Answer
      answerId={1}
      answerContent="Una respuesta"
      onAnswerSelected={mockFn} />
  );

  expect(wrapper.find('label').text()).toEqual('Una respuesta');


  /*checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');*/
});
