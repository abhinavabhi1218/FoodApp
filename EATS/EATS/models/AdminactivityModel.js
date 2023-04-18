const mongoose = require("mongoose");
const ActivitySchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name"]},
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      maxlength: 255,
      match: /^\S+@\S+\.\S+$/  },
    IPaddress: { type: String, required: true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
  },

  {
    timestamps: true,
  }
);


module.exports = mongoose.model("AdminActivity", ActivitySchema);
