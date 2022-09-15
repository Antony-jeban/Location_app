const express = require('express');
const router = express.Router();

const postcode_baseURl = 'https://postcodes.io';

/* GET users listing. */
router.get('/:location', async function (req, res, next) {
    const { location } = req.params;
    console.log({ location });
    const { result, status } = await (await fetch(postcode_baseURl + `/postcodes/${location}`)).json();
    console.log({ result })
    if (status === 200) {
        res.send(result);
    } else {
        res.send({ message: 'Some error occurred' })
    }

});

module.exports = router;
