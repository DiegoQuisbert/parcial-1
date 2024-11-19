const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    premiere: {
        type: Date,
    },
    duration: {
        type: Number,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    poster: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;