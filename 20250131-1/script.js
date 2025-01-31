document.addEventListener('DOMContentLoaded', () => {
  const memoInput = document.getElementById('memoInput');
  const addButton = document.getElementById('addButton');
  const memoList = document.getElementById('memoList');

  // localStorageからメモを読み込む
  const loadMemos = () => {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.forEach((memo) => addMemoToDOM(memo));
  };

  // メモをDOMに追加する
  const addMemoToDOM = (text) => {
    const li = document.createElement('li');
    li.className = 'memo-item';

    const span = document.createElement('span');
    span.textContent = text;
    span.addEventListener('click', () => editMemo(span));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '削除';
    deleteBtn.addEventListener('click', () => deleteMemo(li, text));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    memoList.appendChild(li);
  };

  // メモを追加する
  const addMemo = () => {
    const text = memoInput.value.trim();
    if (!text) return;

    // DOMに追加
    addMemoToDOM(text);

    // localStorageに保存
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.push(text);
    localStorage.setItem('memos', JSON.stringify(memos));

    // 入力欄をクリア
    memoInput.value = '';
  };

  // メモを編集する
  const editMemo = (span) => {
    const li = span.parentElement;
    const oldText = span.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = oldText;
    li.classList.add('editing');

    // Enterキーで編集を確定
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const newText = input.value.trim();
        if (newText) {
          span.textContent = newText;
          updateMemoInStorage(oldText, newText);
        }
        li.classList.remove('editing');
        li.replaceChild(span, input);
      }
    });

    // フォーカスが外れたら編集を確定
    input.addEventListener('blur', () => {
      const newText = input.value.trim();
      if (newText) {
        span.textContent = newText;
        updateMemoInStorage(oldText, newText);
      }
      li.classList.remove('editing');
      li.replaceChild(span, input);
    });

    li.replaceChild(input, span);
    input.focus();
  };

  // localStorageのメモを更新する
  const updateMemoInStorage = (oldText, newText) => {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    const index = memos.indexOf(oldText);
    if (index !== -1) {
      memos[index] = newText;
      localStorage.setItem('memos', JSON.stringify(memos));
    }
  };

  // メモを削除する
  const deleteMemo = (li, text) => {
    if (confirm('本当に削除しますか？')) {
      li.remove();
      const memos = JSON.parse(localStorage.getItem('memos')) || [];
      const updatedMemos = memos.filter((memo) => memo !== text);
      localStorage.setItem('memos', JSON.stringify(updatedMemos));
    }
  };

  // イベントリスナー
  addButton.addEventListener('click', addMemo);
  memoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addMemo();
  });

  // 初期読み込み
  loadMemos();
});
