const ApiError = require("./apiError");

function ApiResponse(success,data,error){
    this.success = success;
    this.data = data;
    this.error = error instanceof ApiError ? error : null;
}

ApiResponse.prototype.toJSON = function(){
    return{
        success : this.success,
        data : this.data,
        error: this.error ? this.error.toJSON() : undefined
    };
};

module.exports = ApiResponse;