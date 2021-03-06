'use strict';

const nodemailer = require('nodemailer');
const { EMAIL } = require('../../config');
const env = process.env;
let _ = require('lodash');

let smtpTransport = nodemailer.createTransport({
    host: EMAIL.HOST,
    port: 587,
    secure: false, // use TLS,
    debug: true,
    auth: {
        user: EMAIL.FROM_ACCOUNT,
        pass: EMAIL.FROM_PASSWORD
    }
});


exports.mailContactUs = function(emailDetails) {
    // return new Promise((resolve, reject) => {
    let msgOptions = {
        from: EMAIL.FROM_ACCOUNT,
        to: EMAIL.TO_HELP,
        subject: 'Client Contact from Camera Gear',
        html: `<div style="Arial, Helvetica, sans-serif: Roboto; font-size: 110%;">
                   <p><b>Name: ${emailDetails.name} </b></p>
                   </br>
                   <p><b>Email: ${emailDetails.email} </b></p>
                   </br>
                   <p><b>Mobile No*: ${emailDetails.phone} </b></p>
                   </br>
                   <p><b>Description: ${emailDetails.message} </b></p>`
    };
    smtpTransport.sendMail(msgOptions, function(error) {
        if (error) {
            return console.error(error);
        }
        return;
    });
    // });
};