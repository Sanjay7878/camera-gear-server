'use strict';

const EMAIL = require('../../helpers/email');

function contactUsFieldsValidator(req, res, next) {
    let contactUsValidationField = {
        'phone': {
            isNumeric: {
                errorMessage: 'phone number is invaild'
            }
        },
        'name': {
            notEmpty: {
                errorMessage: 'name is required'
            }
        },
        'message': {
            notEmpty: {
                errorMessage: 'message is required'
            }
        },
        'email': {
            notEmpty: {
                errorMessage: 'email ID is required'
            }
        }
    };
    req.checkBody(contactUsValidationField);
    req.getValidationResult()
        .then(results => {
            if (results.isEmpty()) {
                return next();
            }
            let errorMessages = [];
            results.array()
                .forEach(result => {
                    errorMessages.push(result.msg);
                });
            return next({
                status: 400,
                name: 'customerror',
                message: errorMessages
            });
        });
}

function contactUs(req, res, next) {
    let body = req.body;
    EMAIL.mailContactUs(body);
    return res.status(200).send({ status: 200, message: 'Message sent successfully' });
}

module.exports = [contactUsFieldsValidator, contactUs];
