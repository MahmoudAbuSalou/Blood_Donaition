
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post,validate} = require('../../models/post');
const {User} = require('../../models/user');
const express = require('express');
const router = express.Router();


router.get('/:page',asyncMiddleWare(async (req, res) => {

    let limit = 10
    let offset = 0 + (req.params.page - 1) * limit
  
    const response =await Post.findAll({
        offset: offset,
        limit: limit,
        include: User ,
        order: [
            ['createdAt', 'DESC']
        ]
    });


  res.status(200).send({
      status:'true',
      message:'get All Post Successfully..',
      data:response,
  });
}));

module.exports = router;
