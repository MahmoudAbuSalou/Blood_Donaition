
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const auth = require('../../middleware/auth');
const {BloodDonors,validate} = require('../../models/blood_donors');
const {User} = require('../../models/user');
const express = require('express');
const router = express.Router();


router.get('/:id',auth,asyncMiddleWare(async (req, res) => {


    const response =await BloodDonors.findAll({
        where: {post_id: req.params.id,},
        include: User ,// Join Table Post With Table User
        order: [
            ['createdAt', 'DESC'] //  order By Date  To Get The Latest Post
        ]
    });

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
            data:response
        });
    }
 
}));

module.exports = router;
