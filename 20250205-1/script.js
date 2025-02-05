class TaskManager{
    constructor(){
        this.tasks = this.loadtasks();
    }

    loadtasks(){
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    save(){
        localStorage.setItem('tasks',JSON.stringify(this.tasks));
    }

    delete(id){
        this.tasks = this.tasks.filter((item)=>{item.id !== id});
        this.save();
    }

    create(name){
        const task = {id:Date.now(),name:name,completed:false};
        this.tasks.push(task);
        return task;
    }

    complete(id){
        const itemToComplete = this.items.find((item)=>item.id === id);
        itemToComplete.completed = !itemToComplete.completed;
        return itemToComplete;
    }
    

}


document.addEventListener('DOMContentLoaded',()=>{
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    taskInput.focus();

    const manager = new TaskManager();

    const setItemToList = (li)=>{
        taskList.appendChild(li);
    }

    const createDOMFromTask=(task)=>{
        const li = document.createElement('li');
        li.id = task.id;
        
        const span = document.createElement('span');
        span.textContent = task.name;
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? '未完了' : '完了';
        completeBtn.className = 'complete';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '削除';
        deleteBtn.className = 'delete';

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    const isValidName=(taskName)=>{
        const length = taskName.length;
        if(length===0||length>100){
            return false;
        }

        return true;
    }

    const createItem=()=>{
        const task_name = taskInput.value.trim();
        if(!isValidName(task_name)){
            alert('有効なタスク名を入力してください');
            taskInput.focus();
            return;
        }

        const task = manager.create(task_name);

        taskList.appendChild(createDOMFromTask(task));
        taskInput.focus();
        return;

    }

    const renderTasks = (tasks)=>{
        const fragment = document.createDocumentFragment();
        tasks.forEach(task=>{
            fragment.appendChild(createDOMFromTask(task));
        });
        taskList.appendChild(fragment);
    }

    //初回読み込み時の動作。
    renderTasks(manager.tasks);

    addBtn.addEventListener('click',()=>{
        createItem();
    });

    taskList.addEventListener('click',(e)=>{
        const target = e.target;
    })

})