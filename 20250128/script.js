document.addEventListener('DOMContentLoaded',()=>{
    const itemName = document.getElementById('itemName');
    const itemPrice = document.getElementById('itemPrice');
    const addBtn = document.getElementById('addButton');
    const errorText = document.getElementById('errorText');
    const shoppingList = document.getElementById('shoppingList');
    const total = document.getElementById('total');

    const setTotalPrice =(list,total)=>{
        const items = list.getElementsByClassName('item');
        let total_amount = 0;
        [...items].forEach(item=>{
            const price = item.querySelector('.item_price');
            const count = item.querySelector('.count');
            total_amount += pareseInt(price.value)*parseInt(count.value);
        })

        total.textContent = `合計金額: ${total_amount}円`;
    
    }

    const setMinusFunction = (btn,span)=>{
        btn.addEventListener('click',()=>{
            let curr = parseInt(span.textContent);
            if(curr>0){
                span.textContent = curr-1;
            }
            setTotalPrice(shoppingList,total);
        })
    }

    const setPlusFunction = (btn,span)=>{
        btn.addEventListener('click',()=>{
            let curr = parseInt(span.textContent);
            span.textContent = curr+1;
            setTotalPrice(shoppingList,total);
        })
    }

    const setNumChangeFunction=(item)=>{
        const minusBtn = document.createElement('button');
        const numSpan = document.createElement('span');
        const plusBtn = document.createElement('button');

        minusBtn.textContent = '-';
        plusBtn.textContent = '+';
        numSpan.textContent = '1';
        numSpan.className='count';

        setMinusFunction(minusBtn,numSpan);
        setPlusFunction(plusBtn,numSpan);

        item.appendChild(minusBtn);
        item.appendChild(numSpan);
        item.appendChild(plusBtn);
        
    }
    
    const createNewItem=(name,price,error,list)=>{
        if(name.value.trim()=='' || price.value <= 0){
            error.style.display='block';
            return;
        }

        error.style.display = 'none';

        const newItem = document.createElement('li');
        newItem.className='item';

        const item_name = document.createElement('span');
        item_name.textContent = name.value.trim();

        const item_price = document.createElement('span')
        item_price.textContent = `: ${price.value}円`;

        newItem.appendChild(item_name);
        newItem.appendChild(item_price);

        setNumChangeFunction(newItem);

        list.appendChild(newItem);
        setTotalPrice(shoppingList,total);

    }

    const setAddBtn=(btn,name,price,error,list)=>{
        btn.addEventListener('click',()=>{
            console.log('clicked');
            createNewItem(name,price,error,list);
        })
    }

    setAddBtn(addBtn,itemName,itemPrice,errorText,shoppingList);


})