const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {createReview, getReviews, getReviewsByUserId, deleteReviewsById, updateReviewById} = require('../controllers/reviewController');

router.post('/', auth, createReview);
router.get('/', auth, getReviews);
router.get('/:id', getReviewsByUserId);
router.delete('/:id', auth, deleteReviewsById);
router.put('/:id', auth, updateReviewById);

module.exports = router;