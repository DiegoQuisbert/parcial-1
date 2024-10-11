const express = require('express');
const router = express.Router();

const {createTask, getTasks, getTasksByUserId, deleteTasksById, updateTaskById} = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTasksByUserId);
router.delete('/:id', deleteTasksById);
router.put('/:id', updateTaskById);

module.exports = router;