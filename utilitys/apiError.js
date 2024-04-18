class ApiError {
    constructor(code, message) {
      this.code = code;
      this.message = message;
    }
  
    toJSON() {
      return {
        code: this.code,
        message: this.message,
      };
    }
  }
module.exports = ApiError;  