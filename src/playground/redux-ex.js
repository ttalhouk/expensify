import { createStore } from 'redux';


const incrementCount = (incrementBy = 1) => {
  return {
    type: 'INCREMENT',
    incrementBy
  }
}
const decrementCount = (decrementBy = 1) => {
  return {
    type: 'DECREMENT',
    decrementBy
  }
}
const setCount = (setValue) => {
  return {
    type: 'SET',
    setValue
  }
}
const resetCount = () => {
  return {
    type: 'RESET'
  }
}

const countReducer = (state = {count: 0}, action) => {
  console.log('updating store');
  switch (action.type) {
    case 'INCREMENT':
      // const increment = typeof action.incrementBy === 'number' ? action.incrementBy : 1
      return {count: state.count + action.incrementBy};
    case 'DECREMENT':
      return {count: state.count - action.decrementBy};
    case 'RESET':
      return {count: 0};
    case 'SET':
      return {count: action.setValue};
    default:
      return state;
  }
}

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});




// store.dispatch(
//   {
//     type: 'INCREMENT',
//     incrementBy: 5
//   }
// )
store.dispatch(incrementCount(5))
store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())
store.dispatch(decrementCount(10))
store.dispatch(setCount(300))
