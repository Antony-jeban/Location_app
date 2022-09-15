const { GOOGLE_API_KEY } = require('../config');
const { STATUS_CODES, BASE_URL } = require('../constants');
const { getRequestedData } = require('../services');

async function GetRandomPostCodes(_, res) {
    try {
        const url = BASE_URL.POST_CODE + '/random/postcodes';
        const { result, status } = await getRequestedData(url);
        res.status(status).send({ code: result.postcode });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_ERROR).send(error);
    }
}

async function GetLocationsInfo(req, res, next) {
    const { location } = req.params;
    try {
        const postCodeURL = BASE_URL.POST_CODE + `/postcodes/${location}`
        const { result, status: statusCode } = await getRequestedData(postCodeURL);

        if (statusCode === STATUS_CODES.OK) {
            const restaurantsURL = BASE_URL.GOOGLE + `/maps/api/place/nearbysearch/json?location=${result.latitude}%2C${result.longitude}&radius=50000&type=restaurant&keyword=cruise&key=${GOOGLE_API_KEY}`;
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
}

module.exports = {
    GetRandomPostCodes,
    GetLocationsInfo
}