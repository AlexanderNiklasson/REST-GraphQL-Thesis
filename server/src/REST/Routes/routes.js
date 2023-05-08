'use strict';
var counter = 0;
const express = require('express');
const api = express.Router();
const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews;

// GET START //
// Fetch one user by id
api.get('/user', (req, res) => {
    User.findById(req.query.id).populate('reviews').exec().then(user => {
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    }).catch(error => {
        console.error('Error fetching user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    })
})

// Fetch all users in db
api.get('/users', (req, res) => {
    User.find().then(users => {
        res.json(users);
    })
})

// Fetch one movie by id
api.get('/movie', (req, res) => {
    Movie.findById(req.query.id).populate('reviews').exec().then(movie => {
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
        } else {
            res.json(movie);
        }
    }).catch(error => {
        console.error('Error fetching user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    })
})

// Fetch all movie in db
api.get('/movies', (req, res) => {
    Movie.find().then(movies => {
        res.json(movies);
    })
})

// Fetch a rreview by id
api.get('/review', (req, res) => {
    Review.findById(req.query.id).populate('movie').populate('user').exec().then(review => {
        if (!review) {
            res.status(404).json({ error: 'Review not found' });
        } else {
            res.json(review);
        }
    }).catch(error => {
        console.error('Error fetching revires: ', error);
        res.status(500).json({ error: 'Internal server error' });
    })
})

// Fetch all reviews
api.get('/reviwes', (req, res) => {
    Review.find().then(reviews => {
        res.json(reviews);
    })
})
// GET END //

// POST START //
// Create a new user from user input
api.post('/user', (req, res) => {
    let new_user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    })
    new_user.save().then(saver_user => {
        res.json(saver_user);
    }).catch(error => {
        console.error('Error creating a new user: ', error);
        res.status(500).json({ error: 'Innternal server error' });
    })
})

// Addinng a new movie to the database
api.post('/movie', (req, res) => {
    let new_movie = new Movie({
        name: req.body.name,
        rating: req.body.rating,
        producer: req.body.producer,
    })
    new_movie.save().then(saved_movie => {
        res.json(saved_movie);
    }).catch(error => {
        console.error('Error adding a new movie to the database: ', error);
        res.status(500).json({ error: 'Internal server error' });
    })
})


module.exports = api;