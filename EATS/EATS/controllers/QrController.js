const asyncHandler = require("express-async-handler");
const qrt = require("../models/QrGenModel");
const QRCode = require('qrcode');
const { ERROR_MESSAGE, STATUS_CODE, logger } = require("../constants");
const bcrypt = require("bcrypt");
const path = require('path');
const fs = require('fs');
const util = require('util');
const PDFDocument = require('pdfkit');
const imageSize = require('image-size');
const qr = require('qr-image');

const base64Img = require('base64-img');


async function strgen(nos) {
  const ABCAnd123 = process.env.ABCAnd123;
  let randomString = '';
  for (let i = 0; i < nos; i++) {
    const randomIndex = Math.floor(Math.random() * ABCAnd123.length);
    randomString += ABCAnd123[randomIndex];
  }
  return String(randomString);
};


const Qrgen = asyncHandler(async (req, res) => {
  try {
    const {
      market: { digital, direct: { companies, stores } }, area: { country, state, city }, product, priceofp, batchnum, batchcount, game } = req.body;
    const qrfds = { market: { digital, direct: { companies, stores } }, area: { country, state, city }, product, priceofp, batchnum, batchcount, game };

    if (!(qrfds.market.digital || qrfds.market.direct.companies || qrfds.market.direct.stores) || !qrfds.area.country || !qrfds.area.state || !qrfds.area.city || !qrfds.product || !qrfds.priceofp || !qrfds.batchnum || !qrfds.batchcount || !qrfds.game) {
      const error = new Error("missing some mandatory fields");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    const doc = new PDFDocument();
    
    for (let i = 0; i < batchcount; i++) {
      qrfds.productid = String(qrfds.product + await strgen(3));
      qrfds.gameid = String(qrfds.game + await strgen(5));
      const passcode = String(await strgen(9));
      const extqrlink = qrfds.gameid + "," + qrfds.productid + passcode;
      const EncypURL = await bcrypt.hash(extqrlink, 9);
      qrfds.hashcode = EncypURL;

    const qrCode = qr.imageSync(process.env.baseurl + extqrlink, { type: 'png', ec_level: 'M', size: 10, margin: 2 });
      doc.text(qrfds.productid + ' - ' + qrfds.gameid, { align: 'center' });
      doc.image(qrCode, { width: 305, height: 305, align: 'right' });
      doc.moveDown(1);
      const qrc = await qrt.create(qrfds);

    }

    const pdfFilePath = path.join(__dirname, '../qrimages', qrfds.product+qrfds.batchnum+`.pdf`);
    doc.pipe(fs.createWriteStream(pdfFilePath));
    doc.end();

    res.status(STATUS_CODE.OK).json("QR codes generated and saved to PDF file");
  
  }
  catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }

});



const comparehash = asyncHandler(async (req, res) => {
  try {
    const strnew = req.params.exturl;
    const gid = strnew.split(",")[0];
    const qrdata = await qrt.findOne({ gameid: gid });
    if(!qrdata){
      const error = new Error("Gameid not found");
      error.statusCode = STATUS_CODE.NOT_FOUND;
      throw error;
    }else{
      if ((await bcrypt.compare(strnew, qrdata.hashcode)) && (qrdata.open == null)) {
        const updsg = await qrt.findOneAndUpdate({ gameid: gid }, { $set: { open: 'Opened' } }, { new: true })
        res.status(STATUS_CODE.OK).json({"play and win ": qrdata.priceofp});
      } else {
        res.status(STATUS_CODE.SERVICE_UNAVAILABLE).json({"you already played the game":0});
      }

    }  
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }

});

const gameupdate = asyncHandler(async (req, res) => {
  try {
    const strnew = req.params.exturl;
    const { winorloss ,money,upi_id} = req.body;
    const gid = strnew.split(",")[0];
    if (!strnew || !winorloss ) {
      const error = new Error("All fileds are mandatory");
      error.statusCode = STATUS_CODE.BAD_REQUEST;
      throw error;
    }
    const qrdata = await qrt.findOne({ gameid: gid });
    if(qrdata.winorloss==null){
      if(winorloss=="win"){
        await qrt.findOneAndUpdate({ gameid: gid }, { $set: { winorloss, money ,upi_id } }, { new: true })
        res.status(STATUS_CODE.OK).json("game played")
      }else{
         await qrt.findOneAndUpdate({ gameid: gid }, { $set: { winorloss} }, { new: true })
        res.status(STATUS_CODE.OK).json("game lost")
      }
    }else{
      const error = new Error("game status is already updated");
      error.statusCode = STATUS_CODE.SERVICE_UNAVAILABLE;
      throw error;
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }

});


const displayqr = asyncHandler(async (req, res) => {
  try {
    const readDir = util.promisify(fs.readdir);
    const imagePath = path.join(path.join(path.dirname(__dirname).replace(/\\/g, '/') + '/qrimages'));
    const files = await readDir(imagePath);
    if (files.length > 1) {
      const imageFiles = files.filter(file => {
        const extension = path.extname(file);
        return ['.jpg', '.png', '.gif'].includes(extension);

      });
      res.json(imageFiles);
    } else {
      const error = new Error("Images not found");
      error.statusCode = STATUS_CODE.NOT_FOUND;
      throw error;
    }
  } catch (err) {
    logger.error(err);
    const statusCode = err.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
    const errorMessage = err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({ error: errorMessage });
  }
});

module.exports = { Qrgen, comparehash, gameupdate, displayqr };