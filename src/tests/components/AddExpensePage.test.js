import React from 'react';
import {shallow} from 'enzyme';

import {AddExpensePage} from '../../components/AddExpensePage.jsx';

import {expenses} from '../fixtures/expenses'

describe("<AddExpensePage />", () => {
  let history, onSubmitSpy, wrapper;
  beforeEach(() => {
    history = {push: jest.fn()};
    onSubmitSpy = jest.fn();
    wrapper = shallow(<AddExpensePage history={history} addExpense={onSubmitSpy} />);
  })
  it('should render the page correctly', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should call onSubmit when submitting form', () => {

    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(onSubmitSpy).toHaveBeenLastCalledWith(expenses[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
  })
});
