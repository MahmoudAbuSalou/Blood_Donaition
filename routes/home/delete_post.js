
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post,validate} = require('../../models/post');
const express = require('express');
const router = express.Router();


router.post('/:id',asyncMiddleWare(async (req, res) => {
    const response = await Post.destroy({ where: { post_id:req.params.id,user_id:req.body.user_id}});
    if (response==0) {
        res.status(404).send({
            status:'false',
            message:'Post not Found..',
            data:null
        });
    } else {
        res.status(200).send({
            status:'true',
            message:'delete Post Successfully..',
            data:response
        });
    }
 
}));

module.exports = router;
