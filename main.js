const taskInput = document.getElementById('task-input');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const taskFilter = document.getElementById('task-filter');


// Get tasks from LS
const getTasks = () => {
    if (!localStorage.getItem('tasks')) return [];

    return JSON.parse(localStorage.getItem('tasks'));
};

const setTasks = (tasks) => {
    if (!Array.isArray(tasks)) return console.log('400: setTasks()');

    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const tasks = getTasks();

    if (tasks.find(task => task === taskInput.value)) return alert('duplicate task!');

    tasks.push(taskInput.value);

    setTasks(tasks);
    renderTasks();

    taskInput.value = '';
};

const removeTask = (targetTask) => {
    if (typeof targetTask !== 'string') return console.log('400: removeTask()');

    const tasks = getTasks();

    tasks.splice(tasks.indexOf(targetTask), 1);

    setTasks(tasks);
    renderTasks();
};

const renderAddTask = (taskContent) => {
    // create task item elements
    const taskItem = document.createElement('li');
    const itemRemoveLink = document.createElement('a');
    const itemRemoveIcon = document.createElement('i');

    // add elements class name
    taskItem.className = 'collection-item truncate';
    itemRemoveLink.className = 'secondary-content remove-task';
    itemRemoveIcon.className = 'material-icons red-text';

    itemRemoveLink.setAttribute('href', '#!');
    // append elements
    itemRemoveIcon.appendChild(document.createTextNode('remove_circle_outline'));
    itemRemoveLink.appendChild(itemRemoveIcon);

    taskItem.appendChild(document.createTextNode(taskContent));
    taskItem.appendChild(itemRemoveLink);

    // add task to task list
    taskList.appendChild(taskItem);
};

const renderRemoveTask = (e) => {
    if (e.target.parentElement.classList.contains('remove-task')) {
        const task = e.target.parentElement.parentElement.childNodes[0].textContent;

        removeTask(task);
    }
};


// load event listener
function loadEventListener() {
    // add new task
    taskForm.addEventListener('submit', addTask);

    // remove task
    taskList.addEventListener('click', renderRemoveTask);

    // filter task

} loadEventListener();

// render tasks to DOM
function renderTasks() {
    const tasks = getTasks();

    taskList.innerHTML = '';

    for (const task of tasks) {
        renderAddTask(task);
    }
} renderTasks();


const filterTask = () => {

};