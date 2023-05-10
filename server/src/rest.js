/*const express = require('express');
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
        // ads: ads,
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


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./REST/Routes/routes.js');

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

// defining an endpoint to return all ads
app.use('/', routes);

module.exports = app;



