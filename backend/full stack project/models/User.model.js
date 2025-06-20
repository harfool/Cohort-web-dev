import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["admin" , "user" ],
        default : "user"
    }, 
    isVerified : {
    type  : Boolean,
    default : false
    },
    verificationToken : String,
    passwordResetToken : String,
    resetPasswordToken : String,
    passwordResetExpires : Date
}, {Timestamps : true ,})

const User = mongoose.model("User" , userSchema)

export default User