はい、無料で使える API を使用した DOM 操作の練習問題を作成します。ここでは Dog API という無料で画像を取得できる API を使用します。

問題の仕様：

1. このコードは以下のことを実装する必要があります：

- 画面の読み込み時に、Dog API から犬種の一覧を取得しセレクトボックスに表示
- Load Images ボタンクリック時に、選択された犬種の画像を 3 枚取得して表示
- Clear Gallery ボタンクリック時に、表示されている画像をクリア
- データ取得中は「Loading...」と表示し、ボタンを無効化
- エラーが発生した場合は、エラーメッセージを表示

2. 使用する API：

- Dog API (https://dog.ceo/dog-api/)
  - 犬種一覧取得: https://dog.ceo/api/breeds/list/all
  - 特定の犬種の画像取得: https://dog.ceo/api/breed/{breed}/images/random/3

3. 実装のポイント：

- fetch API を使用したデータ取得
- async/await を使用した非同期処理
- DOM の操作（getElementById、createElement、appendChild 等）
- エラーハンドリング
- ローディング状態の管理

このタスクでは、API の呼び出し、DOM 操作、非同期処理、エラーハンドリングなど、実践的な JavaScript の知識を総合的に使用する必要があります。

解答例を見たい場合は、お申し付けください。
