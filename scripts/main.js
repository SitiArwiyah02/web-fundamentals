/**
 * Web Fundamentals - Interactive Scripts
 * Penulis: Siti Arwiyah
 * Fitur:
 * 1. Dark Mode / Light Mode Toggle (dengan LocalStorage)
 * 2. To-Do / Learning Target Checklist (dengan LocalStorage)
 * 3. Click Counter Interaktif
 * 4. Random Color Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Dark Mode Toggle
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  // Cek preferensi tema dari localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Light Mode';
    } else {
      document.body.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Dark Mode';
    }
  }

  // ==========================================
  // 2. To-Do / Target Belajar List (LocalStorage)
  // ==========================================
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  // Ambil daftar todo yang tersimpan di browser
  let todos = JSON.parse(localStorage.getItem('webDevTodos')) || [
    { text: 'Pahami elemen semantik HTML5 (<header>, <main>, <nav>)', completed: true },
    { text: 'Eksplorasi Flexbox dan Grid di CSS3', completed: false },
    { text: 'Latihan Event Listener di JavaScript', completed: false }
  ];

  function saveAndRenderTodos() {
    localStorage.setItem('webDevTodos', JSON.stringify(todos));
    renderTodoList();
  }

  function renderTodoList() {
    todoList.innerHTML = '';
    
    if (todos.length === 0) {
      todoList.innerHTML = '<li style="color: var(--text-muted); text-align: center; padding: 1rem;">Belum ada target. Yuk tambahkan di atas!</li>';
      return;
    }

    todos.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = `todo-item ${item.completed ? 'completed' : ''}`;

      const leftDiv = document.createElement('div');
      leftDiv.className = 'todo-left';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.addEventListener('change', () => {
        todos[index].completed = checkbox.checked;
        saveAndRenderTodos();
      });

      const span = document.createElement('span');
      span.textContent = item.text;

      leftDiv.appendChild(checkbox);
      leftDiv.appendChild(span);

      const btnDelete = document.createElement('button');
      btnDelete.className = 'btn-delete';
      btnDelete.title = 'Hapus item';
      btnDelete.innerHTML = '&times;';
      btnDelete.addEventListener('click', () => {
        todos.splice(index, 1);
        saveAndRenderTodos();
      });

      li.appendChild(leftDiv);
      li.appendChild(btnDelete);
      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    if (taskText) {
      todos.push({ text: taskText, completed: false });
      saveAndRenderTodos();
      todoInput.value = '';
    }
  });

  // Render awal todo list
  renderTodoList();

  // ==========================================
  // 3. Click Counter
  // ==========================================
  const counterValue = document.getElementById('counterValue');
  const btnIncrement = document.getElementById('btnIncrement');
  const btnDecrement = document.getElementById('btnDecrement');
  const btnReset = document.getElementById('btnReset');

  let count = 0;

  function updateCounterDisplay() {
    counterValue.textContent = count;
    if (count > 0) {
      counterValue.style.color = 'var(--primary)';
    } else if (count < 0) {
      counterValue.style.color = 'var(--danger)';
    } else {
      counterValue.style.color = 'var(--text-muted)';
    }
  }

  btnIncrement.addEventListener('click', () => {
    count++;
    updateCounterDisplay();
  });

  btnDecrement.addEventListener('click', () => {
    count--;
    updateCounterDisplay();
  });

  btnReset.addEventListener('click', () => {
    count = 0;
    updateCounterDisplay();
  });

  // ==========================================
  // 4. Random Color Generator
  // ==========================================
  const colorBox = document.getElementById('colorBox');
  const colorHex = document.getElementById('colorHex');
  const btnRandomColor = document.getElementById('btnRandomColor');

  function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  btnRandomColor.addEventListener('click', () => {
    const newColor = getRandomHexColor();
    colorBox.style.backgroundColor = newColor;
    colorHex.textContent = newColor;
  });
});
