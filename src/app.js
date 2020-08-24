'use strict';

const http = require('http');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const apiExpressExporter = require('api-express-exporter');

const env = process.env;

const { SERVER: SERVER_CONFIG, DB: DB_CONFIG } = require('../config');
const mainRouter = require('./routes');

function start(app) {
    app = _initializeServer(app);

    let promise = new Promise((resolve, reject) => {
        _connectToDatabase()
            .then((data) => {
                console.info(data.message);
                return _createServer(app);
            })
            .then((data) => {
                console.info(data.message);
                resolve({
                    message: 'Server Started Successfully'
                });
            })
            .catch((err) => {
                console.error(err.message);
                reject(err);
            });
    });

    return promise;
}

function _initializeServer(app) {
    let isProd = app.locals.IS_PROD;
    app.set('x-powered-by', false);
    app.set('etag', false);
    if (!isProd) {
        app.use(cors());
    }
    app.use(bodyParser.json({ limit: '10MB' }));
    app.use(expressValidator());
    if (env.NODE_ENV === 'production') {
        app.use(logger(
            function(tokens, req, res) { return ['Performance Debug log ::', tokens.method(req, res), tokens.url(req, res)].join(' '); }, {
                immediate: true
            }));
        app.use(logger('dev'));
    }
    app.use(apiExpressExporter({ port: SERVER_CONFIG.PROMETHEUS_PORT, host: SERVER_CONFIG.HOST }));
    app.use('/api/cg', mainRouter);
    return app;
}

function _connectToDatabase() {
    mongoose.Promise = global.Promise;
    let promise = new Promise((resolve, reject) => {
        let options = {
            socketTimeoutMS: 0,
            keepAlive: true,
            reconnectTries: 30
        };
        let conStr = `mongodb://${DB_CONFIG.HOST}:${DB_CONFIG.PORT}/${DB_CONFIG.NAME}`;
        mongoose.createConnection(conStr, options, (err) => {
            if (err) {
                console.log('err: ', err);
                return reject(err);
            }
            const db = mongoose.connection;
            db.openUri(conStr, {
                /* options */
            });
            return resolve({
                message: `DB Running on host ::=> ${DB_CONFIG.HOST} & port :: ${DB_CONFIG.PORT}`
            });
        });
    });
    return promise;
}

function _createServer(app) {
    let promise = new Promise((resolve) => {
        if (SERVER_CONFIG.PROTOCOL === 'http') {
            let server = http.createServer(app);
            server.listen(SERVER_CONFIG.PORT, () => {
                return resolve({
                    message: `Server Running on port :: ${server.address().port}`
                });
            });
        }
    });
    return promise;
}

exports.start = start;
