// 問題：以下の機能を実装してください：

// 1数量の増減

// 「+」ボタンをクリックすると数量が1増える
// 「-」ボタンをクリックすると数量が1減る（ただし0未満にはならない）
// 数量が変更されるたびに、小計・消費税・合計を再計算

// 2金額の計算

// 小計は各商品の（単価 × 数量）の合計
// 消費税は小計の10%
// 合計は小計と消費税の合計

// ボーナス課題：

// 数量が0になった商品を削除する機能
// 新商品を追加できる機能
// 3個以上購入で10%割引を適用する機能

document.addEventListener('DOMContentLoaded', () => {
  const products = document.getElementsByClassName('product');
  const subtotal = document.getElementById('subtotal');
  const tax = document.getElementById('tax');
  const total = document.getElementById('total');
  const taxRate = 0.1;

  const calcSubtotal = (product) => {
    const price = parseInt(product.querySelector('.price').textContent);
    const quantity = parseInt(product.querySelector('.quantity').textContent);
    return price * quantity;
  };

  const calcTax = (product) => {
    const price = parseInt(product.querySelector('.price').textContent);
    const quantity = parseInt(product.querySelector('.quantity').textContent);
    return price * taxRate * quantity;
  };

  const setPrices = (products) => {
    const tax_ = [...products].reduce(
      (acc, product) => acc + calcTax(product),
      0
    );
    const subtotal_ = [...products].reduce(
      (acc, product) => acc + calcSubtotal(product),
      0
    );
    const total_ = tax_ + subtotal_;

    tax.textContent = `消費税(10%)： ${tax_}円`;
    total.textContent = `合計： ${total_}円`;
    subtotal.textContent = `小計： ${subtotal_}円`;
  };

  const setDecrementFunction = (btn, quantity) => {
    btn.addEventListener('click', () => {
      let num = parseInt(quantity.textContent);
      if (num == 0) {
        return;
      }

      num--;

      quantity.textContent = num;
      setPrices(products);
    });
  };

  const setIncrementFunction = (btn, quantity) => {
    btn.addEventListener('click', () => {
      let num = parseInt(quantity.textContent);
      num++;
      quantity.textContent = num;
      setPrices(products);
    });
  };

  const addNumChangeFunction = (product) => {
    const decrementButton = product.querySelector('.decrease');
    const incrementButton = product.querySelector('.increase');
    const quantity = product.querySelector('.quantity');

    setDecrementFunction(decrementButton, quantity);
    setIncrementFunction(incrementButton, quantity);
  };

  Array.from(products).forEach((product) => addNumChangeFunction(product));
});

//AIの改善提案
// 素晴らしい実装ですね！いくつかの良い点と、さらに改善できる点を分析させていただきます：

// ### 良い点 👍
// 1. **DOMContentLoadedの適切な使用**
//    - ページ読み込み完了後に処理を開始する適切な実装

// 2. **関数の分割が適切**
//    - `calcSubtotal`、`calcTax`、`setPrices`など、責務ごとに関数を分割
//    - 再利用性と保守性の高いコード

// 3. **スプレッド構文とreduce**の効果的な活用
//    ```javascript
//    [...products].reduce((acc, product) => acc + calcTax(product), 0)
//    ```

// 4. **早期リターン**の使用
//    ```javascript
//    if (num == 0) {
//        return;
//    }
//    ```

// ### 改善提案 🔧

// 1. **定数化**
//    ```javascript
//    const MIN_QUANTITY = 0;
//    const TAX_RATE = 0.1;
//    ```

// 2. **数値のパース**をより堅牢に
//    ```javascript
//    const parseNumber = (str) => {
//        return parseInt(str) || 0;
//    };
//    ```

// 3. **金額表示**の整形
//    ```javascript
//    const formatPrice = (price) => {
//        return price.toLocaleString() + '円';
//    };
//    ```

// 4. **イベントリスナー**の設定をより簡潔に
//    ```javascript
//    const handleQuantityChange = (quantity, delta) => {
//        const newValue = Math.max(0, parseInt(quantity.textContent) + delta);
//        quantity.textContent = newValue;
//        setPrices(products);
//    };
//    ```

// これらの改善を加えることで、より堅牢で保守性の高いコードになります。ただし、現状の実装でも十分に機能的で理解しやすいコードになっていますね！
