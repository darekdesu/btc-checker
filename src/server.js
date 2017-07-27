'use strict';

const { isAveragePriceBigDifference, getCurrentAveragePrice, getPreviousAveragePrice, saveCurrentAveragePrice } = require('./utils/averagePrice');

const BIG_DIFFERENCE = 50;

(async () => {
    const currentAveragePrice = await getCurrentAveragePrice();
    const previousAveragePrice = await getPreviousAveragePrice();

    console.log('currentAveragePrice', currentAveragePrice);
    console.log('previousAveragePrice', previousAveragePrice);

    if (isAveragePriceBigDifference(previousAveragePrice, currentAveragePrice, BIG_DIFFERENCE)) {
        saveCurrentAveragePrice(currentAveragePrice);

        console.log('There is big BTC difference!');
        return;
    }

    console.log('There is NO big BTC price difference!');
    return;
})();
