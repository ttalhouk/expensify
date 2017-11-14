import React from 'react';
import {shallow} from 'enzyme';

import {ExpenseList} from '../../components/ExpenseList.jsx';

import {expenses} from '../fixtures/expenses'

describe('<ExpenseList />',() => {
  it('should render the list of expenses correctly', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render no items message if no expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
  })
})
