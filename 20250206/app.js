class ProductManager {
  constructor() {
    this.products = this.loadProducts();
  }

  loadProducts() {
    const json_products = localStorage.getItem('products');
    return json_products != null ? JSON.parse(json_products) : [];
  }

  save() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  create(name, price) {
    const product = { name: name, price: price, quantity: 1 };
    this.products.push(product);
    this.save();
    return product;
  }

  delete(name) {
    this.products = this.products.filter((product) => product.name !== name);
    this.save();
  }

  deleteAll() {
    this.products = [];
    this.save();
  }

  getByName(name) {
    const product = this.products.find((product) => product.name === name);
    return product ? product : null;
  }

  increment(name) {
    const productToUpdate = this.getByName(name);
    if (productToUpdate) {
      const curr = productToUpdate.count;
      if (curr < 10) {
        productToUpdate.count++;
      }
    }
    this.save();
    return productToUpdate;
  }

  decrement(name) {
    const productToUpdate = this.getByName(name);
    if (productToUpdate) {
      const curr = productToUpdate.count;
      if (curr > 1) {
        productToUpdate.count--;
      }
    }
    this.save();
    return productToUpdate;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cartItems = document.getElementById('cart-items');
  const totalAmount = document.getElementById('total-amount');
  const errorMessage = document.getElementById('error-message');
  const successMessage = document.getElementById('success-message');
  const manager = new ProductManager();

  const createDOMFromLoadData = (product) => {
    const li = document.createElement('li');
    li.id = product.name;
    li.innerHTML = `<span>${product.name}</span>
                        <span> : 小計</span>
                        <span>${product.price}</span>
                        <span>×</span>
                        <span>${product.quantity}</span>
                        <span> = </span>
                        <span>${product.price * product.quantity}</span>
                        <span>円</span>
                        <button class='minus'>-</button>
                        <button class='plus'>+</button>
                        <button class='delete'>削除</button>`;
    return li;
  };

  const debounce = (func, wait) => {
    let timeout;

    return function (...args) {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const renderProduct = (product) => {
    cartItems.appendChild(createDOMFromLoadData(product));
  };

  const renderProducts = (products) => {
    const fragment = document.createDocumentFragment();
    products.forEach((product) => {
      fragment.appendChild(createDOMFromLoadData(product));
    });
    cartItems.appendChild(fragment);
  };

  const calculateTotal = () => {
    const total = manager.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    totalAmount.textContent = total;
  };

  renderProducts(manager.products);
  calculateTotal();

  //同じ商品があるときは個数追加。そうでないときは新たに作成
  function addToCart(name, price) {
    const product = manager.getByName(name);
    if (product) {
      product.quantity++;
      manager.save();
      cartItems.innerHTML = '';
      renderProducts(manager.products);
      debounce(calculateTotal, 300);
      return;
    }

    const newProduct = manager.create(name, price);
    renderProduct(newProduct);
  }

  const clearCart = () => {
    if (confirm('すべて消去しますか？')) {
      cartItems.innerHTML = '';
      manager.deleteAll();
      debounce(calculateTotal, 300);
    }
  };

  function checkout() {
    if (confirm('購入しますか？')) {
      successMessage.textContent = '購入処理が成功しました。';
      successMessage.style.display = 'block';
      manager.deleteAll();
      cartItems.innerHTML = '';
      debounce(calculateTotal, 300);
    }
  }

  //グローバルスコープに登録
  window.addToCart = addToCart;
  window.clearCart = clearCart;
  window.checkout = checkout;

  const errorMessageDisplay = () => {
    errorMessage.textContent = '不正な操作です';
    errorMessage.style.display = 'block';
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 1000);
  };

  cartItems.addEventListener('click', (e) => {
    const target = e.target;
    if (target) {
      const li = target.parentElement;
      const name = li.id;
      if (target.classList.contains('delete')) {
        if (confirm('消去してよいですか？')) {
          manager.delete(name);
          li.remove();
          debounce(calculateTotal, 300);
        }
      }

      if (target.classList.contains('minus')) {
        const product = manager.getByName(name);
        if (product.quantity < 2) {
          errorMessageDisplay();
        } else {
          product.quantity--;
          manager.save();
          li.replaceWith(createDOMFromLoadData(product));
          debounce(calculateTotal, 300);
        }
      }

      if (target.classList.contains('plus')) {
        const product = manager.getByName(name);
        if (product.quantity > 9) {
          errorMessageDisplay();
        } else {
          product.quantity++;
          manager.save();
          li.replaceWith(createDOMFromLoadData(product));
          debounce(calculateTotal, 300);
        }
        return;
      }
    }
  });
});
