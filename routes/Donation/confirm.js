const _ = require('lodash');
const auth = require('../../middleware/auth')
const asyncMiddleWare = require('../../middleware/async');
const {Post} = require('../../models/post');
const {UserProfile} = require('../../models/health_user_profile');
const {Post_Donate,} = require('../../models/post_donate');
const {BloodDonors,} = require('../../models/blood_donors');
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const addPostToArchive=require('../../services/addPostToArchive')

router.post('/:id', auth, asyncMiddleWare(async (req, res) => {

             const response1 = await BloodDonors.findOne({where: {[Op.and]:[{donate_id: req.params.id},{statusRequest:1}]}});
    
             const response2 = await Post.findOne({where: { post_id: response1.post_id}});
             console.log(response2)
             if(parseInt(response2.bloodBags)===response2.bloodBagsCollect){
                res.status(404).send({
                    status:'false',
                    message:'user collect all Blood Bags..',
                    data:null
                });
            }
                else{
                    var today = new Date();
                     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


                    await UserProfile.increment( {donation_count:1},{where: { user_id: response1.user_id}});
                    await UserProfile.update({dateOfLastDonation:date},{ where: {user_id:response1.user_id}})
                     await Post.increment( {bloodBagsCollect:1},{where: { post_id: response1.post_id}});
                     await Post_Donate.create({ status:1,postPostId:response1.post_id,bloodDonorDonateId:response1.donate_id,user_id:response1.user_id});  
                     const response3 = await BloodDonors.update({statusRequest:0},{ where: {donate_id:req.params.id}});
                     console.log("---------------------------------------------------")
                     console.log(response2.post_id);
                     console.log(response2.user_id);
                     console.log(response1.user_id);
                     console.log("----------------------------------------------");
                     addPostToArchive(response1.post_id,response2.user_id,response1.user_id)

                  res.status(200).send({
                    status: 'true',
                    message: 'The Donor has been Successfully added..',
                    data: null,
                
                });
                }
            

    
    

}));

module.exports = router;