
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post,validate} = require('../../models/post');
const {User} = require('../../models/user');
const express = require('express');
const router = express.Router();


router.get('/:page',asyncMiddleWare(async (req, res) => {
    // let limit = 10 // Number OF Post that Return in Every Request 
    // let offset = 0 + (req.params.page - 1) * limit // Get last Index that Get in previous Request  
  
    const response =await Post.findAll({
        // offset: offset,
        // limit: limit,
        include: User ,// Join Table Post With Table User
        order: [
            ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        ]
    });


  res.status(200).send({
      status:'true',
      message:'get All Post Successfully..',
      data:response,
  });
}));

module.exports = router;
