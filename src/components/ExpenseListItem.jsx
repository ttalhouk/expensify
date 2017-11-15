import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = ({expense}) => {
  const {id, description, amount, createdAt} = expense;
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>
        {numeral(amount/100).format('$0,0.00')} - Created: {moment(createdAt).format("MMM Do 'YY")}
      </p>

    </div>
  )
}

export default ExpenseListItem;
