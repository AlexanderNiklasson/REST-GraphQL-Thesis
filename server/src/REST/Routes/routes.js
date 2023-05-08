'use strict';
var counter = 0;
const express = require('express');
const api = express.Router();

// database
const Movie = require('../../Database/models/movie').Movies;
const User = require('../../Database/models/user').Users;
const Review = require('../../Database/models/review').Reviews;


api.get('/user:id', (req, res) => {

    User.findById(req.params.id).then(user => {
        if(!user) {
            res.status(404).json({ error: 'User not found' });
        } else [
            res.json(user)
        ]
    }).catch(error => {
        console.log('Error fetching user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    })
})

api.get('/hello', (req, res) => {
    counter++;
    console.log(counter)
    if (counter > 100000) {

    } else {
        res.send({
            message: test()
        });
    }

});

api.post('/test', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.send('Received' + JSON.stringify(req.body));
})

api.get('/user', async (req, res) => {

    let results = await Movie.find({})
    res.send(results).status(200);

})


function test() {
    let arr = [];
    for (let i = 0; i < 1000; i++) {
        arr[i] = i;
    }


    return arr;
}
module.exports = api;