import Todo from '../models/Todo.js';

export const addTodo = async (request, response) => {
    try {
        const { assignedTo, status, dueDate, priority, comments } = request.body;

        const newTodo = new Todo({
            assignedTo,
            status,
            dueDate,
            priority,
            comments
        });

        await newTodo.save();

        return response.status(201).json(newTodo);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const getAllTodos = async (request, response) => {
    try {
        const todos = await Todo.find({});

        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const updateTodo = async (request, response) => {
    try {
        const { assignedTo, status, dueDate, priority, comments } = request.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            request.params.id,
            { assignedTo, status, dueDate, priority, comments },
            { new: true }
        );

        if (!updatedTodo) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        return response.status(200).json(updatedTodo);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}

export const deleteTodo = async (request, response) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(request.params.id);

        if (!deletedTodo) {
            return response.status(404).json({ message: 'Todo not found' });
        }

        return response.status(200).json(deletedTodo);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }
}