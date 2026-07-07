const STORAGE_KEY = 'kainos-todo:todos';

const state = {
  todos: [],
  filter: 'all',
  aiLoading: false,
};

// ── Persistence ────────────────────────────────────────────────

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    render();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.todos = Array.isArray(parsed) ? parsed : [];
  } catch {
    state.todos = [];
  }

  render();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
}

// ── Business logic ─────────────────────────────────────────────

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const id = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

  state.todos.push({
    id,
    text: trimmed,
    done: false,
    createdAt: new Date().toISOString(),
    priority: null,
  });

  saveState();
  render();
}

function toggleTodo(id) {
  const todo = state.todos.find(item => item.id === id);
  if (!todo) return;

  todo.done = !todo.done;
  saveState();
  render();
}

function deleteTodo(id) {
  const initialLength = state.todos.length;
  state.todos = state.todos.filter(item => item.id !== id);
  if (state.todos.length === initialLength) return;

  saveState();
  render();
}

function setFilter(filter) {
  state.filter = filter;
  render();
}

function getVisibleTodos() {
  if (state.filter === 'active') {
    return state.todos.filter(todo => !todo.done);
  }

  if (state.filter === 'done') {
    return state.todos.filter(todo => todo.done);
  }

  return state.todos;
}

function setPriority(id, priority) {
  const todo = state.todos.find(item => item.id === id);
  if (!todo) return;

  todo.priority = priority;
  saveState();
  render();
}

// ── Render ─────────────────────────────────────────────────────

function renderList() {
  const list = document.getElementById('todo-list');
  const visible = getVisibleTodos();
  list.innerHTML = visible.map(todo => `
    <li class="todo-item${todo.done ? ' done' : ''}" data-id="${todo.id}">
      <input class="todo-checkbox" type="checkbox" ${todo.done ? 'checked' : ''} />
      <span class="todo-text">${todo.text}</span>
      ${todo.priority ? `<span class="priority-badge priority-${todo.priority}">${todo.priority}</span>` : ''}
      <button class="btn-delete" title="Delete">✕</button>
    </li>
  `).join('');
}

function renderEmptyState() {
  const empty = document.getElementById('empty-state');
  empty.style.display = getVisibleTodos().length === 0 ? 'block' : 'none';
}

function renderFilterBar() {
  const buttons = document.querySelectorAll('#filter-bar .filter-btn');
  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === state.filter);
  });
}

function renderStats() {
  const total  = state.todos.length;
  const done   = state.todos.filter(t => t.done).length;
  const active = total - done;

  document.getElementById('stats').textContent = `${active} task${active !== 1 ? 's' : ''} left`;

  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = (total === 0 ? 0 : Math.round((done / total) * 100)) + '%';

  const countEl = document.getElementById('task-count');
  if (countEl) countEl.textContent = total === 0 ? '' : `${done} / ${total} done`;
}

function render() {
  renderList();
  renderEmptyState();
  renderFilterBar();
  renderStats();
}

// ── Event wiring ───────────────────────────────────────────────

function initHandlers() {
  const form = document.getElementById('add-form');
  const input = document.getElementById('todo-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(input.value);
    input.value = '';
    input.focus();
  });

  document.getElementById('filter-bar').addEventListener('click', (e) => {
    const button = e.target.closest('.filter-btn');
    if (!button) return;
    setFilter(button.dataset.filter);
  });

  document.getElementById('todo-list').addEventListener('click', (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;

    const id = todoItem.dataset.id;
    if (!id) return;

    if (e.target.matches('.btn-delete')) {
      deleteTodo(id);
      return;
    }

    if (e.target.matches('.todo-checkbox')) {
      toggleTodo(id);
    }
  });

  // Options link
  document.getElementById('options-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.open('options.html');
  });
}

// ── AI Feature (Task 5) ────────────────────────────────────────

async function suggestPriority(id) {
}

// ── Boot ───────────────────────────────────────────────────────

loadState();
initHandlers();
