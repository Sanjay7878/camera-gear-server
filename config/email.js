'use strict';

const env = process.env;
switch (env.NODE_ENV) {
    case 'production': {
        exports.HOST = 'smtp.gmail.com';
        exports.FROM_ACCOUNT = 'cameragear.cg@gmail.com';
        exports.FROM_PASSWORD = 'bgkyngmyouopzcdn';
        exports.TO_OWNER = 'Kiranpatthi@gmail.com';
        exports.TO_HELP = 'Kiranpatthi@gmail.com';
        break;
    }
    default: {
        exports.HOST = 'smtp.gmail.com';
        exports.FROM_ACCOUNT = 'cameragear.cg@gmail.com';
        exports.FROM_PASSWORD = 'bgkyngmyouopzcdn';
        exports.TO_OWNER = 'Kiranpatthi@gmail.com';
        exports.TO_HELP = 'Kiranpatthi@gmail.com';
        break;
    }
}
