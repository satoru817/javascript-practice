class ItemManager {
    constructor() {
        this.items = this.loadItems();
    }

    loadItems() {
        const itemsJson = localStorage.getItem('items');
        return itemsJson ? JSON.parse(itemsJson) : [];
    }

    addItem(text, num) {
        const item = { id: Date.now(), name: text, price: num };
        this.items.push(item);
        this.save();
        return item;
    }

    save() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }

    delete(id) {
        this.items = this.items.filter((item) => item.id != id);
        this.save();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const itemName = document.getElementById('itemName');
    const itemPrice = document.getElementById('itemPrice');
    const addButton = document.getElementById('addButton');
    const errorText = document.getElementById('errorText');
    const shoppingList = document.getElementById('shoppingList');
    const totalPrice = document.getElementById('totalPrice');

    const manager = new ItemManager();

    const createElement = (item) => {
        const li = document.createElement('li');
        li.classList.add('item');
        li.id = item.id;
        li.innerHTML = `<span>商品名： </span><span>${item.name}</span><span>, 価格: </span><span class="price">${item.price}</span><span>円</span><button class="deleteBtn">削除</button>`;
        shoppingList.appendChild(li);
    };

    const calculateTotal = () => {
        const total = Array.from(shoppingList.getElementsByClassName('price'))
            .map((price) => parseInt(price.textContent))
            .reduce((acc, curr) => acc + curr, 0);

        totalPrice.textContent = `total:${total}円`;
    };

    manager.items.forEach((item) => {
        createElement(item);
        calculateTotal();
    });

    const createFromForm = () => {
        const name = itemName.value.trim();
        const len = [...name].length;
        if (len === 0 || len > 20) {
            alert('1文字以上20文字以下の有効な名前を入力してください');
            itemName.focus();
            return;
        }
        const price = parseInt(itemPrice.value);
        if (price <= 0) {
            alert('0円以上の価格を入力してください');
            itemPrice.focus();
            return;
        }

        const item = manager.addItem(name, price);
        createElement(item);
        calculateTotal();
    };

    addButton.addEventListener('click', () => {
        createFromForm();
    });

    shoppingList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('deleteBtn')) {
            const li = target.closest('li');
            const id = parseInt(li.id);
            li.remove();
            manager.delete(id);
            calculateTotal();
        }
    });
});
