const asyncHandler = require("express-async-handler");
const { ERROR_MESSAGE, STATUS_CODE ,logger} = require("../constants");
const jwt = require("jsonwebtoken");
const User = require("../models/AdminModel");

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          const error = new Error("Invalid Token");
          error.statusCode = STATUS_CODE.UNAUTHORIZED;
          throw error;
        }
        req.user = decoded.user;
        next();
      });

      if (!token) {
        const error = new Error("Missing token");
        error.statusCode = STATUS_CODE.UNAUTHORIZED;
        throw error;
      }
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});


const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const adminrole = await User.findById(req.user.id);
    if (adminrole.role == "admin") {
      console.log(adminrole.role);
    }else{
      const error = new Error(ERROR_MESSAGE.FORBIDDEN);
      error.statusCode = STATUS_CODE.FORBIDDEN;
      throw error;
    }
    next();
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});


module.exports = { validateToken, isAdmin };





