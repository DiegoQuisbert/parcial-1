const express = require('express');
const router = express.Router();

const {createMovie, getMovies, getMovieById, updateMovieById, deleteMovieById, /* función de filtrado */ searchMovie} = require('../controllers/movieController');

router.post('/', createMovie);
router.get('/', getMovies);
router.get('/', getMovieById);
router.put('/', updateMovieById);
router.delete('/', deleteMovieById);
//router.get('/', método de filtrado);
router.get('/', searchMovie);

module.exports = router;