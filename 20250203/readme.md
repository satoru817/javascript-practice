ECサイトのショッピングカート機能を実装する課題を出題させていただきます。

## 課題：ショッピングカートアプリケーション

以下の機能を実装してください：

1. 商品の追加
   - 商品名と価格を入力して追加
   - 入力値のバリデーション（空文字チェック、価格の数値チェック）
   - 追加時にlocalStorageに保存

2. カート内の商品管理
   - 数量の増減（1以上の制限）
   - 商品の削除
   - 合計金額の自動計算
   - すべての変更をlocalStorageに反映

3. ページ読み込み時
   - localStorageから保存済みのカート内容を復元
   - カートが空の場合は「カートは空です」と表示

以下のHTML構造を使用してください：

```html
<!DOCTYPE html>
<html>
<head>
    <title>ショッピングカート</title>
    <style>
        .error { color: red; display: none; }
        .cart-empty { display: none; }
    </style>
</head>
<body>
    <div>
        <h2>商品追加</h2>
        <input type="text" id="itemName" placeholder="商品名">
        <input type="number" id="itemPrice" placeholder="価格">
        <button id="addBtn">追加</button>
        <p id="errorText" class="error">正しい値を入力してください</p>
    </div>

    <div>
        <h2>カート内容</h2>
        <ul id="cartItems"></ul>
        <p id="emptyText" class="cart-empty">カートは空です</p>
        <p>合計金額: <span id="totalPrice">0</span>円</p>
    </div>
</body>
</html>
```

期待される動作：
- 商品追加時のバリデーション（空文字チェック、価格の正数チェック）
- カート内商品の数量増減（1以上）
- 商品削除時の確認ダイアログ表示
- すべての操作をlocalStorageに即時反映
- ページ更新後もカートの内容を維持
- カートが空の場合の適切な表示制御

ボーナスポイント：
- 金額のカンマ区切り表示
- アニメーション効果の追加
- エラーメッセージの詳細化
- Undo機能の実装

このJavaScriptの実装方法について、回答をお願いします。