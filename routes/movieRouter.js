const express = require('express');
const router = express.Router();

const {addMovie, getMovies, getMovieById, updateMovieById, deleteMovieById, filterMovies, searchMovie} = require('../controllers/movieController');

router.post('/', addMovie);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovieById);
router.delete('/:id', deleteMovieById);
router.get('/', filterMovies);
router.get('/', searchMovie);

module.exports = router;