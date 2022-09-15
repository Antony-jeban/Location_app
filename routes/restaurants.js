const express = require('express');
const router = express.Router();

const { GetRandomPostCodes, GetLocationsInfo } = require('../controller');

router.get('/random-postcodes', GetRandomPostCodes);

/* GET Restaurants location information. */
router.get('/:location', GetLocationsInfo);

module.exports = router;
