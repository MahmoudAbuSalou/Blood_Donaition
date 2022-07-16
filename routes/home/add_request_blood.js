
const _ = require('lodash');
const auth=require('../../middleware/auth')
const  asyncMiddleWare     = require('../../middleware/async');
const {Post, validate} = require('../../models/post');
const {bloodPosition, validatePosition} = require('../../models/blood_position');
const express = require('express');
const router = express.Router();

// This Route For Add Post By User
router.post('/',auth,asyncMiddleWare(async (req, res) => {

  
  const sequelize=require('../../startup/db');
   let transaction;
try{

   // get transaction
   transaction = await sequelize.transaction();
/// Validate Request Body USing Joi Package
const {
  error
} = validate(req.body);
if (error) return res.status(400).send({
  status:false,
  message: error.details[0].message,
  data:null
});



   /// Get Value From Request Body Using Method Pick in  Lodash Package 
   let  post = new Post(_.pick(req.body, ['firstName', 'lastName', 'bloodBags', 'cityName','hospitalName','gender','postType','bloodType','bloodOwner','phone','bloodBagsCollect','expiryDate']));
   let position = new bloodPosition(_.pick(req.body,['position_Lat','position_Lang']));

const responseBlood = await Post.create({
firstName:post.firstName,
lastName:post.lastName,
/// this Id Get From Token By MiddleWire [auth] 
user_id: req.user.id,
bloodBags:post.bloodBags,
bloodBagsCollect:post.bloodBagsCollect,
cityName:post.cityName,
hospitalName:post.hospitalName,
gender:post.gender,
postType:post.postType,
bloodType:post.bloodType,
bloodOwner:post.bloodOwner,
phone:post.phone,
expiryDate:post.expiryDate
},{transaction});

///  add Position 

const responsePosition = await bloodPosition.create({
  position_Lat:position.position_Lat,
  position_Lang:position.position_Lang,
  
  },{transaction});
 
await transaction.commit();
res.status(200).send({
status:'true',
message:'Add Post Successfully..',
dataBlood:responseBlood,
dataPosition:responsePosition
});
}
catch(error){
 // Rollback transaction only if the transaction object is defined
 console.log(error);
 console.log("error add request")
 if (transaction) await transaction.rollback();
}
  
}));

module.exports = router;
