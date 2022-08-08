
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {bloodPosition} = require('../../models/blood_position');
const express = require('express');
const router = express.Router();


router.get('/',asyncMiddleWare(async (req, res) => {

    const response =await bloodPosition.findAll();


  res.status(200).send({
      status:'true',
      message:'get All Locations Successfully..',
      data:response,
  });
}));

module.exports = router;
