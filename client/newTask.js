document.addEventListener('DOMContentLoaded', function() {
    
    const newTaskForm = document.getElementById('newTaskForm');

    
    newTaskForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const assignedTo = document.getElementById('assignedTo').value;
        const status = document.getElementById('status').value;
        const dueDate = document.getElementById('dueDate').value;
        const priority = document.getElementById('priority').value;
        const comments = document.getElementById('comments').value;

        
        const taskData = {
            assignedTo: assignedTo,
            status: status,
            dueDate: dueDate,
            priority: priority,
            comments: comments
        };
console.log(taskData);
        
        fetch('http://localhost:8000/todos', {  
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        })
        .then(response => {
            if (!response.ok) {
                alert('Network response was not ok');
            }
        })
        .then(data => {
            
            console.log('Task added successfully:', data);
            alert('Task added successfully!');
            window.location.href = 'homePage.html';
        })
        .catch(error => {
            
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to add task. Please try again.');
            
        })
    
    });
});

