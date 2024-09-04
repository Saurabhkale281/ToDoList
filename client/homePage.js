// Function to fetch tasks from the backend
async function fetchTasks() {
    try {
        const response = await fetch('http://localhost:8000/api/todos'); 
        if (response.ok) {
            const data = await response.json();
            return data; 
        } else {
            console.error('Failed to fetch tasks:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return [];
    }
}

// Show one static task for testing purposes
// const staticTask = {
//     id: 1,
//     assignedTo: 'User1',
//     status: 'In Progress',
//     dueDate: '2024-09-15',
//     priority: 'High',
//     comments: 'Static task for testing'
// };


async function renderTasks(page =1, rowsPerPage = 5) {
    const tbody = document.querySelector('#taskTable tbody');
    tbody.innerHTML = ''; 

    const staticTask ={
        assignedTo:'user1',
        status:'Not started',
        dueDate:'10/11/2024',
        prioprity:'Low',
        comments:'easy task'
    };    
    const tasks = [staticTask]; 
    const fetchedTasks = await fetchTasks();
    tasks.push(...fetchedTasks); 
    console.log(fetchTasks);

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedTasks = tasks.slice(start, end);

    paginatedTasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${task.assignedTo}</td>
            <td>${task.status}</td>
            <td>${task.dueDate}</td>
            <td>${task.priority}</td>
            <td>${task.comments}</td>
            <td>
                <button class="editBtn" onclick="editTask(${task.id})">Edit</button>
                <button class="deleteBtn" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    updatePagination();
}


function updatePagination() {
    document.getElementById('pageNumber').textContent = currentPage;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === Math.ceil(tasks.length / rowsPerPage);
    document.getElementById('firstBtn').disabled = currentPage === 1;
    document.getElementById('lastBtn').disabled = currentPage === Math.ceil(tasks.length / rowsPerPage);
}


document.getElementById('firstBtn').addEventListener('click', () => {
    currentPage = 1;
    renderTasks(currentPage);
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderTasks(currentPage);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentPage < Math.ceil(tasks.length / rowsPerPage)) {
        currentPage++;
        renderTasks(currentPage);
    }
});

document.getElementById('lastBtn').addEventListener('click', () => {
    currentPage = Math.ceil(tasks.length / rowsPerPage);
    renderTasks(currentPage);
});


document.getElementById('newTaskBtn').addEventListener('click', () => {
    window.location.href = "newTask.html";
});


document.getElementById('refreshBtn').addEventListener('click', () => {
    renderTasks(currentPage);
    alert('Tasks refreshed!');
});


function editTask(id) {
    window.location.href = "editTask.html";
}


async function deleteTask(id) {
    const confirmDelete = confirm(`Are you sure you want to delete task with ID: ${id}?`);
    if (confirmDelete) {
        try {
            const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const taskIndex = tasks.findIndex(task => task.id === id);
                if (taskIndex !== -1) {
                    tasks.splice(taskIndex, 1); 
                    alert('Task deleted successfully.');
                    renderTasks(currentPage); 
                }
            } else {
                alert('Failed to delete task. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('An error occurred while deleting the task.');
        }
    }
}


renderTasks(currentPage);