import moment from 'moment';

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
  return expenses.filter((expense) => {
    // const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    // const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const startDateMatch = startDate ? startDate.isSameOrBefore(moment(expense.createdAt), 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(moment(expense.createdAt), 'day') : true;
    const textMatch =  expense.description.toLowerCase().includes(text.toLowerCase());

    return textMatch && startDateMatch && endDateMatch;
  }).sort((exp1, exp2) => {
    if (sortBy === 'date') {
      return exp2.createdAt - exp1.createdAt;
    } else if (sortBy === 'amount'){
      return exp2.amount - exp1.amount;
    }
  })
}

export default getVisibleExpenses;
