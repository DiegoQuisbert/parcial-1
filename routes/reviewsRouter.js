const express = require('express');
const router = express.Router();

const {createReview, getReviews, getReviewsByUserId, deleteReviewsById, updateReviewById} = require('../controllers/reviewController');

router.get('/', createReview);
router.post('/', getReviews);
router.get('/:id', getReviewsByUserId);
router.delete('/:id', deleteReviewsById);
router.put('/:id', updateReviewById);

module.exports = router;