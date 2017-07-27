'use strict';

const CronJob = require('cron').CronJob;

const {isAveragePriceBigDifference, getCurrentAveragePrice, getPreviousAveragePrice, saveCurrentAveragePrice } = require('./utils/averagePrice');
const mailer = require('./utils/mailer');

/* Configure this values as you wish */
const BIG_PRICE_DIFFERENCE_IN_PLN = 300;
const CRON_TIME = '0 0 8-23 * * *'; // At every minute past every hour from 8 through 22
const CRON_TIME_ZONE = 'Europe/Berlin';

new CronJob(CRON_TIME, async () => {
    const currentAveragePrice = await getCurrentAveragePrice();
    const previousAveragePrice = await getPreviousAveragePrice();

    console.log(`currentAveragePrice  | ${currentAveragePrice} PLN`);
    console.log(`previousAveragePrice | ${previousAveragePrice} PLN`);

    if (isAveragePriceBigDifference(previousAveragePrice, currentAveragePrice, BIG_PRICE_DIFFERENCE_IN_PLN)) {
        await saveCurrentAveragePrice(currentAveragePrice);

        const isAveragePriceUp = currentAveragePrice > previousAveragePrice;
        await mailer(currentAveragePrice, isAveragePriceUp);

        console.log(`There is big (+/-${BIG_PRICE_DIFFERENCE_IN_PLN} PLN) BTC difference! \n`);
        return;
    }

    console.log(`There is NO big (+/-${BIG_PRICE_DIFFERENCE_IN_PLN} PLN) BTC price difference! \n`);
}, null, true, CRON_TIME_ZONE);
