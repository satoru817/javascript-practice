// タスククラス
class Task {
    constructor(id, text, completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

// タスク管理の関数(これはAIに作ってもらった)
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    // タスクの読み込み
    loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }

    // タスクの保存
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // タスクの追加
    addTask(text) {
        const task = new Task(Date.now(), text, false);

        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    // タスクの完了状態を切り替え
    toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
        }
        this.saveTasks();
    }

    // タスクの削除
    deleteTask(id) {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.saveTasks();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    const Manager = new TaskManager();
    const saved_tasks = Manager.tasks;

    //保存された情報からDOM要素を作る。
    const createTaskFromSavedData = (task) => {
        const li = document.createElement('li');
        li.id = task.id;
        li.innerHTML = `<input type="checkbox" class="completeToggle">
                        <span>${task.text}</span>
                        <button class="deleteBtn">削除</button>`;
        taskList.appendChild(li);
    };

    const createTaskFromInput = (text) => {
        if (text.trim() != '') {
            const task = Manager.addTask(text);
            createTaskFromSavedData(task);
        } else {
            return false;
        }
    };

    saved_tasks.forEach((task) => {
        createTaskFromSavedData(task);
    });

    taskList.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('deleteBtn')) {
            const li = target.parentElement;
            const id = parseInt(li.id);
            console.log(id);
            Manager.deleteTask(id);
            li.remove();
        }

        if (target.classList.contains('completeToggle')) {
            const li = target.parentElement;
            const id = parseInt(li.id);
            console.log(id);
            Manager.toggleTask(id);
            li.classList.toggle('completed');
        }
    });

    addBtn.addEventListener('click', () => {
        const text = taskInput.value;
        createTaskFromInput(text);
    });
});
