const ApiError = require("./apiError");

function ApiResponse(success,message,data,error){
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error instanceof ApiError ? error : null;
}

ApiResponse.prototype.toJSON = function(){
    return{
        success : this.success,
        message : this.message,
        data : this.data,
        error: this.error ? this.error.toJSON() : undefined
    };
};

module.exports = ApiResponse;