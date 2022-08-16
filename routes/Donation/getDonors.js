
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const auth = require('../../middleware/auth');
const {Post} = require('../../models/post');
const {BloodDonors,validate} = require('../../models/blood_donors');
const {User} = require('../../models/user');
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = Sequelize.Op;


router.get('/:id',auth,asyncMiddleWare(async (req, res) => {


    const response =await BloodDonors.findAll({
        where: {[Op.and]:[{post_id: req.params.id,},{statusRequest:1}]},
        include: User ,// Join Table Post With Table User
        order: [
            ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        ]
    });
    const responsePost = await Post.findOne({ where: { post_id:req.params.id} });
    

    if (response === null) {
        res.status(404).send({
            status:'false',
            message:'Post not Found..',
            data:null
        });
    } else {
     
        res.status(200).send({
            status:'true',
            message:'get User Donors Successfully..',
            data:response,
            phone:responsePost.phone

        });
    }
 
}));

module.exports = router;
