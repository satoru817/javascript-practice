class ItemManager{
    constructor(){
        this.items = this.loadItems();
    }

    loadItems(){
        const jsonData = localStorage.getItem('items');
        return jsonData ? JSON.parse(jsonData):[];
    }

    save(){
        localStorage.setItem('items',JSON.stringify(this.items));
    }

    delete(id){
        this.items=this.items.filter((item)=>item.id !== id);
        this.save();
    }

    add(name,price){
        const newItem = {id: Date.now(),name: name, price: price, quantity: 1};
        this.items.push(newItem);
        this.save();
        return newItem;
    }

    increment(id){
        const itemToIncrement = this.items.find((item)=>item.id === id);
        itemToIncrement.quantity = itemToIncrement.quantity +1;
        this.save();
        return itemToIncrement;
    }

    decrement(id){
        const itemToDecrement = this.items.find((item)=>item.id===id);
        itemToDecrement.quantity = itemToDecrement.quantity -1;
        this.save();
        return itemToDecrement;
    }


}

document.addEventListener('DOMContentLoaded',()=>{
    const itemName = document.getElementById('itemName');
    const itemPrice = document.getElementById('itemPrice');
    const addBtn = document.getElementById('addBtn');
    const errorText = document.getElementById('errorText');
    const cartItems = document.getElementById('cartItems');
    const emptyText = document.getElementById('emptyText');
    const totalPrice = document.getElementById('totalPrice');

    const manager = new ItemManager();

    const createDomItem=(item)=>{
        const li = document.createElement('li');
        li.id = item.id;
        li.innerHTML = `<span>${item.name}:</span><span>単価</span>
                        <span>${item.price}</span><span>円 ×　個数</span>
                        <span>${item.quantity}</span><span> = </span>
                        <span>${item.price*item.quantity}</span>
                        <span>円</span>
                        <button class = 'plus'>+</button>
                        <button class='minus'>-</button>
                        <button class='delete'>削除</button>`
        return li;                
        cartItems.appendChild(li);
    }

    const setDomItem=(item)=>{
        const newLi = createDomItem(item);
        cartItems.appendChild(newLi);
    }

    const createTotalPrice=()=>{
        const total_price = manager.items.reduce((sum,item)=>sum+item.price*item.quantity,0);
        totalPrice.textContent = total_price;
    }

    const createItem=()=>{
        const name = itemName.value.trim();
        const price = parseInt(itemPrice.value);
        const item = manager.add(name,price);
        setDomItem(item);
        createTotalPrice();
    }

    if(manager.items.length === 0){
        emptyText.classList.remove('cart-empty');
    }else{
        manager.items.forEach(element => {
            setDomItem(element);
        });
           
        createTotalPrice();
    }

    addBtn.addEventListener('click',()=>{
        createItem();
    })

    cartItems.addEventListener('click',(e)=>{
        const target = e.target;

        if(target.classList.contains('plus')){
            const li = target.parentElement;
            const id = li.id;
            const item = manager.increment(id);
            li.replaceWith(createDomItem(item));
            createTotalPrice();
        }

        if(target.classList.contains('minus')){
            const li = target.parentElement;
            const id = li.id;
            const item = manager.decrement(id);
            li.replaceWith(createDomItem(item));
            createTotalPrice();
        }

        if(target.classList.contains('delete')){
            const li = target.parentElement;
            const id = li.id;
            manager.delete(id);
            li.remove();
            createTotalPrice();
        }
    })




})