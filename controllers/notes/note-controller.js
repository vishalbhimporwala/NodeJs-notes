const NoteSchema = require("../../models/notes/note.model");
const ApiError = require("../../utilitys/apiError");
const ApiResponse = require("../../utilitys/apiResponse");
const { getPayloadFromToken } = require("../../utilitys/jwt");

class NoteController{

    async createNote(req,res){
        try {
            const accessToken = req.headers["authorization"];
            if (!accessToken) {
                const apiError = new ApiError(0,"Missing accessToken");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }

            const token = accessToken.split(' ')[1]; // Assuming 'Bearer <token>' format
              if (!token) {
                const apiError = new ApiError(1,"Invalid authorization header format");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }
            let payload = getPayloadFromToken(token)
            console.log("payload "+JSON.stringify(payload));
            const userId = payload['_id'];
            console.log("userId from accesToken : "+userId);
            const {title,description} = req.body;
            const notenew = new NoteSchema({
                title,description,userId
            });
            const note = await notenew.save();     
            const response = new ApiResponse(true,"Notes added successfully",note);
            return res.status(200).json(response);
        } catch (error) {
            const message =  error.message;
            const apiError = new ApiError(10,message);
            const response = new ApiResponse(false,null,apiError);
            console.log('Notes added error : '+JSON.stringify(error));
            return res.status(400).json(response);
        }
    }

    async fetchAllNotes(req,res){
        try {
            const accessToken = req.headers["authorization"];
            if (!accessToken) {
                const apiError = new ApiError(0,"Missing accessToken");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }

            const token = accessToken.split(' ')[1]; // Assuming 'Bearer <token>' format
              if (!token) {
                const apiError = new ApiError(1,"Invalid authorization header format");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }
            let payload = getPayloadFromToken(token)
            console.log("payload "+JSON.stringify(payload));
            const userId = payload['_id'];
            console.log("userId from accesToken : "+userId);
            const allNotes = await NoteSchema.find({userId:`${userId}`}).sort({updatedAt:-1});
            const response = new ApiResponse(true,"Notes fetch successfully",allNotes);
            return res.status(200).json(response);
        } catch (error) {
            const message =  error.message;
            const apiError = new ApiError(10,message);
            const response = new ApiResponse(false,null,apiError);
            console.log('Notes fetch error : '+JSON.stringify(error));
            return res.status(400).json(response);
        }
    }

    async updateNote(req,res){
        try {
            const accessToken = req.headers["authorization"];
            if (!accessToken) {
                const apiError = new ApiError(0,"Missing accessToken");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }

            const token = accessToken.split(' ')[1]; // Assuming 'Bearer <token>' format
              if (!token) {
                const apiError = new ApiError(1,"Invalid authorization header format");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }
            let payload = getPayloadFromToken(token)
            console.log("payload "+JSON.stringify(payload));
            const userId = payload['_id'];
            console.log("userId from accesToken : "+userId);
            const {noteId,title,description} = req.body;
            const updateNote = {
                title : title,
                description : description
            };
            const responseNote = await NoteSchema.findOneAndUpdate({_id:noteId,userId:userId},updateNote,{new : true});
            if(responseNote){
                const response = new ApiResponse(true,"Notes update successfully",responseNote);
                return res.status(200).json(response);
            }else{
                const apiError = new ApiError(2,"Update fail");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }            
        } catch (error) {
            const message =  error.message;
            const apiError = new ApiError(10,message);
            const response = new ApiResponse(false,null,apiError);
            console.log('Notes fetch error : '+JSON.stringify(error));
            return res.status(400).json(response);
        }
    }
    async deleteNote(req,res){
        try {
            const accessToken = req.headers["authorization"];
            if (!accessToken) {
                const apiError = new ApiError(0,"Missing accessToken");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }

            const token = accessToken.split(' ')[1]; // Assuming 'Bearer <token>' format
              if (!token) {
                const apiError = new ApiError(1,"Invalid authorization header format");
                const response = new ApiResponse(false,null,apiError);
                return res.status(401).json(response);
            }
            let payload = getPayloadFromToken(token)
            console.log("payload "+JSON.stringify(payload));
            const userId = payload['_id'];
            console.log("userId from accesToken : "+userId);
            const _id = req.params.id;
            const responseNote = await NoteSchema.findByIdAndDelete(_id);
            if(!responseNote){
                const apiError = new ApiError(0,"Note not found");
                const response = new ApiResponse(false,"",null,apiError);
                return res.status(400).json(response);  
            }else{
                const response = new ApiResponse(true,"Notes deleted successfully",responseNote);
                return res.status(200).json(response);
            }            
        } catch (error) {
            const message =  error.message;
            const apiError = new ApiError(10,message);
            const response = new ApiResponse(false,null,apiError);
            console.log('Notes fetch error : '+JSON.stringify(error));
            return res.status(400).json(response);
        }
    }

}

module.exports = NoteController;