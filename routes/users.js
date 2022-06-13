const  _ = require('lodash');
const auth=require('../middleware/auth')

const bcrypt = require('bcrypt');
const fs = require('fs');
//to Catch Errors
const  asyncMiddleWare     = require('../middleware/async');


//load Model "USER"
const {User, validate,genToken} = require('../models/user');

const { UserProfile, validateUserProfile} = require('../models/health_user_profile');

const express = require('express');
const router = express.Router();



//getUser+UserProfile
router.get('/', auth, asyncMiddleWare(
  async (req, res) => {
      

  
    let user = await User.findOne ({where:{user_id:req.user.id}});
    let userHealthProfile = await UserProfile.findOne ({where:{user_id:req.user.id}});
    if(!user || !userHealthProfile)
    res.send({
      status:'false',
      message:'This User Not Found'
    })
     
    user=_.pick(user,['name', 'email', 'isAdmin','address','phone'])
    userHealthProfile=_.pick(userHealthProfile, ['weight', 'gender', 'blood_type','donation_count'])
    const response={
      message:"All Thing Is right",
      status:"true",
      user:user,
      userprofile:userHealthProfile
    }
    res.status(200).send(response);
  }
  
));


//Logout And Store Token in BlackList (File) 
router.get('/logout', auth, asyncMiddleWare(
  async (req, res) => {
    let token = req.headers.authorization;
   
    fs.appendFile('../BlackList.txt', token, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  
    
    res.status(200).send({
      status:"true",
      message:"Delete this token is Done",
      token:token
    });
  }
  
));
//Create User
router.post('/signUp',asyncMiddleWare( async (req, res) => {



  var reqUser=_.pick(req.body, ['name', 'email', 'password', 'isAdmin','address','phone'])
  var reqUserHealthProfile= _.pick(req.body, ['weight', 'gender', 'blood_type'])
 
  //Check if request isn't validate
  const { error } = validate(reqUser,'signUp'); 
  const { error2 } = validateUserProfile(reqUserHealthProfile); 
  if (error || error2) return res.status(400).send({error:error.details[0].message});

 
    // check if user already exist
    // Validate if user exist in our database
  let user = await User.findOne({ where:{email: reqUser.email} });
  if (user) return res.status(400).send({error:'User already registered.'});


    //Encrypt user password
  const salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(req.body.password, salt);


  // save user in our database and store it in UserRes
  const UserRes=await User.create({
    name: reqUser.name,
    email:reqUser.email,
    password:password,
    phone:reqUser.phone,
    address:reqUser.address,
    isAdmin:reqUser.isAdmin,


  })
 
  
  reqUserHealthProfile.user_id=UserRes.user_id
  const UserHealthProfileRes=await UserProfile.create({
   weight:reqUserHealthProfile.weight,
   gender:reqUserHealthProfile.gender,
   blood_type:reqUserHealthProfile.blood_type,
   donation_count:0,
   user_id:reqUserHealthProfile.user_id,

  })
  
   
    //Gen Token
    
    const token=genToken(UserRes.user_id,UserRes.isAdmin);
  
     

    //Init Obj to send it AS Response
     user = _.pick(UserRes, ['user_id','phone','address','name', 'email', 'isAdmin','token']);
    const userProfile = _.pick(UserHealthProfileRes, ['weight','gender','blood_type']);


     const Obj={
      status : 'true',
      message : 'all Thing is Right',
      user : user,
      userprofile:userProfile,
      pin:pin
    }


     res.status(200).send(Obj);
  
 
   
 
}));


//Change password
router.post('/chgPassword',auth,asyncMiddleWare(async(req,res)=>{

  //Validate Response
  const { error } = validate(req.body,'chgPassword'); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne ({where:{user_id:req.user.id}});
  

  if(!user)
  res.send({
    status:'false',
    message:'This User Not Found'
  })
  const salt = await bcrypt.genSalt(10);
  var hashPassword = await bcrypt.hash(req.body.password, salt);
   
  const result=user.update({
    password: hashPassword
  })
  var data={
    "status":"true",
    "message":"Password is changed successfuly "
  }
    if(result==0){
        data={
                "status":"false",
                "message":"Password is changed faield "
              }
  }

  res.send(data)




}));


 

//Login 
router.post('/login',asyncMiddleWare( async (req, res) => {

  //Validate Response
  const { error } = validate(req.body,'login'); 
  if (error) return res.status(400).send(error.details[0].message);

  //Check If User is found
  let user = await User.findOne({ where:{email: req.body.email} });
  if (!user) return res.status(400).send('This User Isn\'t Found');


  //Compare Between Req.password And User.password in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  //If All Things Is GenToken And Send It 
  
  const token = genToken(user.user_id,user.isAdmin); 
  
  
  res.status(200).send({
    status:true,
    message:"Login Success",
    token:token
  });
}));


 module.exports = router; 
