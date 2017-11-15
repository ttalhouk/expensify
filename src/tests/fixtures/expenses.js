import moment from 'moment';

export const expenses = [
  {
    id: "1",
    description: 'rent',
    amount: 50,
    note:'',
    createdAt: moment(0).add(4, 'days').valueOf()
  },
  {
    id: "2",
    description: 'water bill',
    amount: 40,
    note:'',
    createdAt: 0
  },
  {
    id: "3",
    description: 'gas bill',
    amount: 500,
    note:'',
    createdAt: moment(0).subtract(4, 'days').valueOf()
  }
]
