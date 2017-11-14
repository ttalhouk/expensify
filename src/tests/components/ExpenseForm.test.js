import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';

import ExpenseForm from '../../components/ExpenseForm.jsx';

import {expenses} from '../fixtures/expenses';

describe('<ExpenseForm />',() => {
  it('should render expense form correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render expense form with expense data provided', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render error with invalid data upon submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper.state().error).toBe('');
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
      preventDefault: ()=> {}
    });
    //console.log(button);
    expect(wrapper.state().error.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });
  it('should update description state when input changes', () => {
    const update = "update"
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(0);
    input.simulate('change', {
      target: {
        value: update
      }
    });
    expect(wrapper.state().description).toBe(update);
  });
  it('should update note state when textarea changes', () => {
    const update = "note update"
    const wrapper = shallow(<ExpenseForm />);
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: update
      }
    });
    expect(wrapper.state().note).toBe(update);
  });
  it('should update amount state when input changes', () => {
    const update = '500000'
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', {
      target: {
        value: update
      }
    });
    expect(wrapper.state().amount).toBe(update);
  });
  it('should not update amount state when input is not valid', () => {
    const update = '500000'
    const wrapper = shallow(<ExpenseForm />);
    const input = wrapper.find('input').at(1);
    input.simulate('change', {
      target: {
        value: update
      }
    });
    input.simulate('change', {
      target: {
        value: update + 'a'
      }
    });
    expect(wrapper.state().amount).toBe(update);
  });
  it('should call onSubmit from props when form is valid', () => {
    const expense = expenses[0]
    const {description, amount, note, createdAt} = expense;
    const spy = jest.fn()
    const wrapper = shallow(<ExpenseForm expense={expense} onSubmit={spy}/>);

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
    });
    expect(spy).toHaveBeenCalledWith({description, amount, note, createdAt});
  });
  it('should set new date on date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const date = moment();
    wrapper.find('SingleDatePicker').prop('onDateChange')(date);
    expect(wrapper.state().createdAt).toBe(date);
  });
  it('should set calendar focus propery in state', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused: true});
    expect(wrapper.state().focused).toBe(true);
  });
})
