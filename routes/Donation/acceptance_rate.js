const _ = require('lodash');
const auth = require('../../middleware/auth')
const asyncMiddleWare = require('../../middleware/async');
const {
    BloodDonors,
    validate
} = require('../../models/blood_donors');
const {
    Post
} = require('../../models/post');
const express = require('express');
const router = express.Router();


router.post('/', auth, asyncMiddleWare(async (req, res) => {

    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send({
        status: false,
        message: error.details[0].message,
        data: null
    });



    /// Get Value From Request Body Using Method Pick in  Lodash Package 
    let bloodDonors = new BloodDonors(_.pick(req.body, ['acceptance_rate', 'post_id']));
    // check if post complete 
    const post = await Post.findOne({
        where: {
            post_id:bloodDonors.post_id
        }
    });
    
    if (parseInt(post.bloodBags) === post.bloodBagsCollect) {
        res.status(404).send({
            status: 'false',
            message: 'user collect all Blood Bags..',
            data: null
        });

    }

    ///  add Position 
    else {

        const response = await BloodDonors.create({
            acceptance_rate: bloodDonors.acceptance_rate,
            post_id: bloodDonors.post_id,
            user_id: req.user.id,
            statusRequest:1
        });

        res.status(200).send({
            status: 'true',
            message: 'Add acceptance_rate Successfully..',
            data: response,
        });
    }


}));

module.exports = router;