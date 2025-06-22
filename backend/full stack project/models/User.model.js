import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
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
    resetPasswordToken : String,
    passwordResetExpires : Date
}, {Timestamps : true ,})

userSchema.pre("save" ,async function name(next) {
     
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password , 10)
    }

    next()
})

const User = mongoose.model("User" , userSchema)

export default User