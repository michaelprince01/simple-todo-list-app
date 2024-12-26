const todoInput = document.getElementById('todo-input');
const todoList = document.querySelector('.todo-list');
const todoForm = document.querySelector('.todo-form');

const loadTodos = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.forEach((todo) => addTodo(todo.text, todo.completed));
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const addTodo = (text, completed = false) => {
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  const span = document.createElement('span');
  span.textContent = text;
  if (completed) span.classList.add('completed');

  checkbox.addEventListener('change', () => {
    toggleTodoCompletion(text, checkbox.checked);
    span.classList.toggle('completed');
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteTodoFromDOM(li);
    deleteTodoFromStorage(text);
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
};

const deleteTodoFromDOM = (todoElement) => {
  todoList.removeChild(todoElement);
};

const deleteTodoFromStorage = (text) => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = todos.filter((todo) => todo.text !== text);
  saveTodos(updatedTodos);
};

const toggleTodoCompletion = (text, completed) => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = todos.map((todo) =>
    todo.text === text ? { ...todo, completed } : todo
  );
  saveTodos(updatedTodos);
};

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = todoInput.value.trim();
  if (newTodo) {
    addTodo(newTodo);

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: newTodo, completed: false });
    saveTodos(todos);

    todoInput.value = '';
  }
});

loadTodos();
