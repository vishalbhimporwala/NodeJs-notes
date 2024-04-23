const { MongoServerError } = require("mongodb");
const user = require("../../models/users/user.model");
const ApiError = require("../../utilitys/apiError");
const ApiResponse = require("../../utilitys/apiResponse");
const {generateJwtToken} = require("../../utilitys/jwt");
const bcrypt = require('bcryptjs');


class UserController{

    async registerUser(req,res){
        try {
            const userData = await user.create(req.body);
            const shareUser = userData.toJSON();
            console.log('create user : '+JSON.stringify(userData));
            const response = new ApiResponse(true,"User register successfully",shareUser);
            console.log('create userresponse : '+JSON.stringify(response));
            const accessToken = generateJwtToken(userData);
            res.setHeader('accessToken', accessToken);
            console.log(`accessToken for register user ${accessToken}`);
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

    async deleteUser(req,res){
        try {
            const deleteUserId = req.params.id;
            console.log("delete user id "+deleteUserId);
            const userData = await user.findByIdAndDelete(deleteUserId);
            if(!userData){
                const apiError = new ApiError(0,"User not found");
                const response = new ApiResponse(false,null,apiError);
                return res.status(400).json(response);  
            }else
            {
                console.log('delete user : '+JSON.stringify(userData));
                const response = new ApiResponse(true,'User deleted successfully',userData);
                console.log('create userresponse : '+JSON.stringify(response));
                return res.status(200).json(response);  
            }
        } catch (error) {
            console.log('error  ======='+error);
                const message =  error.message;
                const apiError = new ApiError(0,message);
                const response = new ApiResponse(false,null,apiError);
                console.log('create user error : '+JSON.stringify(error));
                return res.status(400).json(response);                 
        }
    }

    async loginUser(req,res){
        try {
            const {userName,email,password} = req.body;
            console.log(`requested body data userName : ${userName} email : ${email} and password : ${password}`);
            if((!userName && !email) || !password ){
                const apiError = new ApiError(0,"Username or email or password is missing");
                return res.status(400).json(new ApiResponse(false,"Login fail",apiError));
            }

            let existUser =await user.findOne({
                $or:[
                    {userName : userName},
                    {email : email}
                ]
            });
            console.log(`user from db  ${existUser}`);        

            if(!existUser){
                const apiError = new ApiError(1,"No user with this email or username");
                return res.status(400).json(new ApiResponse(false,"Login fail",apiError));
            }
            const isPasswordValid = await bcrypt.compare(password,existUser.password);
            if(!isPasswordValid){
                const apiError = new ApiError(2,"Password is incorrect.");
                return res.status(400).json(new ApiResponse(false,"Login fail",apiError));
            }else
            {
                let shareUser = existUser.toJSON();
                let accessToken = generateJwtToken(existUser);
                res.setHeader('accessToken',accessToken);
                const response = new ApiResponse(true,'User login successfully',shareUser);
                console.log('login userresponse : '+JSON.stringify(response));
                return res.status(200).json(response);  
            }
        } catch (error) {
            console.log('error  ======='+error);
            const message =  error.message;
            const apiError = new ApiError(0,message);
            const response = new ApiResponse(false,null,apiError);
            console.log('login user error : '+JSON.stringify(error));
            return res.status(400).json(response);           
        }
    }
}

module.exports = UserController;