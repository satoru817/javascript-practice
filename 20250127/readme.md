はい、あなたの学習状況から見て、特にイベント処理とクラス操作、状態管理の練習に適した問題を作成させていただきます。

課題: カテゴリー付き Todo リストの実装

以下の機能を実装してください：

1. タスクの追加機能

   - 入力値が空の場合はエラーメッセージを表示
   - カテゴリーを選択できる
   - 追加時にタスク数のカウントを更新

2. タスクの完了/重要マーク機能

   - タスクをクリックで完了/未完了を切り替え
   - 「！」ボタンで重要マークの切り替え
   - 完了時にカウントを更新

3. フィルター機能

   - すべて/未完了/完了済みの表示切り替え
   - 現在の表示状態に応じてボタンのスタイルを変更

4. タスクの削除機能
   - 削除ボタンでタスクを削除
   - 削除時にカウントを更新

### ヒント:

1. タスクアイテムの構造例:

```javascript
const taskItem = document.createElement('div');
taskItem.className = 'task-item';
taskItem.innerHTML = `
    <span class="category-badge">${category}</span>
    <span class="task-text">${text}</span>
    <div class="task-actions">
        <button class="important-btn">！</button>
        <button class="delete-btn">削除</button>
    </div>
`;
```

2. フィルター処理の考え方:

```javascript
// タスクの表示/非表示を切り替える関数
function filterTasks(filter) {
  const tasks = document.querySelectorAll('.task-item');
  tasks.forEach((task) => {
    // フィルター条件に応じて表示/非表示を切り替え
  });
}
```

評価のポイント：

1. イベントリスナーの適切な使用
2. クラス操作による状態管理
3. カウント処理の正確性
4. エラー処理の実装
5. コードの構造化と可読性

ぜひチャレンジしてみてください！質問があればお気軽にどうぞ。
