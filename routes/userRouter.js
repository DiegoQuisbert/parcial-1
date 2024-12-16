const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {createUser, getUser, getUsersById, deleteUserById, updateUserById, login} = require('../controllers/userController');

router.get('/', getUser);

router.post('/', createUser);

router.post('/login', login);

router.get('/:id', getUsersById);

router.delete('/:id', deleteUserById);

router.put('/:id', updateUserById);

module.exports = router;
