import React from 'react';
import {shallow} from 'enzyme';

import ExpenseListItem from '../../components/ExpenseListItem.jsx';

import {expenses} from '../fixtures/expenses'

describe('<ExpenseListItem />',() => {
  it('should render the expense list item correctly', () => {
    const wrapper = shallow(<ExpenseListItem expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
  });

})
