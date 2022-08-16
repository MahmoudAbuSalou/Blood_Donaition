const {User_Donate}=require('../../models/Archive/donate_archive')
const {User_Donor}=require('../../models/Archive/blood_donors_archive')
const  asyncMiddleWare     = require('../../middleware/async');
const auth=require('../../middleware/auth')
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//المتبرع له
router.get('/Donate',asyncMiddleWare(async(req,res)=>{

 
    let user = await User_Donate.findAll ({where:{gender:'male'}});
    let user1 = await User_Donate.findAll ({where:{gender:'famale'}});
  
   
  
     
   const ratioMale=user.length/(user.length+user1.length)
   const ratioFamale=user1.length/(user.length+user1.length)
  
   if(user.length==0 && user1.length==0){
    ratioMale=0
    ratioFamale=0
  }
    
    var data={
      "status":"true",
      "Male":ratioMale*100,
      "Famale":ratioFamale*100
    }
   
  
    res.status(200).send(data)
  
  
  
  
  }));

  //المتبرع
  router.get('/Donor',asyncMiddleWare(async(req,res)=>{

 
    let user = await User_Donor.findAll ({where:{gender:'male'}});
    let user1 = await User_Donor.findAll ({where:{gender:'famale'}});
  
   
  
   var ratioMale=user.length/(user.length+user1.length)
   var ratioFamale=user1.length/(user.length+user1.length)
  
   

    if(user.length==0 && user1.length==0){
      ratioMale=0
      ratioFamale=0
    }
    
    var data={
      "status":"true",
      "Male":ratioMale*100,
      "Famale":ratioFamale*100
    }
   
  
    res.status(200).send(data)
  
  
  
  
  }));
  module.exports = router; 