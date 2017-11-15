export default (expenses = []) => {
  return expenses
    .map((expense) => {
      return expense.amount
    })
    .reduce((sum, amount) => {
      return sum + amount
    }, 0);
}
