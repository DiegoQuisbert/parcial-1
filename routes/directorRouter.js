const express = require('express');
const router = express.Router();

const {addDirector, getDirector, getDirectorById, updateDirectorById, deleteDirectorById} = require ('../controllers/directorController');

router.post('/', addDirector);
router.get('/', getDirector);
router.get('/:id', getDirectorById);
router.put('/:id', updateDirectorById);
router.delete('/:id', deleteDirectorById);

module.exports = router;