import React from 'react';
import {shallow} from 'enzyme';

import LoadingPage from '../../components/LoadingPage.jsx';

import {expenses} from '../fixtures/expenses'

describe('<LoadingPage />',() => {
  it('should render the loading page correctly', () => {
    const wrapper = shallow(<LoadingPage expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

})
