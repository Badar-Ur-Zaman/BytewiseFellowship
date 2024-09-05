const {StatusCode} = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCode.NOT_FOUND
    }
}

module.exports = NotFoundError