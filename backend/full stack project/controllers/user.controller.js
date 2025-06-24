import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"; 
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // validation
  if (!userName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({ userName, email, password });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;
    await user.save();

    // Configure mail transport
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.MAILTRAP_SENDERMAIL,
      to: user.email,
      subject: "Verify your email",
      html: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
    };

    // Send verification email
    await transport.sendMail(mailOptions);

    // Send success response
    return res.status(201).json({
      success: true,
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Internal server error",
    });
  }
};

const verifyUser = async (req, res) => {
  // get token from params
  const { token } = req.params;

  // check if token is valid
  if (!token) {
    return res.status(404).json({
      message: "Token not found",
    });
  }
  // find user based on token

  const user = await User.findOne({ verificationToken: token });

  // check if user exists
  if (!user) {
    return res.status(404).json({
      message: "Invalid token ",
    });
  }

  // set isVerified to true
  user.isVerified = true;

  // remove verification token
  user.verificationToken = undefined;

  // save user
  await user.save();

  // send success response
  return res.status(200).json({
    success: true,
    message: "User verified successfully",
  });
};

const loginUser = async (req, res) => {
  //get user data
  const { email, password } = req.body;

  //validate
  if (!email || !password) {
    return res.status(400).json({
      message: " Invalid Email or Password",
    });
  }
  try {
    // get user
    const user = await User.findOne({ email });

    // check user exist
    if (!user) {
      return res.status(400).json({
        message: "User not exists",
      });
    }

    // check  password is correct
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id},
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    //Define cookie options for security
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    };

    // Send token as cookie
    res.cookie("token", token, cookieOptions);

    // send success response
    res.status(200).json({
      message: "Login Successfully",
      success: true,
    });
  } catch (error) {
    // Step 9: Catch and handle any unexpected errors
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token" , "" , {});
    // Send success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
     res.status(500).json({
      success: false,
      message: "Error during logout",
    });
  }
};


const forgotPassword = async (req, res) => {
  // get email 

  //find user by id 

  // reset token + reset expiry => Date.now() + 10 *60 *1000

  // send mail 

  // save 

  // send response 
};

const resetPassword = async (req, res) => {
// collect token from params

// get password from req.body

//user user based on resetpasswordToken and resetPasswordExpiry 

// set password 

// empty  resetpasswordToken and resetPasswordExpiry  = undefined

// save password

// send RESPONSE 

};

const getMe = async (req, res) => {
  try {
    //get user
    const user = await User.findById(req.user.id).select("-password");
    //validate
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    //send success response
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
};

export {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getMe,
};
