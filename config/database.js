'use strict';

const env = process.env;

switch (env.NODE_ENV) {
    case 'production':
        exports.HOST = '127.0.0.1';
        exports.PORT = 27017;
        exports.USERNAME = null;
        exports.PASSWORD = null;
        exports.NAME = 'camera_gear';
        break;
    default:
        exports.HOST = '127.0.0.1';
        exports.PORT = 27017;
        exports.USERNAME = null;
        exports.PASSWORD = null;
        exports.NAME = 'camera_gear';
}
