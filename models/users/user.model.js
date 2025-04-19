const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type :String,
            required:[true,"First name is required"]
        },
       lastName:{
            type :String,
            required:[true,"Last name is required"]
        },
        userName:{
            type :String,
            required:[true,"Username is required"],
            unique: true
        },
        password:{
            type : String,
            required:[true,"Password is required"],
            min : 8
        },
        profileImage:{
            type : String,
            required:false
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true
          }     
    },
    {
        timestamps: true  // Automatically adds 'createdAt' and 'updatedAt' fields
    }
);

// UserSchema.pre('save',async function (next){
//     if(!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password,salt);
//     next();
// });

UserSchema.pre('save', async function(next) {
    console.log('enter in pre save');
    if (!this.isModified('password')) return next(); // Skip hashing if password isn't modified
    // Generate a salt (random bytes for added security)
    const salt = await bcrypt.genSalt(10); // Adjust cost factor as needed (higher = slower, more secure)
  
    // Hash the password with the salt  
    this.password = await bcrypt.hash(this.password, salt);
  
    // Clear the plain text password (optional for security)
    // this.password = undefined;
    next();
  });
  
  
  UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
  };

const user = mongoose.model("User",UserSchema);

module.exports = user