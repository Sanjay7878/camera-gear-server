'use strict';
const env = process.env;

switch (env.NODE_ENV) {
    case 'production':
        exports.PROTOCOL = 'http';
        exports.HOST = '127.0.0.1';
        exports.PORT = '4089';
        exports.CONSOLE = false;
        exports.BASE_URL = '';

        break;
    default:
        exports.PROTOCOL = 'http';
        exports.HOST = '127.0.0.1';
        exports.PORT = '4089';
        exports.CONSOLE = true;
        exports.BASE_URL = '';
}
