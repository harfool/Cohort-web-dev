import nodemailer from 'nodemailer';
const emailUtils = {
  /**
   * Send verification email to user
   * @param {Object} user - User object containing email
   * @param {string} token - Verification token
   * @returns {Promise} - Nodemailer sendMail result
   */
  sendVerificationEmail: async (user, token) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });

    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.MAILTRAP_SENDERMAIL}>`,
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Hello ${user.userName || 'User'},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${process.env.BASE_URL}/api/v1/users/verify/${token}" 
           style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">
          Verify Email
        </a>
        <p><small>This link expires in 1 hour</small></p>
        <p>If you didn't create an account, please ignore this email.</p>
      `
    };

    return transporter.sendMail(mailOptions);
  },

  /**
   * Send password reset email to user
   * @param {Object} user - User object containing email
   * @param {string} token - Password reset token
   * @returns {Promise} - Nodemailer sendMail result
   */
  sendResetPasswordEmail: async (user, token) => {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });

    const mailOptions = {
      from: `"${process.env.APP_NAME} Support" <${process.env.MAILTRAP_SENDERMAIL}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Assistance</h2>
        <p>Hello ${user.userName || 'User'},</p>
        <p>You requested to reset your password. Click below to continue:</p>
        <a href="${process.env.BASE_URL}/api/v1/users/reset-password/${token}" 
           style="display: inline-block; padding: 10px 20px; background: #dc3545; color: white; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p><strong>This link expires in 10 minutes</strong></p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    return transporter.sendMail(mailOptions);
  }
};

export default emailUtils;