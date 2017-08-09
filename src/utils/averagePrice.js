'use strict';

const got = require('got');
const fs = require('fs');

const AVERAGE_PRICE_API_URL = 'http://bitcoinaverage.pl/api/simple_average.php';
const AVERAGE_PRICE_FILE_PATH = 'averagePrice.txt';

const saveCurrentAveragePrice = (averagePrice) => fs.writeFileSync(AVERAGE_PRICE_FILE_PATH, averagePrice, 'utf8');

const getPreviousAveragePrice = () => Promise.resolve()
    .then(() => fs.readFileSync(AVERAGE_PRICE_FILE_PATH, 'utf8'))
    .then(averagePrice => parseFloat(averagePrice))
    .then(parsedAveragePrice => !Number.isNaN(parsedAveragePrice) ? parsedAveragePrice : 0)
    .catch(() => 0);

const getCurrentAveragePrice = () => got(AVERAGE_PRICE_API_URL)
    .then(response => response.body ? JSON.parse(response.body) : {})
    .then(data => {
        if (data && data.status === 'OK') {
            return data.avg;
        }

        return null;
    })
    .catch(() => null);


const isAveragePriceBigDifference = (previousAveragePrice, currentAveragePrice, bigPriceDifference) => {
    if (currentAveragePrice > previousAveragePrice + bigPriceDifference || currentAveragePrice < previousAveragePrice - bigPriceDifference) {
        return true;
    }

    return false;
};

module.exports = {
    saveCurrentAveragePrice,
    isAveragePriceBigDifference,
    getCurrentAveragePrice,
    getPreviousAveragePrice
};