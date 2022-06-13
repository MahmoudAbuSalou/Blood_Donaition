
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post,validate} = require('../../models/post');
const express = require('express');
const router = express.Router();


router.get('/:id',asyncMiddleWare(async (req, res) => {

  
    const response = await Post.findOne({ where: { post_id:req.params.id} });
    if (response === null) {
        res.status(404).send({
            status:'false',
            message:'Post not Found..',
            data:null
        });
    } else {
        res.status(200).send({
            status:'true',
            message:'get Single Post Successfully..',
            data:response
        });
    }
 
}));

module.exports = router;
