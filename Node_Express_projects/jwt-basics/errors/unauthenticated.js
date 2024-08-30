import CustomAPIError from "./custom-error";

class UnAuthenticatedError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = 401
    }
  }

export default UnAuthenticatedError;