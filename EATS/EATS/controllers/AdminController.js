const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/AdminModel");
const AdminActivity = require("../models/AdminactivityModel");
const { ERROR_MESSAGE, STATUS_CODE, logger } = require("../constants");
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

//Register 
const Signup = asyncHandler(async (req, res) => {
  try {
    const { username, email, password, MobileNumber} = req.body;
    if (!username || !email || !password || !MobileNumber) {
      const error = new Error("All fileds are mandatory");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      const error = new Error("Email already exists");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    if (password.length > 8) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      const IPaddress = data.ip;
      const user = await User.create({ username, email, password: hashedPassword, MobileNumber, IPaddress });
      if (user) {
        return res.status(STATUS_CODE.OK).json({ message: "User registered sucessfully" });
      } else {
        const error = new Error("Invalid Credentails");
        error.statusCode = STATUS_CODE.BAD_REQUEST;
        throw error;
      }
    } else {
      const error = new Error("password length is too short");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }

  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});


//Login
const Login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new Error("All fileds are mandatory");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    const user = await User.findOne({ email });
    if(!user){
      const error = new Error("Email not registered");
      error.statusCode = STATUS_CODE.UNAUTHORIZED;
      throw error;
    }
    console.log(user)
    const username = user.username
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ user: { id: user.id, role: user.role } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
      const response = await fetch('https://api.ipify.org/?format=json');
      const data = await response.json();
      const IPaddress = data.ip;
      const adminActivity = await AdminActivity.create({ userId: user.id, username, email, IPaddress });
      res.status(STATUS_CODE.OK).json({ accessToken });
      logger.info('From this email:' + email + '  loggedin sucessfully!');
    } else {
      const error = new Error("Invalid email or password!");
      error.statusCode = STATUS_CODE.UNAUTHORIZED;
      throw error;
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});

// Forgot password
const Forgotpass = asyncHandler(async (req, res) => {
  try {
    const {email} = req.body;
    const userAvailable = await User.findOne({ email });
    if (!userAvailable) {
      const error = new Error("Email Not registered!");
      error.statusCode = STATUS_CODE.NOT_FOUND;
      throw error;
    }
    
    const transporter = nodemailer.createTransport({ host: process.env.host, port: 587, secure: false, auth: { user: process.env.smtpEmail, pass: process.env.pass },});
    
    const emailotp = Math.floor(Math.random() * 900000) + 100000;
   
    const updatedUser = await User.findOneAndUpdate({ email }, { EmailOTP: emailotp }, { new: true });
    console.log(updatedUser)
    if(!updatedUser){
      const error = new Error("unable to update otp");
      error.statusCode = STATUS_CODE.NOT_FOUND;
      throw error;
    }
    const mailOptions = { from: process.env.Defaultmail, to: req.body.email, text: 'Your Email OTP is: ' + emailotp };
    const info = await transporter.sendMail(mailOptions);
    if (!info) {
      const error = new Error("unable to sent email SMTP error!");
      error.statusCode = STATUS_CODE.NOT_FOUND;
      throw error;
    }
    logger.info('Mail Sent Successfully to ' + req.body.email);
    return res.status(STATUS_CODE.OK).json({ message: "Mail Sent Successfully..." });
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});

// Verify otp
const verifyotp = asyncHandler(async (req, res) => {
  try {
    const {email,emailotp} = req.body;
    const userAvailable = await User.findOne({ email });
    if (userAvailable.EmailOTP != emailotp) {
      const error = new Error("Invalid otp");
      error.statusCode = STATUS_CODE.UNAUTHORIZED;
      throw error;
    }
    else {
      const updatedUser = await User.findOneAndUpdate({ email }, { EmailOTP: null }, { new: true });
       return res.status(STATUS_CODE.OK).json({ message: "otp verified Successfully..." });
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});
// Resetpassword
const passwordreset = asyncHandler(async (req, res) => {
  try {
    const { email,password, confirmpassword} = req.body;
    if (!email||!password || !confirmpassword) {
      const error = new Error("All fileds are mandatory");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    if (password != confirmpassword) {
      const error = new Error("Incorrect confirm password");
      error.statusCode = STATUS_CODE.UNAUTHORIZED;
      throw error;
    }
    if (password.length > 8) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate({ email }, { password: hashedPassword }, { new: true });
      if (updatedUser) {
        return res.status(STATUS_CODE.OK).json({ message: "password reset sucessfully" });
      }
    } else {
      const error = new Error("password length is too short");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});

module.exports = { Signup, Login, Forgotpass, verifyotp, passwordreset };

