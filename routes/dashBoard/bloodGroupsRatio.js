const {Post_Archive}=require('../../models/Archive/post_archive')

const  asyncMiddleWare     = require('../../middleware/async');
const auth=require('../../middleware/auth')
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/',asyncMiddleWare(async(req,res)=>{
   
    let Posts = await Post_Archive.count ();
    let A1 = await Post_Archive.count ({where:{bloodType:'A+'}});
    let A2 = await Post_Archive.count ({where:{bloodType:'A-'}});
    let B1 = await Post_Archive.count ({where:{bloodType:'B+'}});
    let B2 = await Post_Archive.count ({where:{bloodType:'B-'}});
    let O1 = await Post_Archive.count ({where:{bloodType:'O+'}});
    let O2 = await Post_Archive.count ({where:{bloodType:'O-'}});
    let AB1 = await Post_Archive.count ({where:{bloodType:'AB+'}});
    let AB2 = await Post_Archive.count ({where:{bloodType:'AB-'}});
    let Blasma=await Post_Archive.count ({where:{bloodType:'بلازما'}});
  
   
  
     
   
  

    
    var data={
      "status":"true",
      "A+":(A1/Posts)*100,
      "B+":(B1/Posts)*100,
      "AB+":(AB1/Posts)*100,
      "O+":(O1/Posts)*100,
      "A-":(A2/Posts)*100,
      "B-":(B2/Posts)*100,
      "AB-":(AB2/Posts)*100,
      "O-":(O2/Posts)*100,
      "Blasma":(Blasma/Posts)*100
    }
   
  
    res.status(200).send(data)
  
  
  
  
  }));
  module.exports = router; 
