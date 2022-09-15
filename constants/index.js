const HTTP_REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
}

const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
    CREATED: 201
}

const BASE_URL = {
    POST_CODE: 'https://postcodes.io',
    GOOGLE: 'https://maps.googleapis.com'
}

module.exports = {
    HTTP_REQUEST_METHODS,
    STATUS_CODES,
    BASE_URL
}