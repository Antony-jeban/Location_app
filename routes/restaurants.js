const express = require('express');
const router = express.Router();

const { GOOGLE_API_KEY } = require('../config');
const { STATUS_CODES } = require('../constants');
const { getRequestedData } = require('../services');
// const { getRequestedData } = require('../services');

const postcode_baseURL = 'https://postcodes.io';
const google_baseURL = 'https://maps.googleapis.com';

// const statusMessage = {
//     'ZERO_RESULTS': 'No Restaurants available nearby'
// }

router.get('/random-postcodes', async (_, res) => {
    try {
        const url = postcode_baseURL + '/random/postcodes';
        const { result, status } = await getRequestedData(url);
        res.status(status).send({ code: result.postcode });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_ERROR).send(error);
    }
});

/* GET users listing. */
router.get('/:location', async function (req, res, next) {
    const { location } = req.params;
    try {
        if (!(typeof (location) === 'string')) {
            console.log('Error: Location is not string type', location);
            return res.status(STATUS_CODES.BAD_REQUEST).send({ message: `Please enter a valid postal code ${location}` });
        }
        const postCodeURL = postcode_baseURL + `/postcodes/${location}`
        const { result, status: statusCode } = await getRequestedData(postCodeURL);

        if (statusCode === STATUS_CODES.OK) {
            const restaurantsURL = google_baseURL + `/maps/api/place/nearbysearch/json?location=${result.latitude}%2C${result.longitude}&radius=50000&type=restaurant&keyword=cruise&key=${GOOGLE_API_KEY}`;
            const { results } = await getRequestedData(restaurantsURL);
            console.log('Success!!');
            res.status(statusCode).send({ streetResults: result, restaurants: results });
        } else {
            console.log('Something wrong with the post code!!', postCodeURL);
            res.status(STATUS_CODES.INTERNAL_ERROR).send({ message: `Unable to find the location info for the street ${location}` });
        }
    } catch (error) {
        console.log({ error })
        res.status(STATUS_CODES.INTERNAL_ERROR).send(error);
        next(error);
    }
});

module.exports = router;
