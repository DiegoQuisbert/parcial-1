const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
    compName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;