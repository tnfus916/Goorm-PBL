import { useEffect, useState } from 'react';

import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [charge, setCharge] = useState('');
  const [id, setId] = useState('');
  const [amount, setAmount] = useState(0);
  const [edit, setEdit] = useState(false);

  const [alert, setAlert] = useState({ show: false });

  const [expenses, setExpenses] = useState([]);

  const clearItems = () => {
    setExpenses([]);
  };

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleDelete = (id) => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    handleAlert({ type: 'error', text: '아이템이 삭제되었습니다.' });
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };

  const handleEdit = (id) => {
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setId(id);
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        const newExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, amount, charge } : item;
        });
        setExpenses(newExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: '아이템이 수정되었습니다.' });
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount };
        setExpenses([...expenses, newExpense]);
        handleAlert({ type: 'success', text: '아이템이 생성되었습니다.' });
      }
      setCharge('');
      setAmount(0);
    } else {
      handleAlert({
        type: 'error',
        text: 'charge는 빈 값일 수 없으며 amount는 0보다 커야 합니다.',
      });
    }
  };
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('expenses'));
    setExpenses(localData);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <>
      <header>
        <h1>budget calculator</h1>
      </header>
      {alert.show ? <Alert type={alert.type} text={alert.text} /> : null}
      <main>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />

        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
    </>
  );
}

export default App;
