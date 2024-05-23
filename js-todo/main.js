const list = document.querySelector('#list');
const addBtn = document.querySelector('#add-btn');

let todos = [];

addBtn.addEventListener('click', addTodo);

function addTodo() {
  const newTodoValue = {
    id: new Date().getTime(),
    text: '',
    checked: false,
  };

  todos.unshift(newTodoValue); // 배열에 맨앞에 삽입

  const { todoBox } = createTodoElement(newTodoValue);

  list.prepend(todoBox); // 노드 객체의 첫번째 자식으로 추가 -> 가장 위에 display

  saveToLocalStorage();
}

function createTodoElement(newTodoValue) {
  const todoBox = document.createElement('div');
  todoBox.classList.add('todobox');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked = newTodoValue.checked;

  if (newTodoValue.checked) {
    todoBox.classList.add('checked');
  }

  const inputBox = document.createElement('input');
  inputBox.type = 'text';
  inputBox.value = newTodoValue.text;
  inputBox.setAttribute('disabled', '');

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('actions');

  const editBtn = document.createElement('button');
  editBtn.classList.add('material-icons');
  editBtn.innerText = 'edit';

  const removeBtn = document.createElement('button');
  removeBtn.classList.add('material-icons', 'remove-btn');
  removeBtn.innerText = 'remove_circle';

  buttonContainer.append(editBtn);
  buttonContainer.append(removeBtn);

  todoBox.append(checkBox);
  todoBox.append(inputBox);
  todoBox.append(buttonContainer);

  // 체크박스 토클
  checkBox.addEventListener('change', () => {
    newTodoValue.checked = checkBox.checked;

    if (newTodoValue.checked) {
      todoBox.classList.add('checked');
    } else {
      todoBox.classList.remove('checked');
    }

    saveToLocalStorage();
  });

  // todo 입력 이벤트 리스너 등록
  inputBox.addEventListener('input', () => {
    newTodoValue.text = inputBox.value;
  });

  // enter 입력시 blur 되는 이벤트 리스너 등록
  inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      inputBox.blur();
    }
  });

  // todo 입력창 blur
  inputBox.addEventListener('blur', () => {
    inputBox.setAttribute('disabled', '');

    saveToLocalStorage();
  });

  editBtn.addEventListener('click', () => {
    inputBox.removeAttribute('disabled');
    inputBox.focus();
  });

  removeBtn.addEventListener('click', () => {
    todos = todos.filter((t) => t.id != newTodoValue.id);
    todoBox.remove();

    // 삭제된 todos 데이터를 로컬스토리지에 저장
    saveToLocalStorage();
  });

  return { todoBox, inputBox, editBtn, removeBtn };
}

function displayTodos() {
  loadFromLocalStorage();

  for (let i = 0; i < todos.length; i++) {
    const item = todos[i];

    const { todoBox } = createTodoElement(item);

    list.append(todoBox);
  }
}

displayTodos();

function saveToLocalStorage() {
  const data = JSON.stringify(todos);
  localStorage.setItem('todoList', data);
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('todoList');

  if (data) {
    todos = JSON.parse(data);
  }
}
