const _ = require('lodash');
const auth = require('../../middleware/auth')
const asyncMiddleWare = require('../../middleware/async');
const {Post} = require('../../models/post');
const {UserProfile} = require('../../models/health_user_profile');
const {Post_Donate,} = require('../../models/post_donate');
const {BloodDonors,} = require('../../models/blood_donors');
const express = require('express');
const router = express.Router();


router.post('/:id', auth, asyncMiddleWare(async (req, res) => {

             const response1 = await BloodDonors.findOne({where: { donate_id: req.params.id}});
    
             const response2 = await Post.findOne({where: { post_id: response1.post_id}});
            
             if(parseInt(response2.bloodBags)===response2.bloodBagsCollect){
                res.status(404).send({
                    status:'false',
                    message:'user collect all Blood Bags..',
                    data:null
                });
            }
                else{
                    await UserProfile.increment( {donation_count:1},{where: { user_id: response1.user_id}});
                     await Post.increment( {bloodBagsCollect:1},{where: { post_id: response1.post_id}});
                     await Post_Donate.create({ status:1,postPostId:response1.post_id,bloodDonorDonateId:response1.donate_id,user_id:response1.user_id});  
                  //  const response3 = await BloodDonors.destroy({ where: {donate_id:response1.donate_id}});
       

                  res.status(200).send({
                    status: 'true',
                    message: 'The Donor has been Successfully added..',
                    data: null,
                
                });
                }
            

    
    

}));

module.exports = router;