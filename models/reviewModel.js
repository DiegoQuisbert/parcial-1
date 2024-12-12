const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: String,
    created: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;