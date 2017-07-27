'use strict';

const nodemailer = require('nodemailer');

const mailerConfig = require('../../mailerConfig.json');

const SEND_FROM_NAME = 'BTC Checker';
const ARROW_UP = '↗ 😒';
const ARROW_DOWN = '↘ 😄';

const transporter = nodemailer.createTransport({
    host: mailerConfig.host,
    port: mailerConfig.port,
    secure: mailerConfig.secure,
    auth: {
        user: mailerConfig.auth.user,
        pass: mailerConfig.auth.pass
    }
});

const generateMailOptions = (sendFrom, sendTo, averagePrice, isUp) => ({
    from: `${SEND_FROM_NAME} <${sendFrom}>`,
    to: sendTo,
    subject: `BTC average price: ${averagePrice} PLN ${isUp ? ARROW_UP : ARROW_DOWN}`
});

module.exports = (averagePrice, isAveragePriceUp = true) => {
    const mailOptions = generateMailOptions(mailerConfig.auth.user, mailerConfig.sendTo, averagePrice, isAveragePriceUp);

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw new Error(error);
        }

        return true;
    });
};
