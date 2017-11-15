import React from 'react';
import {shallow} from 'enzyme';

import {ExpensesSummary} from '../../components/ExpensesSummary.jsx';

import {expenses} from '../fixtures/expenses';

describe('<ExpensesSummary />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ExpensesSummary expenses={expenses} />);
  });
  it('should display the summary of multiple filtered items correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should display the summary of one filtered item correctly', () => {
    wrapper.setProps({expenses: [expenses[0]]});
    expect(wrapper).toMatchSnapshot();
  });
})
