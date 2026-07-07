const STORAGE_KEY = 'kainos-todo:todos';

const state = {
  todos: [],
  filter: 'all',
  aiLoading: false,
};

const VALID_FILTERS = new Set(['all', 'active', 'done']);
const VALID_PRIORITIES = new Set(['high', 'medium', 'low']);

function normalizeTodo(todo) {
  if (!todo || typeof todo !== 'object') return null;

  const rawId = todo.id;
  const id = typeof rawId === 'string' ? rawId : String(rawId ?? '');
  if (!id) return null;

  const text = typeof todo.text === 'string' ? todo.text.trim() : '';
  if (!text) return null;

  const done = typeof todo.done === 'boolean' ? todo.done : false;

  const createdAt = typeof todo.createdAt === 'string' && !Number.isNaN(Date.parse(todo.createdAt))
    ? todo.createdAt
    : new Date().toISOString();

  const priority = typeof todo.priority === 'string' && VALID_PRIORITIES.has(todo.priority)
    ? todo.priority
    : null;

  return {
    id,
    text,
    done,
    createdAt,
    priority,
  };
}

// ── Persistence ────────────────────────────────────────────────

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    render();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      state.todos = [];
      render();
      return;
    }

    state.todos = parsed
      .map(normalizeTodo)
      .filter((todo) => todo !== null);
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
  if (!VALID_FILTERS.has(filter)) return;
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

  if (priority !== null && !VALID_PRIORITIES.has(priority)) return;

  todo.priority = priority;
  saveState();
  render();
}

// ── Render ─────────────────────────────────────────────────────

function renderList() {
  const list = document.getElementById('todo-list');
  const visible = getVisibleTodos();
  list.textContent = '';

  const fragment = document.createDocumentFragment();

  visible.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.done ? ' done' : ''}`;
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.setAttribute('aria-label', `${todo.done ? 'Mark as incomplete' : 'Mark as complete'}: ${todo.text}`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    item.appendChild(checkbox);
    item.appendChild(text);

    if (todo.priority) {
      const badge = document.createElement('span');
      badge.className = `priority-badge priority-${todo.priority}`;
      badge.textContent = todo.priority;
      item.appendChild(badge);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.type = 'button';
    deleteBtn.title = 'Delete';
    deleteBtn.setAttribute('aria-label', `Delete task: ${todo.text}`);
    deleteBtn.textContent = '✕';

    item.appendChild(deleteBtn);
    fragment.appendChild(item);
  });

  list.appendChild(fragment);
}

function renderEmptyState() {
  const empty = document.getElementById('empty-state');
  empty.style.display = getVisibleTodos().length === 0 ? 'block' : 'none';
}

function renderFilterBar() {
  const buttons = document.querySelectorAll('#filter-bar .filter-btn');
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === state.filter;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

function renderStats() {
  const total  = state.todos.length;
  const done   = state.todos.filter(t => t.done).length;
  const active = total - done;

  document.getElementById('stats').textContent = `${active} task${active !== 1 ? 's' : ''} left`;

  const bar = document.getElementById('progress-bar');
  if (bar) {
    const progress = total === 0 ? 0 : Math.round((done / total) * 100);
    bar.style.width = `${progress}%`;
    bar.setAttribute('aria-valuenow', String(progress));
    bar.setAttribute('aria-valuetext', `${done} of ${total} tasks completed`);
  }

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
