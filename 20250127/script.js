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

    const setToggleImportant=(btn,div)=>{
        btn.style.cursor='pointer';
        btn.addEventListener('click',()=>{
            div.classList.toggle('important');
        })
    }

    const setDeleteFunction=(btn,div)=>{
        btn.style.cursor='pointer';
        btn.addEventListener('click',()=>{
            div.remove();
        })
    }

    const createTaskItem =(genre,text)=>{
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        
        const sp1 = document.createElement('span');
        sp1.className='category-badge';
        sp1.textContent=translate(genre);

        const sp2 = document.createElement('span');
        sp2.className = 'task-text';
        sp2.textContent=text;

        const div = document.createElement('div');
        div.className = 'task-actions';

        const impBtn = document.createElement('button');
        impBtn.className='important-btn';

        
        setToggleImportant(impBtn,taskItem);

        const deleteBtn = document.createElement('button');
        deleteBtn.className='delete-btn';

        setDeleteFunction(deleteBtn,taskItem);

        div.appendChild(deleteBtn);
        div.appendChild(impBtn);

        taskItem.appendChild(sp1);
        taskItem.appendChild(sp2);
        taskItem.appendChild(div);

        


        return taskItem;
            
    }

    const addTask = (input,select,list,counter)=>{
        const text = validateInput(input);

        if(!text){
            return;
        }

        const genre = select.value;

        const taskItem = createTaskItem(genre,text);
        
        list.appendChild(taskInput);

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