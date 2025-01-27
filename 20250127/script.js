document.addEventListener('DOMContentLoaded',()=>{
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const addBtn = document.getElementById('addButton');
    const errorMessage = document.getElementById('errorMessage');
    const totalCount = document.getElementById('totalCount');
    const completedCount = document.getElementById('completedCount');
    const taskList = document.getElementById('taskList');

    const validateInput = (input)=>{
        const text = input.value.trim();
        if(text == ''){
            errorMessage.classList.remove('hidden');
            return false;
        }

        return text;
    }

    const updateCounter = (num,counter)=>{
        let curr = parseInt(counter.textContent);
        curr += num;
        counter.textContent = curr;
    }

    const translate = (english)=>{
        switch(english){
            case 'work':
                return '仕事';
            case 'personal':
                return '個人';
            default:
                return '買い物';
        }
    }

    const toggleComplete=(li)=>{
        li.classList.toggle('completed');
    }

    const setCompleteFunction=(li)=>{
        li.style.cursor='pointer';
        li.addEventListener('click',()=>{
            toggleComplete(li);
        })
    }

    const addTask = (input,select,list,counter)=>{
        const text = validateInput(input);

        if(!text){
            return;
        }

        const genre = select.value;
        
        const li = document.createElement('li');
        li.textContent = `${translate(genre)}:${text}`;
        setCompleteFunction(li);
        list.appendChild(li);

        updateCounter(1,counter);


    }

    const setAddButton=(btn)=>{
        console.log('clicked');
        btn.addEventListener('click',()=>{
            addTask(taskInput,categorySelect,taskList,totalCount);
        })
    }

    setAddButton(addBtn);
})