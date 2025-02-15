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

--AI の採点
このコードには重複した実装があり、改善の余地があります。具体的には`createImageDOMFromDatum`関数が定義されているにもかかわらず、`loadMore`イベントリスナー内で同様の DOM 生成ロジックを直接書いています。

以下のように改善できます：

主な改善点：

1. `createImageDOMFromDatum`関数の再利用

- `loadMore`イベントでも同じ関数を使用
- コードの重複を削除
- 一貫性のある動作を保証

2. エラーハンドリングの追加

- `try/catch`ブロックで API 呼び出しを囲む
- ローディング表示の制御を追加
- エラーメッセージの表示

3. コードの整理

- 早期リターンパターンの使用
- 条件分岐の簡略化
- 変数の命名を改善

4. お気に入りボタンの状態管理を改善

- 画像表示時に既存のお気に入りをチェック
- 状態の一貫性を保持

5. CatManager クラスのバグ修正

- `breed`プロパティの重複を修正

これらの改善により、コードの保守性と信頼性が向上しました。

//AI の改善したコード

class CatManager {
constructor() {
this.cats = this.loadCats();
}

loadCats() {
const json_cats = localStorage.getItem('cats');
return json_cats != null ? JSON.parse(json_cats) : [];
}

save() {
localStorage.setItem('cats', JSON.stringify(this.cats));
}

isDuplicate(id) {
return this.cats.find((cat) => cat.id === id) != null;
}

deleteById(id) {
this.cats = this.cats.filter((cat) => cat.id !== id);
this.save();
}

create(id, url, breed) {
const cat = { id: id, url: url, breed: breed };
this.cats.push(cat);
this.save();
return cat;
}
}

document.addEventListener('DOMContentLoaded', async () => {
const apiKey = CONFIG.API_KEY;
const loadMores = document.querySelectorAll('.loadMore');
const showFavorites = document.getElementById('showFavorites');
const totalCount = document.getElementById('totalCount');
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const manager = new CatManager();

const getImageURLs = async (num) => {
const response = await fetch(
`https://api.thecatapi.com/v1/images/search?limit=${num}&api_key=${apiKey}`
);
const data = await response.json();
return data;
};

const createImageDOMFromDatum = (datum) => {
const div = document.createElement('div');
div.className = 'cat-card';

    const img = document.createElement('img');
    img.src = datum.url;
    img.className = 'cat-image';
    div.appendChild(img);

    const breedName = datum?.breeds?.[0]?.name || datum.breed || false;
    if (breedName !== false) {
      const description = document.createElement('div');
      description.className = 'text-overlay';
      description.textContent = breedName;
      div.appendChild(description);
    }

    const button = document.createElement('button');
    button.textContent = 'お気に入り';
    button.className = 'favorite-btn';
    if (manager.isDuplicate(datum.id)) {
      button.classList.add('favorite');
    }
    button.dataset.url = datum.url;
    button.dataset.id = datum.id;
    button.dataset.breed = breedName;
    div.appendChild(button);

    return div;

};

const setDOMFromData = (data) => {
const fragment = document.createDocumentFragment();
data.forEach((datum) => {
fragment.appendChild(createImageDOMFromDatum(datum));
});
gallery.appendChild(fragment);
};

showFavorites.addEventListener('click', () => {
setDOMFromData(manager.cats);
totalCount.textContent = parseInt(totalCount.textContent) + manager.cats.length;
});

loadMores.forEach((button) => {
button.addEventListener('click', async () => {
try {
loading.style.display = 'block';
const data = await getImageURLs(6);
setDOMFromData(data);
totalCount.textContent = parseInt(totalCount.textContent) + 6;
} catch (error) {
console.error('Failed to load images:', error);
alert('画像の読み込みに失敗しました');
} finally {
loading.style.display = 'none';
}
});
});

gallery.addEventListener('click', (e) => {
const target = e.target;
if (!target.classList.contains('favorite-btn')) return;

    if (target.classList.contains('favorite')) {
      manager.deleteById(target.dataset.id);
      target.parentElement.remove();
    } else {
      if (manager.isDuplicate(target.dataset.id)) {
        alert('すでにお気に入りです');
      } else {
        manager.create(
          target.dataset.id,
          target.dataset.url,
          target.dataset.breed
        );
        target.classList.add('favorite');
      }
    }

});
});
