'use strict';

function commonErrorHandler(err, req, res, next) {
    if (err) {
        let errorname = err.name;
        let erromessage = err.message;
        console.log('Error Name = ', errorname);
        console.log('Error Message = ', erromessage);
        switch (errorname) {
            case 'customerror': {
                if (err.message.code === 'LIMIT_FILE_SIZE') {
                    err.message = 'File size is too large!';
                }
                let customerr = {
                    status: err.status,
                    name: err.name || '',
                    message: err.message
                };
                res.status(err.status).json(customerr);
                break;
            }
            case 'ValidationError': {
                let validationerror = handleValidationError(err);
                res.status(validationerror.status).json(validationerror);
                break;
            }
            case 'CastError': {
                let casteingrror = HandleCastError(err);
                res.status(casteingrror.status).json(casteingrror);
                break;
            }
            case 'ReferenceError': {
                res.status(500).json({ status: 500, message: 'internal server error', error: 'Unknow Reference Error' });
                break;
            }
            case 'TypeError': {
                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error.'
                });
                break;
            }
            default: {
                return res.status(500)
                    .json({
                        status: 500,
                        message: 'Something went wrong. Please try after some time!',
                        error: new Error('unknown error')
                    });
            }
        }
    } else {
        next();
    }

}

//======================================== Helpers for Error Handlers ===========================================

// ------------------------------------- Cast Error -------------------------------------------------------------
function HandleCastError(err) {
    let casterror = new Error();
    casterror.name = 'TypeCast';
    casterror.message = 'cannot cast ' + err.path + ' to ' + err.kind;
    return {
        status: 400,
        message: 'Type Casting failed',
        error: casterror
    };
}

// ------------------------------------- validation Error -------------------------------------------------------
function handleValidationError(err) {
    let error = err.errors;
    let validationKey = null;
    for (let key in error) {
        validationKey = key;
    }
    let customerror = error[validationKey];
    if (customerror.kind === 'Duplicate value') {
        let newError = new Error();
        newError.name = 'validation error';
        newError.message = customerror.message;
        return {
            status: 400,
            message: customerror.message
        };
    } else if (customerror.kind === 'required') {
        let requiredError = new Error();
        requiredError.name = 'validation error';
        requiredError.message = customerror.properties.path + ' is required';
        return {
            status: 400,
            message: requiredError.message
        };
    } else if (customerror.kind === 'user defined') {
        let userError = new Error();
        userError.name = 'validation error';
        userError.message = customerror.message;
        return {
            status: 400,
            message: userError.message
        };
    } else if (customerror.kind === 'enum') {
        let requiredError = new Error();
        requiredError.name = 'validation error';
        requiredError.message = customerror.properties.path + ' is required and only acceptable ' + customerror.properties.enumValues;
        return {
            status: 400,
            name: requiredError.name,
            message: requiredError.message
        };
    } else if (customerror.kind === 'Number') {
        let requiredError = new Error();
        requiredError.name = 'validation error';
        requiredError.message = customerror.message;
        return {
            status: 400,
            name: requiredError.name,
            message: requiredError.message
        };
    } else if (customerror.kind === 'unique') {
        let requiredError = new Error();
        requiredError.name = 'validation error';
        requiredError.message = customerror.message;
        return {
            status: 400,
            name: requiredError.name,
            message: requiredError.message
        };
    } else if (customerror.kind === 'Array') {
        let requiredError = new Error();
        requiredError.name = 'validation error';
        requiredError.message = customerror.message;
        return {
            status: 400,
            name: requiredError.name,
            message: requiredError.message
        };
    } else {
        return {
            status: 500,
            message: 'Internal server error'
        };
    }
}

exports.commonErrorHandler = [commonErrorHandler];
