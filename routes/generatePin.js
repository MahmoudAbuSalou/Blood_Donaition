const express = require('express');
const router = express.Router();
const sendEmail=require('../services/sendEmail')
const asyncMiddleWare=require('../middleware/async')
function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return (Math.floor(Math
             .random() * (maxm - minm + 1)) + minm).toString();
  }

  //
  router.post('/', asyncMiddleWare(
    async (req, res) => {
        console.log('---------------------------------------')
        console.log(req.body.email)
        console.log('---------------------------------------')
        var pin=generateRandomNumber();
        console.log(pin)
        await sendEmail(req.body.email,pin)
       
    
      res.status(200).send({
        "status":"true",
        "message":"",
        "pin":pin
      });
    }
    
  ));
  module.exports = router; 