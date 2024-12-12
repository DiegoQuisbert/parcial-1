const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {createReview, getReviews, getReviewsByUserId, getReviewsByMovieId, getReviewsByUserAndMovie, deleteReviewsById, updateReviewById} = require('../controllers/reviewController');

router.post('/', auth, createReview);
router.get('/', auth, getReviews);
router.get('/user/:id', auth, getReviewsByUserId);
router.get('/movie/:movieId', auth, getReviewsByMovieId);
router.get('/filter', auth, getReviewsByUserAndMovie);
router.delete('/:id', auth, deleteReviewsById);
router.put('/:id', auth, updateReviewById);

module.exports = router;