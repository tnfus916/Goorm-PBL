import React from 'react';

import './ExpenseForm.css';

const ExpenseForm = ({
  handleCharge,
  charge,
  edit,
  amount,
  handleAmount,
  handleSubmit,
}) => {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.8rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ width: '40%' }}>
          <label htmlFor='charge'>지출 항목</label>
          <input
            type='text'
            className='form-control'
            id='charge'
            name='charge'
            value={charge}
            placeholder='예) 렌트비'
            onChange={handleCharge}
          />
        </div>
        <div style={{ width: '40%' }}>
          <label htmlFor='amount'>비용(원)</label>
          <input
            type='number'
            className='form-control'
            id='amount'
            name='amount'
            value={amount}
            placeholder='예) 1000'
            onChange={handleAmount}
          />
        </div>
        <button type='submit' className='btn'>
          {edit ? '수정' : '추가'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
