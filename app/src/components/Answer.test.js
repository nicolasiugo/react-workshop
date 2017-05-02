import React from 'react';
import {shallow} from 'enzyme';
import Answer from './Answer';

it('renders without crashing', () => {
  const checkbox = shallow(
    <Answer />
  );

  expect(checkbox.text()).toEqual('holis');

  /*checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');*/
});
