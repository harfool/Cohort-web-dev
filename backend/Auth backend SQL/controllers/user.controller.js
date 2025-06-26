import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'


export const registerUser = async (req , res) => {
    // get data 
    const {email , name , password, phone} = req.body
    //validate 
    if(!email || !name || !password || !phone){
        console.log("All fields are required")
        res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }
    
    try {
        //get user 
      const existingUser =  await prisma.user.findUnique({
            where : {email}
        })
        //validate user exist or not
        if (existingUser) {
            return res.status(400).json({
                success : false,
                message : "User already exits"
            })
        }
       // hash the password
       const hashedPassword = bcrypt.hash(password , 10)
       
       //create a verification token
       const verificationToken = crypto.randomBytes(32).toString("hex")

       const user = await prisma.user.create({
        data : {
            name ,
            email,
            phone ,
            password : hashedPassword,
            verificationToken
        }
       })

       //send mail
       const transport = nodemailer.createTransport({
         host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
})

// email options 
const mailOptions = {
    form: process.env.MAILTRAP_SENDERMAIL,
    to : user.email,
    subject : "Verify your email",
    html : `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token} `
}
// send mail
await transport.sendMail(mailOptions)

// send response 
res.status(201).json({
    success : true,
    message : "User created successfully"
})
        
} catch (error) {
    return res.status(500).json({
        success : false,
        error,
        message: "Internal Server error"
    })
}
}
 
export const loginUser = async (req ,res) =>{
    // get data
    const {email , password} = req.body

    //validate
    if (!email || !password ) {
        return res.status(400).json({
            success : false,
            message : "All fields are required"
        })
    }

    try {
       // find user based on email
       const user = await prisma.user.findUnique({
        where : {email}
       })  

       //check user 
       if (!user) {
        return res.status(400).json({
            success : false ,
            message :"Invalid email"
        })
       }
       // compare password 
       const isMatch = bcrypt.compare(password , user.password)
      // check password
      if (!isMatch) {
        return res.status(400).json({
            success : false,
            message : "Invalid Password"
        })
      }
      // create jwt token
      const token = jwt.sign(
        {id : user.id , role : user.role},
        process.env.SECRET_KEY,
        {expiresIn : "24h"}
      )

      //cookie options 

      const cookieOptions = {
        httpOnly : true,
        secure : true
      }
      // set cookie
      res.cookie("token" , token ,cookieOptions )

      //send response
      return res.status(201).json({
        success : true,
        message : "User log in successfully",
        token,
        user : {
            id : user.id,
            name : user.name,
            email : user.email
        }
      })

    } catch (error) {
        return res.status(500).json({
        success : false,
        message : "failed to log in",
         })
    }
}

