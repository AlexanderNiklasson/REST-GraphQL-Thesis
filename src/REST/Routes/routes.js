'use strict';

const express = require('express');
const api = express.Router();

// read
api.get('/', (req, res) => {
    res.send({
        message: 'Hello World!'
    });
});

// create
api.post('/', (req, res) => {
    
})

// delete
api.delete('/', (req, res) => {

}) 

// update
api.patch('/', (req, res) => {

})
module.exports = api;