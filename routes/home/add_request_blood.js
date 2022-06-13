
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post, validate} = require('../../models/post');
const express = require('express');
const router = express.Router();


router.post('/',asyncMiddleWare(async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send({
        status:false,
        message: error.details[0].message,
        data:null
    });
  
  let  post = new Post(_.pick(req.body, ['firstName', 'lastName', 'bloodBags', 'cityName','hospitalName','gender','postType','bloodType','bloodOwner','phone','bloodBagsCollect','user_id','expiryDate']));

  const response = await Post.create({
    firstName:post.firstName,
    lastName:post.lastName,
    user_id: req.body.user_id,
    bloodBags:post.bloodBags,
    bloodBagsCollect:post.bloodBagsCollect,
    cityName:post.cityName,
    hospitalName:post.hospitalName,
    gender:post.gender,
    postType:post.postType,
    bloodType:post.bloodType,
    bloodOwner:post.bloodOwner,
    phone:post.phone,
    expiryDate:post.expiryDate
  });
  res.status(200).send({
      status:'true',
      message:'Add Post Successfully..',
      data:response
  });
}));

module.exports = router;
