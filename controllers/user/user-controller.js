const { MongoServerError } = require("mongodb");
const user = require("../../models/user.model");
const ApiError = require("../../utilitys/apiError");
const ApiResponse = require("../../utilitys/apiResponse");

class UserController{

    async addUser(req,res){
        try {
            const userData = await user.create(req.body);
            const shareUser = userData.toJSON();
            console.log('create user : '+JSON.stringify(userData));
            const apiError = new ApiError(0,"no error");
            const response = new ApiResponse(true,shareUser);
            console.log('create userresponse : '+JSON.stringify(response));
            return res.status(200).json(response);
        } catch (error) {
            if(error instanceof MongoServerError){
                if(error.code == 11000){
                    const { keyPattern } = error; // Assuming the error object provides `keyPattern` property
                    // Identify the duplicated field(s) based on keyPattern
                    let duplicateField;
                    for (const field in keyPattern) {
                      if (keyPattern[field] === 1) { // Check for index value of 1 (unique)
                        duplicateField = field;
                        break; // Stop after finding the first duplicate field (can be modified to get all)
                      }
                    }
                    const message = `The value you entered for '${duplicateField}' already exists. Please choose a unique value.`;
                    const apiError = new ApiError(error.code,message);
                    const response = new ApiResponse(false,null,apiError);
                    console.log('create user error : '+JSON.stringify(error));
                    return res.status(400).json(response);               
                }else{
                    const message =  error.message;
                    const apiError = new ApiError(10,message);
                    const response = new ApiResponse(false,null,apiError);
                    console.log('create user error : '+JSON.stringify(error));
                    return res.status(400).json(response);               
                }
             }else
             {
                console.log('error  ======='+error);
                const message =  error.message;
                const apiError = new ApiError(0,message);
                const response = new ApiResponse(false,null,apiError);
                console.log('create user error : '+JSON.stringify(error));
                return res.status(400).json(response);    
            }               
        }
    }
}

module.exports = UserController;