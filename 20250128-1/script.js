document.addEventListener('DOMContentLoaded',()=>{
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addBtn = document.getElementById('addTask');
    const priorityFilter = document.getElementById('filterPriority');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const errorText = document.getElementById('errorText');

    const checkInput=(input)=>{
        return input.value.trim() != '';
    }

    const displayError=(text)=>{
        text.style.display='block';
        setTimeout(()=>{
            text.style.display='none';
        },3000)
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

        list.appendChild(taskItem);


    }

    const setAddBtn=(btn,input,select,list,count,error)=>{
        btn.addEventListener('click',()=>{
            addTask(input,select,list,count,error);
        })
    }

    setAddBtn(addBtn,taskInput,prioritySelect,taskList,taskCount,errorText);



})