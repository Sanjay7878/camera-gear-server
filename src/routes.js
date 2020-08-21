'use strict';

const express = require('express');
const { commonErrorHandler } = require('./error.handler');

const mainRouter = express.Router();


/*
 * Contact Us routes (Web and Android)
 */
const { contactUsRouter } = require('./contact_us');

mainRouter.use('/contact_us', contactUsRouter);

/* Common error handler */
mainRouter.use(commonErrorHandler);

module.exports = mainRouter;
