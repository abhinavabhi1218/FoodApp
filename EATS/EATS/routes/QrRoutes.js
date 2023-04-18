const express = require("express");
const  {Qrgen,comparehash,gameupdate,displayqr} = require("../controllers/QrController");

const router = express.Router();
router.post("/qr", Qrgen);
router.post("/game/:exturl", comparehash);
router.post("/gamep/:exturl", gameupdate);
router.get("/qrimages", displayqr);
module.exports = router;


