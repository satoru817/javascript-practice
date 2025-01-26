// ### 要件:
// 1. 新しいタスクの追加
//    - 入力欄が空の場合はエラーメッセージを表示
//    - 正しく入力されている場合は、リストに新しいタスクを追加
//    - 追加後は入力欄をクリア

// 2. タスクの完了/未完了の切り替え
//    - タスクをクリックすると完了状態（取り消し線付き）に切り替わる
//    - もう一度クリックすると未完了状態に戻る

// 3. タスクの削除
//    - 各タスクの右側に削除ボタンを追加
//    - 削除ボタンをクリックするとタスクを削除

// 4. タスク数の表示
//    - 総タスク数を常に更新して表示
//    - タスクの追加・削除時に自動更新

// ### ヒント:
// - `getElementById()`を使用して要素を取得
// - `createElement()`で新しい要素を作成
// - `addEventListener()`でイベントを設定
// - `classList`を使用してクラスを操作
// - `display`プロパティでエラーメッセージの表示/非表示を切り替え

// 解答を作成する際は、上記の要件を満たすJavaScriptコードを書いてください。

// この練習問題は以下のDOM操作の基本スキルをカバーしています：
// - イベントリスナーの設定
// - 要素の作成と追加
// - クラスの追加/削除
// - 表示/非表示の切り替え
// - テキストコンテンツの操作
// - 要素の削除

document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todoInput');
  const addButton = document.getElementById('addButton');
  const errorText = document.getElementById('errorText');
  const todoList = document.getElementById('todoList');
  const todoCount = document.getElementById('todoCount');

  addButton.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text == '') {
      errorText.style.display = 'block';
      return;
    }

    errorText.style.display = 'none';
    const li = document.createElement('li');
    const sp = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    setDeleteFunction(deleteBtn, li, todoCount);

    sp.textContent = text;
    li.appendChild(sp);
    li.appendChild(deleteBtn);

    setToggleFunction(li);

    todoList.appendChild(li);
    increment_count(todoCount);

    todoInput.value = '';
  });

  function setToggleFunction(li) {
    li.style.cursor = 'pointer';

    li.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
  }

  function setDeleteFunction(btn, li, count) {
    btn.addEventListener('click', () => {
      li.remove();
      decrement_count(count);
    });
  }

  function increment_count(count) {
    changeCount(count, 1);
  }

  function decrement_count(count) {
    changeCount(count, -1);
  }

  function changeCount(counter, num) {
    var words = counter.textContent.split(' ');
    words[1] = +words[1] + num;
    const new_text = words.join(' ');
    counter.textContent = new_text;
  }
});
