import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    assignedTo: {
        enum:['User1','user2','user3','user4'],
        required: true
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started'
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Normal', 'High'],
        default: 'Normal'
    },
    comments: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;