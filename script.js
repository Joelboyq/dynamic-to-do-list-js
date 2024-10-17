document.addEventListener('DOMContentLoaded', function () {
    // Select the "Add Task" button, task input field, and task list container
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        // Retrieve stored tasks from Local Storage, or default to an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Loop through stored tasks and add each one to the DOM
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' means don't save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // Check if taskText is not empty
        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button for each task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add an event listener to the remove button to delete the task
        removeButton.onclick = function () {
            taskList.removeChild(li); // Remove the task from the list
            removeTaskFromStorage(taskText); // Also remove the task from Local Storage
        };

        // Append the remove button to the task <li>
        li.appendChild(removeButton);

        // Add the task <li> to the task list
        taskList.appendChild(li);

        // Clear the input field after adding the task
        taskInput.value = '';

        // Save the task to Local Storage if 'save' is true
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        // Retrieve the current tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Add the new task to the array
        storedTasks.push(taskText);
        
        // Save the updated task array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        // Retrieve the current tasks from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Filter out the task to be removed
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        
        // Save the updated task array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add event listener to the "Add Task" button
    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim(); // Trim the input value
        addTask(taskText); // Call the addTask function with the trimmed value
    });

    // Add event listener to the input field for 'Enter' keypress
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Trim the input value
            addTask(taskText); // Call the addTask function when Enter is pressed
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
