/*

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./REST/Routes/routes.js');
const os = require('os-utils');
const si = require('systeminformation');
const { performance } = require('perf_hooks');

// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.use('/', async (req, res) => {
    console.log("hello")
    
    const startTime = performance.now(); // Start measuring response time

    await measureServerUsage(); // Measure server CPU and RAM usage

    // Your logic for handling the request goes here
    // For example:
    // const ads = await getAds();

    const endTime = performance.now(); // End measuring response time
    const responseTime = endTime - startTime;
    // Send the response with the measured data
    res.send({
        responseTime: `${responseTime.toFixed(2)} ms`,
        // Other response data...
    });
});



async function measureServerUsage() {
    os.cpuUsage((cpuUsage) => {
        console.log(`CPU Usage: ${(cpuUsage * 100).toFixed(2)}%`);
    });

    const mem = await si.mem();
    const ramUsageInMb = (mem.used / 1024 / 1024).toFixed(2);
    const totalRamInMb = (mem.total / 1024 / 1024).toFixed(2);
    console.log(`RAM Usage: ${ramUsageInMb} MB / ${totalRamInMb} MB`);
}

module.exports = app;


*/

const os = require('os-utils');
const si = require('systeminformation');
const { performance } = require('perf_hooks');



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./REST/Routes/routes.js');

const { cpuUsage, memoryUsage } = require('process');
// defining the Express app
const app = express();

// adding Helmet to enhance your Rest API's security
app.use(helmet());

app.use(cors());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));



app.use((req, res, next) => {
    const startUsage = process.cpuUsage()
    let oldResponse = res.send;
    res.send = async (data) => {

        const ramUsed = memoryUsage().heapUsed / 1024 / 1024
        const endUsage = process.cpuUsage();
        var totalUsage = endUsage.user - startUsage.user

        res.send = oldResponse;

        const startTime = performance.now(); // Start measuring response time

        await measureServerUsage(); // Measure server CPU and RAM usage
    
        // Your logic for handling the request goes here
        // For example:
        // const ads = await getAds();
    
        const endTime = performance.now(); // End measuring response time
        const responseTime = endTime - startTime;
        console.log(responseTime)
        return res.send(data);

    
    }
    next();
})

async function measureServerUsage() {
    os.cpuUsage((cpuUsage) => {
        console.log(`CPU Usage: ${(cpuUsage * 100).toFixed(2)}%`);
    });

    const mem = await si.mem();
    const ramUsageInMb = (mem.used / 1048576).toFixed(2);
    const totalRamInMb = (mem.total / 1048576).toFixed(2);
    console.log(`RAM Usage: ${ramUsageInMb} MB / ${totalRamInMb} MB`);
}
// defining an endpoint to return all 

app.use('/', routes);

module.exports = app;



