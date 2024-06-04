import React from 'react';

import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, handleDelete, handleEdit, clearItems }) {
  return (
    <div
      style={{
        minHeight: '20rem',
        width: '100%',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.8rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          padding: '0 0.2rem',
        }}
      >
        <p style={{ fontSize: '1rem' }}>
          총지출:&nbsp;
          <span>
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원
          </span>
        </p>
        {expenses.length > 0 && (
          <button className='btn' onClick={clearItems}>
            초기화
          </button>
        )}
      </div>
      <ul>
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              expense={expense}
              key={expense.id}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ExpenseList;
