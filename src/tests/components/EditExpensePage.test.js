import React from 'react';
import {shallow} from 'enzyme';

import {EditExpensePage} from '../../components/EditExpensePage.jsx';

import {expenses} from '../fixtures/expenses'

describe("<EditExpensePage />", () => {
  let history, onSubmitSpy, onRemoveSpy, wrapper, expense;
  beforeEach(() => {
    history = {push: jest.fn()};
    expense = expenses[1]
    onSubmitSpy = jest.fn();
    onRemoveSpy = jest.fn()
    wrapper = shallow(<EditExpensePage expense={expense} history={history} startEditExpense={onSubmitSpy} startRemoveExpense={onRemoveSpy}/>);
  })
  it('should render the page correctly', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it('should call startEditExpense when submitting form', () => {

    wrapper.find('ExpenseForm').prop('onSubmit')(expense);
    expect(onSubmitSpy).toHaveBeenLastCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenLastCalledWith('/');
  });
  it('should call startRemoveExpense when button clicked',() => {
    wrapper.find('button').simulate('click');
    expect(onRemoveSpy).toHaveBeenLastCalledWith({id: expense.id});
    expect(history.push).toHaveBeenLastCalledWith('/');
  })
});
