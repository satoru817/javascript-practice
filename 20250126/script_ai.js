//AIの修正案

document.addEventListener('DOMContentLoaded', () => {
  // DOM要素の取得
  const todoInput = document.getElementById('todoInput');
  const addButton = document.getElementById('addButton');
  const errorText = document.getElementById('errorText');
  const todoList = document.getElementById('todoList');
  const todoCount = document.getElementById('todoCount');

  // タスク追加のメインロジック
  const addTodo = () => {
    const text = todoInput.value.trim();
    if (!text) {
      errorText.style.display = 'block';
      return;
    }

    errorText.style.display = 'none';
    const todoItem = createTodoItem(text);
    todoList.appendChild(todoItem);
    updateTodoCount(1);
    todoInput.value = '';
  };

  // Todoアイテムの作成
  const createTodoItem = (text) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', (e) => {
      e.stopPropagation(); // イベントの伝播を停止
      li.classList.toggle('completed');
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // イベントの伝播を停止
      li.remove();
      updateTodoCount(-1);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
  };

  // タスク数の更新
  const updateTodoCount = (change) => {
    const currentCount = parseInt(todoCount.textContent.match(/\d+/)[0]);
    todoCount.textContent = `総タスク数: ${currentCount + change}`;
  };

  // イベントリスナーの設定
  addButton.addEventListener('click', addTodo);

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // エラーメッセージを入力開始時に非表示
  todoInput.addEventListener('input', () => {
    errorText.style.display = 'none';
  });
});
