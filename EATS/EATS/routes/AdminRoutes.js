const express = require("express");
const {Signup,Login,Forgotpass,verifyotp,passwordreset} = require("../controllers/AdminController");

const router = express.Router();
router.post("/signup", Signup);
router.post("/login", Login);
router.post("/Forgotpass", Forgotpass);
router.post("/verifyotp", verifyotp);
router.post("/passwordreset", passwordreset);
module.exports = router;



