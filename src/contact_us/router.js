'use strict';

const express = require('express');
const { contactUs } = require('./controller');

const contactUsRouter = express.Router();

contactUsRouter.route('/')
    .post(contactUs);

module.exports = contactUsRouter;
