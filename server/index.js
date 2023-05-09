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
    console.log('Connected correctly to server!');
}, (err) => {
    console.log(err);
});

rest.listen(configRest.port, () => {
    console.log(`Rest API running on ${configRest.port}`)
})

graph.startServer();