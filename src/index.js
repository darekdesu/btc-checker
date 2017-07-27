'use strict';

const { isAveragePriceBigDifference, getCurrentAveragePrice, getPreviousAveragePrice, saveCurrentAveragePrice } = require('./utils/averagePrice');
const mailer = require('./utils/mailer');

const BIG_DIFFERENCE = 100;

(async () => {
    const currentAveragePrice = await getCurrentAveragePrice();
    const previousAveragePrice = await getPreviousAveragePrice();

    console.log('currentAveragePrice', currentAveragePrice);
    console.log('previousAveragePrice', previousAveragePrice);

    if (isAveragePriceBigDifference(previousAveragePrice, currentAveragePrice, BIG_DIFFERENCE)) {
        await saveCurrentAveragePrice(currentAveragePrice);

        const isAveragePriceUp = currentAveragePrice > previousAveragePrice;
        await mailer(currentAveragePrice, isAveragePriceUp);

        console.log('There is big BTC difference!');
        return;
    }

    console.log('There is NO big BTC price difference!');
    return;
})();
