const axios = require('axios');
const { HTTP_REQUEST_METHODS } = require('../constants');

async function getData(url, headers = {}) {
    const requestOptions = {
        method: HTTP_REQUEST_METHODS.GET,
        url,
        headers
    };
    return (await axios(requestOptions)).data;
}

module.exports = getData;