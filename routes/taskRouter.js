const express = require('express');
const router = express.Router();

const {createTask, getTasks, getTasksByUserId, deleteTasksById, updateTaskById} = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', createTask);
router.get('/', getTasksByUserId);
router.delete('/', deleteTasksById);
router.put('/', updateTaskById);

module.exports = router;