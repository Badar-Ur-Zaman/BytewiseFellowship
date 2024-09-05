const {StatusCode} = require('http-status-codes')
const CustomAPIError = require('./custom-api')

class BadRequestError extends CustomAPIError { 
    constructor(message){
        super(message)
        this.statusCode = StatusCode.BAD_REQUEST;
    }
}

module.exports = BadRequestError