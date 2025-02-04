class ItemManager{
    constructor(){
        this.items = this.loadItems();
    }

    loadItems(){
        const jsonData = localStorage.getItem('items');
        let items = null;
        if(jsonData){
            items = JSON.parse(jsonData);
        }

        return items ? items:[];
    }

    save(){
        localStorage.setItem('items',JSON.stringify(this.items));
    }

    delete(id){
        this.items = this.items.filter((item)=>item.id !== id);
        this.save();
    }

    add(name,quantity){
        const item = { id: Date.now(), name: name, quantity: quantity, completed: false};
        this.items.push(item);
        this.save();
        return item;
    }

    getItem(id){
        return this.items.find((item)=>item.id === id);
    }

    completeToggle(id){
        const itemToComplete = this.getItem(id);
        itemToComplete.completed = !itemToComplete.completed;
        this.save();
        return itemToComplete;
    }

    increment(id){
        const itemToIncrement = this.getItem(id);
        itemToIncrement.quantity++;
        this.save();
        return itemToIncrement;
    }

    decrement(id){
        const itemToDecrement = this.getItem(id);
        itemToDecrement.quantity--;
        this.save();
        return itemToDecrement;
    }

    erase(){
        this.items = [];
        this.save();
    }

}

document.addEventListener('DOMContentLoaded',()=>{
    const itemName = document.getElementById('itemName');
    const itemQuantity = document.getElementById('itemQuantity');
    const addButton = document.getElementById('addButton');
    const clearButton = document.getElementById('clearButton');
    const errorMessage = document.getElementById('errorMessage');
    const shoppingList = document.getElementById('shoppingList');
    
    const manager = new ItemManager();

    const addDOMItemToList = (domItem)=>{
        shoppingList.appendChild(domItem);
    }

    const createDOMItem=(item)=>{
        const li = document.createElement('li');
        li.id = item.id;
        
        li.innerHTML=`<span>商品名: ${item.name}</span>
                    <span>個数: </span>
                    <span>${item.quantity}</span>
                    <button class = 'plus'>+</button>
                    <button class = 'minus'>-</button>
                    <button class = 'complete'>完了</button>
                    <button class='delete'>削除</button>`
        if(item.completed){
            li.classList.add('completed');
        }

        return li;
    }

    const setDOMItem = (item) =>{
        addDOMItemToList(createDOMItem(item));
    }

    manager.items.forEach(item=>{
        setDOMItem(item);
    })


    const createItem=()=>{

        const item_name = itemName.value.trim();
        if(item_name === ''){
            errorMessage.style.display='block';
            itemName.focus();
            setTimeout(()=>{
                errorMessage.style.display='none';
            },3000)
            return;
        }

        const item_quantity = parseInt(itemQuantity.value);
        if(Number.isNaN(item_quantity)||item_quantity<1){
            errorMessage.style.display='block';
            setTimeout(()=>{
                errorMessage.style.dipsplay='none';
            },3000)
            return;
        }

        const item = manager.add(item_name,item_quantity);
        setDOMItem(item);

        itemName.value='';
        itemQuantity.value='';
        return;

    }

    addButton.addEventListener('click',()=>{
        createItem();
    })

    clearButton.addEventListener('click',()=>{
        if(confirm('本当にすべての商品を削除しますか？')){
            manager.erase();
            shoppingList.innerHTML='';
        }
        return;
    })

    shoppingList.addEventListener('click',(e)=>{
        const target = e.target;

        if(target.classList.contains('complete')){
            const li = target.parentElement;
            li.classList.toggle('completed');
            const id = parseInt(li.id);
            manager.completeToggle(id);
            return;
        }

        if(target.classList.contains('plus')){
            const li = target.parentElement;
            const id = parseInt(li.id);
            const incrementedItem = manager.increment(id);
            li.replaceWith(createDOMItem(incrementedItem));
            return;
        }

        if(target.classList.contains('minus')){
            const li = target.parentElement;
            const id = parseInt(li.id);
            const decrementedItem = manager.decrement(id);
            li.replaceWith(createDOMItem(decrementedItem));
            return;
        }

        if(target.classList.contains('delete')){
            const li = target.parentElement;
            const id = parseInt(li.id);
            manager.delete(id);
            li.remove();
            return;
        }
    })

})