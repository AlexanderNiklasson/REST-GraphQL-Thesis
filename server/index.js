const rest = require('./src/rest');
const graph = require('./src/graphql')
const configRest = require('./src/REST/Config/configDomain.js');
const mongoose = require('mongoose');

//const url = "mongodb://127.0.0.1:27017/moviesdb";
const url = "mongodb+srv://qweqwe:qweqwe@codesnippets.atg4h.mongodb.net/moviesdb?retryWrites=true&w=majority"

const connect = mongoose.connect(url, {
    useNewUrlParser: true
});
connect.then((db) => {
    console.log(`Successfully connected to ${url}`);
}, (err) => {
    console.error('Error occured whilst trying to establish a connecttion to the database: ',err);
});

rest.listen(configRest.port, () => {
    console.log(`Rest API running on ${configRest.port}`)
})

graph.startServer();