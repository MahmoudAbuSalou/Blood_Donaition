
const _ = require('lodash');

const  asyncMiddleWare     = require('../../middleware/async');
const {Post_Archive} = require('../../models/Archive/post_archive');
const express = require('express');
const router = express.Router();


router.get('/',asyncMiddleWare(async (req, res) => {
console.log("-------------------------------------------------------------------");
    const All_Post =await Post_Archive.count();
    const Complete_Post =await Post_Archive.count({where:{state:1}});
    const UnComplete_post = All_Post  - Complete_Post; 
    const Percent_Of_Complete_Post= (Complete_Post/All_Post)*100; 
    const Percent_Of_UnComplete_Post= (UnComplete_post/All_Post)*100; 


  res.status(200).send({
      status:'true',
      message:'get Percent of Complete Post  Successfully..',
     AllPost:All_Post,
     Complete: Complete_Post,
     UnComplete:UnComplete_post,
     Percent_Of_Complete:Percent_Of_Complete_Post,
     Percent_Of_UnComplete:Percent_Of_UnComplete_Post,
  });
}));

module.exports = router;
