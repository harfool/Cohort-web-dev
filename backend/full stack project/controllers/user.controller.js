import User from "../models/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

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
      text: `Please verify your email by clicking on the following link: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
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
      message: "Internal server error",
    });
  }
};

export { registerUser };
