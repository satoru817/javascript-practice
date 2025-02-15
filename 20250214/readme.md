CAT ちゃん画像ギャラリーを作成する課題を出題させていただきます。
The Cat API を使って DOM 操作を実践する良い練習になるかと思います。

問題：
以下の要件を満たす JavaScript コードを実装してください。

### 要件

1. The Cat API (https://api.thecatapi.com/v1/images/search) を使用して猫の画像を取得する
2. 「もっと見る」ボタンをクリックすると、新しい猫画像を 6 枚追加で読み込む
3. 各猫画像カードに「お気に入り」ボタンを実装する
   - クリックするとボタンの色が変わり、LocalStorage に保存する
   - 再読み込み後もお気に入り状態を維持する
4. 「お気に入り表示」ボタンで、お気に入りに登録した画像のみを表示する
5. 読み込み中は「読み込み中...」の表示を出す
6. 現在の読み込み済み画像数を表示する

### ヒント

1. 猫画像カードの HTML 構造:

```javascript
const cardHTML = `
  <div class="cat-card" data-id="${imageId}">
    <img src="${imageUrl}" alt="猫ちゃん" class="cat-image">
    <button class="favorite-btn">❤</button>
  </div>
`;
```

2. LocalStorage の使用例:

```javascript
// お気に入りの保存
localStorage.setItem('favorites', JSON.stringify(favorites));

// お気に入りの読み込み
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
```

3. fetch API の使用例:

```javascript
const response = await fetch(
  'https://api.thecatapi.com/v1/images/search?limit=6'
);
const data = await response.json();
```

### チャレンジポイント

1. エラーハンドリングの実装
2. パフォーマンスを考慮した実装（不要な DOM 操作を避ける）
3. ローディング状態の適切な管理
4. お気に入り状態の効率的な管理と表示切り替え

まずは基本的な機能を実装し、その後チャレンジポイントに取り組んでみてください。コードが完成したら、実際に動作確認をして、必要に応じて改善を加えていきましょう。

回答する準備ができましたら、実装を始めていただけます。質問があればお気軽にどうぞ。
