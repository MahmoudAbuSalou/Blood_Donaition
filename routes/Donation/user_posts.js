
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const auth = require('../../middleware/auth');
const {Post,validate} = require('../../models/post');
const {User} = require('../../models/user');
const express = require('express');
const router = express.Router();


router.get('/',auth,asyncMiddleWare(async (req, res) => {


    const response =await Post.findAll({
        where: {user_id: req.user.id,},
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
            message:'get User Posts Successfully..',
            data:response
        });
    }
 
}));

module.exports = router;
