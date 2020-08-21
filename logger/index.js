'use strict';
const util = require('util');
const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

let logger = new winston.Logger();

if (env === 'aws') {
    logger.add(winston.transports.Console, {
        level: 'silly',
        colorize: true
    });
}
if (env === 'development') {
    logger.add(winston.transports.Console, {
        level: 'silly',
        colorize: true
    });
}

if (env === 'stage') {
    logger.add(winston.transports.Console, {
        level: 'silly',
        colorize: true
    });
}

if (env === 'production') {
    logger.add(winston.transports.Console, {
        level: 'info',
        colorize: false,
        timestamp: true
    });
}

function formatArgs(args) {
    return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

console.log = function () {
    logger.silly.apply(logger, formatArgs(arguments));
};
console.debug = function () {
    logger.debug.apply(logger, formatArgs(arguments));
};
console.verbose = function () {
    logger.verbose.apply(logger, formatArgs(arguments));
};
console.info = function () {
    logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function () {
    logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function () {
    logger.error.apply(logger, formatArgs(arguments));
};

module.exports = logger;