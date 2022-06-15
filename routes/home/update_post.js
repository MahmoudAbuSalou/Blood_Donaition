
const _ = require('lodash');
const auth = require('../../middleware/auth');
const  asyncMiddleWare     = require('../../middleware/async');
const {Post,validate} = require('../../models/post');
const express = require('express');
const router = express.Router();


router.post('/:id',auth,asyncMiddleWare(async (req, res) => {

   
  
    const response = await Post.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bloodBags: req.body.bloodBags,
        cityName: req.body.cityName,
        hospitalName: req.body.hospitalName,
        gender: req.body.gender,
        postType: req.body.postType,
        bloodOwner: req.body.bloodOwner,
        phone: req.body.phone,
        expiryDate: req.body.expiryDate,    
    },
        { where: { post_id:req.params.id,user_id:req.user.id}});
       
    if (response==0) {
        res.status(404).send({
            status:'false',
            message:'Post not Found..',
            data:null
        });
    } else {
        res.status(200).send({
            status:'true',
            message:'Update Post Successfully..',
            data:response
        });
    }
 
}));

module.exports = router;
