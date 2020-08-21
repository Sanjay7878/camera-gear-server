'use strict';

const env = process.env;
switch (env.NODE_ENV) {
    case 'production': {
        exports.HOST = 'smtp.net4india.com';
        exports.FROM_ACCOUNT = 'cog@captureography.com';
        exports.FROM_PASSWORD = 'Rathnamma@1';
        exports.TO_OWNER = 'Kiranpatthi@gmail.com';
        exports.TO_HELP = 'Kiranpatthi@gmail.com';
        break;
    }
    default: {
        exports.HOST = 'smtp.net4india.com';
        exports.FROM_ACCOUNT = 'cog@captureography.com';
        exports.FROM_PASSWORD = 'Rathnamma@1';
        exports.TO_OWNER = 'Kiranpatthi@gmail.com';
        exports.TO_HELP = 'Kiranpatthi@gmail.com';
        break;
    }
}
