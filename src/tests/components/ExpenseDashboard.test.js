import React from 'react';
import {shallow} from 'enzyme';

import ExpenseDashboardPage from '../../components/ExpenseDashboardPage.jsx';

import {expenses} from '../fixtures/expenses'

describe('<ExpenseDashboardPage />',() => {
  it('should render the dashboard page correctly', () => {
    const wrapper = shallow(<ExpenseDashboardPage />);
    expect(wrapper).toMatchSnapshot();
  });

})
