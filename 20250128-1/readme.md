それでは、中級レベルのDOM操作の練習問題を出題させていただきます。

# 問題：動的なタスク管理アプリケーション

以下の要件を満たすタスク管理アプリケーションを作成してください：

## 要件
1. タスク入力フォームがあり、タスクの追加が可能
2. 追加されたタスクは以下の機能を持つ：
   - 完了/未完了の切り替え（クリックで切り替え）
   - 削除ボタン
   - 優先度（高/中/低）の選択
3. タスクの総数を表示
4. 優先度でのフィルタリング機能
5. エラー処理（空のタスクは追加不可）

## HTML構造
```html
<!DOCTYPE html>
<html>
<head>
    <title>Task Manager</title>
    <style>
        .completed {
            text-decoration: line-through;
            color: gray;
        }
        .error {
            color: red;
            display: none;
        }
        .task-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .high-priority {
            background-color: #ffebee;
        }
        .medium-priority {
            background-color: #fff3e0;
        }
        .low-priority {
            background-color: #e8f5e9;
        }
    </style>
</head>
<body>
    <div id="task-manager">
        <h2>タスク管理</h2>
        <div id="task-form">
            <input type="text" id="taskInput" placeholder="新しいタスクを入力">
            <select id="prioritySelect">
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
            </select>
            <button id="addTask">追加</button>
            <p id="errorText" class="error">タスクを入力してください</p>
        </div>
        
        <div id="filter-section">
            <select id="filterPriority">
                <option value="all">全て</option>
                <option value="high">高優先度</option>
                <option value="medium">中優先度</option>
                <option value="low">低優先度</option>
            </select>
        </div>

        <div id="taskList"></div>
        <div id="taskCount">総タスク数: 0</div>
    </div>
</body>
</html>
```

## 課題
1. この HTML に対して、必要な JavaScript を実装してください。
2. イベントリスナーは DOMContentLoaded 内で設定してください。
3. コードは関数に分割し、責務を明確にしてください。
4. エラー処理を適切に実装してください。

## 要件の詳細
1. タスクの追加
   - 空のタスクは追加不可（エラーメッセージを表示）
   - 追加後は入力フィールドをクリア
   - エラーメッセージは3秒後に非表示

2. タスクの表示
   - 各タスクには完了トグル、優先度表示、削除ボタンを含める
   - 優先度に応じて背景色を変更

3. フィルタリング
   - 選択した優先度のタスクのみを表示
   - "全て" を選択した場合は全タスクを表示

4. カウンター
   - タスクの追加・削除時にカウンターを更新

このアプリケーションの実装を通じて、以下のスキルを確認します：
- DOM要素の取得と操作
- イベントリスナーの設定
- 動的な要素の作成と追加
- クラスの追加/削除による状態管理
- エラー処理
- フィルタリング機能の実装

回答をお待ちしております。