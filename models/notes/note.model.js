const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
    {
        title :{
            type : String,
            required : true,
            max : 30
        },
        description:{
            type : String,
            required : false,
            max : 500
        },
        userId : {
            type : String,
            required:true
        }
    },{
        timestamps: true  // Automatically adds 'createdAt' and 'updatedAt' fields
    }
);

const NoteSchema = mongoose.model("Notes",noteSchema);
module.exports = NoteSchema;