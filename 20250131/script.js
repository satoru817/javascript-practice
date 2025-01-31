// usernameInput.addEventListener('input', function () {
//   clearTimeout(debounceTimer);
//   const username = this.value.trim();

//   debounceTimer = setTimeout(() => {
//     if (username.length > 0) {
//       fetchSchools(username);
//     } else {
//       clearSchoolOptions();
//     }
//   }, 300);
// });

document.addEventListener('DOMContentLoaded', () => {
  const productName = document.getElementById('productName');
  const productPrice = document.getElementById('productPrice');
  const productStock = document.getElementById('productStock');
  const productList = document.getElementById('productList');
  const addBtn = document.getElementById('addProduct');
  const formatter = new Intl.NumberFormat('ja-JP');
  const searchInput = document.getElementById('searchInput');

  const addProduct = () => {
    const text = productName.value.trim();
    if (!text) {
      alert('有効な商品名を入力してください');
      return;
    }

    const price = parseInt(productPrice.value);
    if (price == null || price <= 0) {
      alert('有効な価格を入力してください');
      return;
    }

    const stock = parseInt(productStock.value);
    if (stock < 0) {
      alert('有効な在庫数を入力して下さい');
      return;
    }

    const format_price = formatter.format(price);

    const productCard = document.createElement('div');

    productCard.className = 'product-card';
    productCard.innerHTML = `<div class="product-info">
            <h3>${text}</h3>
            <p>価格: ${format_price}円</p>
            <p>在庫: <span class="stock-count">${stock}</span>個</p>
          </div>
          <div class="product-actions">
            <button class="sell-btn">販売</button>
            <button class="delete-btn">削除</button>
          </div>`;
    if (stock == 0) {
      productCard.classList.add('stock-zero');
      productCard.querySelector('.sell-btn').remove();
    }

    productList.appendChild(productCard);
  };

  const showMatched = (searchQuery) => {
    console.log(`searchQuery:${searchQuery}`);
    if (searchQuery.trim() === '') {
      [...productList.querySelectorAll('.product-card')].forEach((product) => {
        product.style.display = 'flex';
      });
    }
    [...productList.querySelectorAll('.product-card')].forEach((product) => {
      const name = product.querySelector('h3').textContent.trim();
      if (name.toLowerCase().includes(searchQuery.toLowerCase())) {
        product.style.display = 'flex';
      } else {
        product.style.display = 'none';
      }
    });
  };

  const searchMatched = () => {
    console.log('searchMatchedは呼び出されています');
    const searchQuery = searchInput.value.trim();
    setTimeout(() => {
      showMatched(searchQuery);
    }, 300);
  };

  searchInput.addEventListener('input', searchMatched);
  searchInput.addEventListener('focusout', searchMatched);

  addBtn.addEventListener('click', () => {
    addProduct();
  });

  const animateBackGround = (card) => {
    card.classList.add('highlight');
    setTimeout(() => {
      card.classList.remove('highlight');
    }, 1000);
  };

  productList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete-btn')) {
      if (confirm('本当に削除しますか？')) {
        target.parentElement.parentElement.remove();
        return;
      }
      alert('削除はキャンセルされました');
    }

    if (target.classList.contains('sell-btn')) {
      const productCard = target.parentElement.parentElement;
      const stockCount = productCard.querySelector('.stock-count');
      let count = parseInt(stockCount.textContent);
      count--;
      stockCount.textContent = count;

      animateBackGround(productCard);
      if (count == 0) {
        e.target.remove();
        productCard.classList.add('stock-zero');
      }
    }
  });
});
