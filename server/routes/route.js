import express from 'express';
import { addTodo, getAllTodos, updateTodo, deleteTodo } from '../controller/todo-controller.js';

const router = express.Router();

router.post('/todos', addTodo);
router.get('/todos', getAllTodos);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

export default router;