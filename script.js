const taskInputEl = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task');
const tasksContainer = document.querySelector('.tasks-container');

let tasks = [];

const handleTaskIcons = function (e) {
  // TODO
  // Check if user clicked on task icons
  if (
    e.target.classList.contains('completed-icon') ||
    e.target.classList.contains('delete-icon')
  ) {
    // Get closest task element and delete it
    const taskEl = e.target.closest('.task');

    // Remove task from tasks list and update localStorage
    const taskIndex = tasks.indexOf(taskEl.textContent.trim());
    tasks.splice(taskIndex, 1);
    updateLocalStorage();

    tasksContainer.removeChild(taskEl);
  }
};

const addTask = function (task) {
  // Check if the task input is valid
  if (!task)
    return alert('Please write the name of a task and then add the task');

  // Add task to tasks array and add it to localStorage
  tasks.push(task);
  updateLocalStorage();

  // HTML code for task element
  const html = `
      <div class="task">
        <p class="task-name">${task}</p>
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="completed-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="delete-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div> 
    `;

  // Add task element to page
  tasksContainer.insertAdjacentHTML('beforeend', html);

  // Clear input box
  taskInputEl.value = '';

  // Listen for click event on task container
  tasksContainer.addEventListener('click', handleTaskIcons);
};

// Sets tasks in localStorage
const updateLocalStorage = function () {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Retrieves data from localStorage
const getTasksLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('tasks'));
  // console.log(data);

  if (!data) return;

  // tasks = data;
  data.forEach(t => {
    addTask(t);
  });
};

getTasksLocalStorage();

// Listen for click event of add task button and if user clicks enter key
addTaskBtn.addEventListener('click', () => addTask(taskInputEl.value));
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask(taskInputEl.value);
});
