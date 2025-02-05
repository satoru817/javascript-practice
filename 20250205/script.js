class TaskManager{
    constructor(){
        this.tasks = this.loadTasks();        
    }

    loadTasks(){
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    addTask(name){
        const task = {id:Date.now(),name:name,completed:false};
        this.tasks.push(task);
        this.save();
        return task;
    }

    save(){
        localStorage.setItem('tasks',JSON.stringify(this.tasks));
    }

    delete(id){
        this.tasks = this.tasks.filter((task)=>task.id !== id);
        this.save();
    }

    getById(id){
        return this.tasks.find((task)=>task.id === id);
    }

    toggleCompleted(id){
        const target = this.getById(id);
        target.completed = !target.completed;
        this.save();
    }

    erase(){
        this.tasks = [];
        this.save();
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.getElementById('todo-input');
    const submitBtn = document.getElementById('todo-form').querySelector('button');
    const todoList = document.getElementById('todo-list');
    const clearBtn = document.getElementById('clear-all');

    todoInput.focus();
    const manager = new TaskManager();

    const createDOM=(task)=>{
        const li = document.createElement('li');
        li.id = task.id;
        li.innerHTML=`<span>${task.name}</span>
                        <button class = 'complete' >完了</button>
                        <button class = 'delete'>削除</button>`
        if(task.completed){
            li.classList.add('completed');
        }

        return li;
    }

    const setDOM=(task)=>{
        todoList.appendChild(createDOM(task));
    }

    manager.tasks.forEach(task=>{
        setDOM(task);
    })

    const createTask=()=>{
        const task_name = todoInput.value.trim();
        if(task_name===''){
            alert('有効なタスク名を入力してください');
            todoInput.value='';
            todoInput.focus();
            return;
        }

        const task = manager.addTask(task_name);
        setDOM(task);
        return;
    }

    const eraseAll=()=>{
        todoList.innerHTML='';
        manager.erase();
        todoInput.focus();
    }



    submitBtn.addEventListener('click',()=>{
        createTask();
    })

    todoList.addEventListener('click',(e)=>{
        const target = e.target;
        if(target.classList.contains('complete')){
            const li = target.parentElement;
            const id = parseInt(li.id);
            manager.toggleCompleted(id);
            li.classList.toggle('completed');
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

    clearBtn.addEventListener('click',()=>{
        if(confirm('すべて消去しますか?')){
            eraseAll();
        }
        return;
    })

})