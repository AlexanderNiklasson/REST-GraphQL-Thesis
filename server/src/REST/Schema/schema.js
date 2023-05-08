const mongoose = require('mongoose');

const user_schema = new mongoose.Schema({
    id: id,
    firstName: String,
    lastName: String,
    email: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

const movie_schema = new mongoose.Schema({
    id: id,
    name: String,
    prooducer: String,
    rating: Float,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
})

const review_schema = new mongoose.Schema({
    id: id,
    title: String,
    description: String,
    body: String,
    movie: movie_schema,
    user: user_schema
})

const User = mongoose.model('User', user_schema);
const Movie = mongoose.model('Movie', movie_schema);
const Review = mongoose.model('Review', review_schema);