'use strict';
const express = require('express');
const env = process.env.NODE_ENV;

require('./logger');

const app = require('./src/app');

let expressApp = express();

expressApp.locals.IS_PROD = (env === 'production');

app.start(expressApp)
    .then((data) => {
        console.log(data.message);
    })
    .catch((err) => {
        console.error(err.message);
    });