const {StatusCode} = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCode.UNAUTHORIZED
    }
}

module.exports = UnAuthenticatedError