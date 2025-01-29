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
        curr--;
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

    const addTask=(input,select,list,count,error)=>{
        if(!checkInput(input)){
            displayError(error);
            return;
        }

        const text = input.value.trim();
        const task_name = document.createElement('span');
        task_name.textContent = text;
        const priority = select.value;

        const taskItem = document.createElement('div');
        taskItem.appendChild(task_name);
        taskItem.className = 'task-item';
        taskItem.classList.add(`${priority}-priority`);
        setCompleteBtn(taskItem);
        
        list.appendChild(taskItem);
        incrementCount(count);

    }

    const setAddBtn=(btn,input,select,list,count,error)=>{
        btn.addEventListener('click',()=>{
            addTask(input,select,list,count,error);
        })
    }

    setAddBtn(addBtn,taskInput,prioritySelect,taskList,taskCount,errorText);



})