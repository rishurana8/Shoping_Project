const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: String, // Corrected type to String
        required: true // Corrected required property
    }
}, { timestamps: true });

module.exports = mongoose.model('Post' , postSchema);