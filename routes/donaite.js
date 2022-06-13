const {UserProfile}=require('../models/health_user_profile')
//to Catch Errors
const  asyncMiddleWare     = require('../middleware/async');
const auth=require('../middleware/auth')
const express = require('express');
const router = express.Router();


//Donaite
router.get('/',auth,asyncMiddleWare(async(req,res)=>{

 
    let user = await UserProfile.findOne ({where:{user_id:req.user.id}});
    
  
    if(!user)
    res.send({
      status:'false',
      message:'This User Not Found'
    })
  
     const count=user.donation_count
  
    
  
  

    const result=user.update({
      donation_count: count+1,
      dateOfLastDonation:new Date()
    })
    var data={
      "status":"true",
      "message":"Donaite is successfuly "
    }
      if(result==0){
          data={
                  "status":"false",
                  "message":"Donaite is faield "
                }
    }
  
    res.send(data)
  
  
  
  
  }));

  module.exports = router; 