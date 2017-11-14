export const setTextFilter = (text = '') => {
  return {
    type: 'SET_TEXT_FILTER',
    text
  }
}

export const sortByAmount = () => {
  return {
    type: 'SORT_BY_AMOUNT'
  }
}

export const sortByDate = () => {
  return {
    type: 'SORT_BY_DATE'
  }
}

export const setStartDate = (date) => {
  return {
    type: 'SET_START_DATE',
    date
  }
}
export const setEndDate = (date) => {
  return {
    type: 'SET_END_DATE',
    date
  }
}
