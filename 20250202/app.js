class ItemManager {
  constructor() {
    this.items = this.loadItems();
  }

  loadItems() {
    const itemsJson = localStorage.getItem("items");
    return itemsJson ? JSON.parse(itemsJson) : []; //itemsJsonが無いときは空の配列[]を返す
  }

  save() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  delete(id) {
    this.items = this.items.filter((item) => item.id !== id); //暗黙型変換を許さない比較（厳密等価演算子)
    this.save();
  }

  //quantity変更のためのメソッド
  changeQuantity(id, delta) {
    const itemToUpdate = this.items.find((item) => item.id === id);
    if (itemToUpdate) {
      itemToUpdate.quantity += delta;
      this.save();
      return itemToUpdate;
    }
  }

  addItem(name, price, quantity) {
    const item = {
      id: Date.now(),
      name: name,
      price: price,
      quantity: quantity,
    }; //idを振ってitem objectを作成
    this.items.push(item); //items配列に追加
    this.save(); //localStorageに保存
    return item; //item objectを返す。
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const itemName = document.getElementById("itemName");
  const itemPrice = document.getElementById("itemPrice");
  const addButton = document.getElementById("addButton");
  const errorText = document.getElementById("errorText");
  const shoppingList = document.getElementById("shoppingList");
  const totalAmount = document.getElementById("totalAmount");
  itemName.focus();

  const calculateTotalAmount = () => {
    const subtotals = document.querySelectorAll(".subtotal");
    let total = 0;
    Array.from(subtotals).forEach((subtotal) => {
      total += parseInt(subtotal.textContent);
    });

    totalAmount.textContent = total;
  };

  const createNewDOMItem = (item) => {
    const li = document.createElement("li");
    const id = parseInt(item.id);
    const name = item.name;
    const price = parseInt(item.price);
    const quantity = parseInt(item.quantity);
    li.id = id;

    li.innerHTML = `<span>${name}</span><span> : </span>
                            <span class="price">${price}</span><span>円</span>
                            <span> × </span><span class="quantity">${quantity}</span><span>個 = </span>
                            <span class="subtotal">${
                              price * quantity
                            }</span><span>円</span>
                            <button class="minus"> - </button><span> </span>
                            <button class="plus"> + </button><span> </span>
                            <button class="delete">削除</button>`;
    return li;
  };

  const setNewDOMItem = (item) => {
    shoppingList.appendChild(createNewDOMItem(item));
  };

  const manager = new ItemManager();

  manager.items.forEach((item) => {
    setNewDOMItem(item);
  });

  calculateTotalAmount();

  const createNewItem = () => {
    const name = itemName.value.trim();
    if (name === "") {
      errorText.textContent = "有効な商品名を入力してください";
      itemName.value = "";
      itemName.focus();
      errorText.classList.remove("hidden");
      setTimeout(() => {
        errorText.classList.add("hidden");
      }, 1000);

      return;
    }

    const price = parseInt(itemPrice.value);
    if (Number.isNaN(price) || price < 0) {
      errorText.textContent = "有効な価格を入力してください";
      itemPrice.value = "";
      itemPrice.focus();
      errorText.classList.remove("hidden");
      setTimeout(() => {
        errorText.classList.add("hidden");
      }, 1000);
      return;
    }

    const newItem = manager.addItem(name, price, 1);
    setNewDOMItem(newItem);
    calculateTotalAmount();
  };

  addButton.addEventListener("click", () => {
    createNewItem();
    itemName = "";
    itemPrice = "";
    itemName.focus();
  });

  shoppingList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("plus")) {
      let li = target.parentElement;
      const id = parseInt(li.id);
      const item = manager.changeQuantity(id, 1);
      li.replaceWith(createNewDOMItem(item));
      calculateTotalAmount();
    }

    if (target.classList.contains("minus")) {
      let li = target.parentElement;
      const id = parseInt(li.id);
      const item = manager.changeQuantity(id, -1);
      li.replaceWith(createNewDOMItem(item));
      calculateTotalAmount();
    }

    if (target.classList.contains("delete")) {
      const li = target.parentElement;
      const id = parseInt(li.id);
      manager.delete(id);
      li.remove();
      calculateTotalAmount();
    }
  });
});
