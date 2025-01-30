document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const addBtn = document.getElementById('addButton');

  const setDeleteBtn = (btn, li) => {
    btn.textContent = '削除';
    btn.addEventListener('click', () => {
      li.remove();
    });
  };

  const setCompleteToggle = (li) => {
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
  };

  const setTask = (text, btn, li, list) => {
    li.textContent = text;
    li.appendChild(btn);
    setCompleteToggle(li);
    list.appendChild(li);
  };

  const createNewTask = (input, list) => {
    const text = input.value.trim();
    if (text == '') {
      alert('有効なタスク名を入力してください');
      return;
    }

    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');

    setDeleteBtn(deleteBtn, li);

    setTask(text, deleteBtn, li, list);

    input.value = '';
  };

  const setCreateFunction = (btn, input, list) => {
    btn.addEventListener('click', () => {
      createNewTask(input, list);
    });
  };

  setCreateFunction(addBtn, taskInput, taskList);

  document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      createNewTask(taskInput, taskList);
    }
  });
});

//AIの修正案
document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const addBtn = document.getElementById('addButton');

  // イベントデリゲーションでタスクの完了/削除を処理
  taskList.addEventListener('click', (e) => {
    const target = e.target;

    // 削除ボタンの処理
    if (target.classList.contains('deleteBtn')) {
      target.closest('li').remove();
      return;
    }

    // タスクの完了状態トグル
    if (target.tagName === 'LI') {
      target.classList.toggle('completed');
    }
  });

  // タスク追加の共通処理
  const addTask = () => {
    const text = taskInput.value.trim();
    if (!text) return; // 空の場合は処理中止

    const li = document.createElement('li');
    li.textContent = text + ' '; // テキストとボタンの間のスペース

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn'; // class属性を追加
    deleteBtn.textContent = '削除';

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = '';
  };

  // ボタンクリック時の処理
  addBtn.addEventListener('click', addTask);

  // Enterキー処理（入力欄にフォーカス時のみ）
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
});
