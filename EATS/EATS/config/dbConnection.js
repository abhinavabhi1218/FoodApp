const mongoose = require("mongoose");
const { ERROR_MESSAGE, STATUS_CODE,logger } = require("../constants");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.Mongodburi,{useNewUrlParser: true, useUnifiedTopology: true,});
    if(connect){
    console.log("Successfully connected to database: ",connect.connection.host,connect.connection.name);
    }else{
      const error = new Error("database connection failed.");
      error.statusCode = STATUS_CODE.SERVICE_UNAVAILABLE;
      throw error;
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });  
    process.exit(1);
  }
};

module.exports = connectDb;