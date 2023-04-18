const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"]},
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
      maxlength: 255,
      // match: /^\S+@\S+\.\S+$/
    match:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/  },
    password: {
      type: String,
      required: [true, "Please add the user password"],
      minlength: 8
    },
    role: {
      type: String,
      default: "admin"
    },
    MobileNumber: { type: String, required: [true, "Please add the moblie number"] ,minlength: 10, match: /^\+?\d{10,14}$/  },
    EmailOTP: { type: String,default: null },
    IPaddress: { type: String, required: true},
    Status: { type: String, default: "active"  , maxlength:30},
  },

  {
    timestamps: true,
  }
);



module.exports = mongoose.model("AdminData", AdminSchema);
