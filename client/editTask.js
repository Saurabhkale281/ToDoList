
async function getTaskData(id) {
    try {
        const response = await fetch(`http://localhost:8000/todos/${id}`);
        if (!response.ok) throw new Error('Task not found');
        
        const task = await response.json();
        
        document.getElementById('assignedTo').value = task.assignedTo;
        document.getElementById('status').value = task.status;
        document.getElementById('dueDate').value = task.dueDate.substring(0, 10); 
        document.getElementById('priority').value = task.priority;
        document.getElementById('comments').value = task.comments;
    } catch (error) {
        console.error('Error fetching task data:', error);
        alert('Failed to load task data.');
    }
}


const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

if (taskId) {
    getTaskData(taskId);
}


document.getElementById('editTaskForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const updatedTaskData = {
        assignedTo: document.getElementById('assignedTo').value,
        status: document.getElementById('status').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
        comments: document.getElementById('comments').value
    };

    try {
        const response = await fetch(`http://localhost:8000/todos/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTaskData)
        });

        if (!response.ok) throw new Error('Failed to update task');

        alert('Task updated successfully!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error updating task:', error);
        alert('An error occurred while updating the task.');
    }
});