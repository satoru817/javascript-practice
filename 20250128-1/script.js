document.addEventListener('DOMContentLoaded',()=>{
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addBtn = document.getElementById('addTask');
    const priorityFilter = document.getElementById('filterPriority');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const errorText = document.getElementById('errorText');
    const numRegex = /\d+/;//これ''で囲わないことに注意！

    const checkInput=(input)=>{
        return input.value.trim() != '';
    }

    const displayError=(text)=>{
        text.style.display='block';
        setTimeout(()=>{
            text.style.display='none';
        },3000)
    }

    const incrementCount=(counter)=>{
        let curr = parseInt(counter.textContent.match(numRegex)[0]);
        curr++;
        counter.textContent=`総タスク数： ${curr}`;

    }

    const decrementCount=(counter)=>{
        let curr = parseInt(counter.textContent.match(numRegex)[0]);
        curr=curr-1;
        counter.textContent=`総タスク数： ${curr}`;
    }

    const setCompleteToggle=(item,btn)=>{
        btn.addEventListener('click',()=>{
            item.classList.toggle('completed');
        })
    }

    const setCompleteBtn=(taskItem)=>{
        const completeBtn = document.createElement('button');
        completeBtn.textContent='完了'
        setCompleteToggle(taskItem,completeBtn);
        taskItem.appendChild(completeBtn);
    }

    const setDeleteFunction=(item,btn,counter)=>{
        btn.addEventListener('click',()=>{
            item.remove();
            decrementCount(counter);
        })
    }

    const setDeleteBtn=(taskItem,counter)=>{
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent='削除';
        setDeleteFunction(taskItem,deleteBtn,counter);
        taskItem.appendChild(deleteBtn);
    }

    const translate=(english)=>{
        switch(english){
            case 'high':
                return '高';
            case 'medium':
                return '中';
            default :
                return '低';
        }
    }

    const createTaskName=(input,select)=>{
        const priority = translate(select);
        const text=input.value.trim();

        return `${priority}: ${text}`;
    }

    const toggleDisplay=(items,priority)=>{
        if(priority.value=='all'){
            [...items].forEach(element => {
                element.style.display='block';
            });
            return;
        }

        const className = `${priority}-priority`;

        console.log(className);

        [...items].forEach(element=>{
            if(element.classList.contains(className)){
                element.style.display='block';
                console.log('１つ目');
            }else{
                element.style.display='none';
                console.log('２つ目');
            }
        })
        
    }

    const addToggleFunction=(selector)=>{
        selector.addEventListener('change',()=>{
            const items = document.getElementsByClassName('taskItem');
            toggleDisplay(items,selector);
        })
    }

    addToggleFunction(priorityFilter);

    const addTask=(input,select,list,count,error)=>{
        if(!checkInput(input)){
            displayError(error);
            return;
        }

        const text = input.value.trim();
        const task_name = document.createElement('span');
        const priority = select.value;
        task_name.textContent = createTaskName(input,priority);
        

        const taskItem = document.createElement('div');
        taskItem.appendChild(task_name);
        taskItem.className = 'task-item';
        taskItem.classList.add(`${priority}-priority`);
        setCompleteBtn(taskItem);
        setDeleteBtn(taskItem,taskCount);
        
        list.appendChild(taskItem);
        incrementCount(count);

        input.value='';

    }

    const setAddBtn=(btn,input,select,list,count,error)=>{
        btn.addEventListener('click',()=>{
            addTask(input,select,list,count,error);
        })
    }

    setAddBtn(addBtn,taskInput,prioritySelect,taskList,taskCount,errorText);



})