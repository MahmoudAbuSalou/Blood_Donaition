const  _ = require('lodash');
const auth=require('../middleware/auth')

const bcrypt = require('bcrypt');
const fs = require('fs');
//to Catch Errors
const  asyncMiddleWare     = require('../middleware/async');

//const { sequelize } = require("../startup/db"); 
//load Model "USER"
const {User, validate,genToken} = require('../models/user');
//Load Model "HealthUserProfile"
const { UserProfile} = require('../models/health_user_profile');
const {Post}=require('../models/post')

const express = require('express');
const {TokenModel ,encodeToken}=require('../models/blackList')
const router = express.Router();



function checkFile(filename) {
    fs.open(filename,'r',function(err, fd){
      if (err) {
        fs.writeFile(filename, 'w', function(err) {
            if(err) {
                console.log(err);
            }
            console.log("The file was saved!");
        });
      } else {
        console.log("The file exists!");
      }
    });
  }

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
router.get('/logout',auth,asyncMiddleWare(
  async (req, res) => {
    let tempToken = req.headers.authorization;
    tempToken=encodeToken(tempToken)
    const TokenRes=await TokenModel.create({
      token: tempToken,
    })
  
    
    res.status(200).send({
      status:"true",
      message:"Blocking this token is Done",
      token:TokenRes
    });
  }
  
));
//Create User
router.post('/signUp',asyncMiddleWare( async (req, res) => {


    
 
  
 
  //Check if request isn't validate
  const { error } = validate(req.body,'signUp'); 
  if (error ) return res.status(400).send({error:error.details[0].message});


 
    // check if user already exist
    // Validate if user exist in our database
  let user = await User.findOne({ where:{email: req.body.email} });
  if (user) return res.status(400).send({error:'User already registered.'});


    //Encrypt user password
  const salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(req.body.password, salt);


  const sequelize=require('../startup/db')
   let transaction;
     

   try {
  
    
    // get transaction
    transaction = await sequelize.transaction();
      // save user in our database and store it in UserRes
  const UserRes=await User.create({
    name: req.body.name,
    email:req.body.email,
    password:password,
    phone:req.body.phone,
    address:req.body.address,
    isAdmin:req.body.isAdmin,
    dateOfLastDonation:new Date()


  })
 
  
  const user_id=UserRes.user_id
  const UserHealthProfileRes=await UserProfile.create({
   weight:req.body.weight,
   gender:req.body.gender,
   blood_type:req.body.blood_type,
   donation_count:req.body.donation_count,
   user_id:user_id,

  })
  
   
    //Gen Token
    
    const token=genToken(UserRes.user_id,UserRes.isAdmin);
      //Init Obj to send it AS Response
      user = _.pick(UserRes, ['user_id','phone','address','name', 'email', 'isAdmin','token']);
      const user_Profile = _.pick(UserHealthProfileRes, ['weight','gender','blood_type','donation_count']);
  
  // commit
  await transaction.commit();
       const Obj={
        status : 'true',
        message : 'all Thing is Right',
        user : user,
        userprofile:user_Profile,
        token:token
    
      }
  
  
       res.status(200).send(Obj);
     
    
     
    
   
   } catch (error) {
     // Rollback transaction only if the transaction object is defined
     console.log("errorSignUser")
     if (transaction) await transaction.rollback();
   }

 


  
 
   
 
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
  if (error) return res.status(400).send({error:error.details[0].message,status:'false'});

  //Check If User is found
  let user = await User.findOne({ where:{email: req.body.email} });
  if (!user) return res.status(400).send({error:'This User Isn\'t Found',status:'false'});


  //Compare Between Req.password And User.password in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({error:'Invalid password.',status:'false'});

  //If All Things Is GenToken And Send It 
  
  const token = genToken(user.user_id,user.isAdmin); 
  
  
  res.status(200).send({
    status:true,
    message:"Login Success",
    token:token
  });
}));

router.post('/updateProfile',auth,asyncMiddleWare(async (req,res)=>{

  const error=validate(req.body,'updateProfile')
  if (error) return res.status(400).send(error.details[0].message);
  let userProfile=await UserProfile.findOne({where:{user_id:req.user.user_id}});
  let user=await User.findOne({where:{user_id:req.user.user_id}});
  if(!userProfile || !user) res.status(400).send({
   'status':"false",
   'message':"This User isn't found",
    
  });
  
  
 
  let result=userProfile.update({
    weight:req.body.weight,
    blood_type:req.body.blood_type,
    gender:req.body.gender
  })
   let result2=user.update({
    name:req.body.name,
    address:req.body.address,
    email:req.body,email,
    phone:req.body.phone,
    

  })
  
  var data={
    "status":"true",
    "message":"Profile is Updated successfuly "
  }
  res.status(200).send(data)

 
 }));

//getUsers
router.get('/listUser', auth, asyncMiddleWare(
  async (req, res) => {
      

  
    let Result = await UserProfile.findAll ({
      attributes: ['donation_count'],
      limit: 10,
      include:[
        {
          model:User
        }
      ],
      order: [
        
          ['donation_count', 'DESC']
      ],

    });
    var max=Result[Result.length-1].dataValues.donation_count
    var min=Result[0].dataValues.donation_count
    
    var avg=(min +max)/5
  
    


    Result.forEach(element => {

     
      var temp=((element.dataValues.donation_count * 3)/(5))
      
      element.dataValues.rating=temp;
     
      
    });
   
   
   //  console.log(Result[0].dataValues)
   
    const response={
      message:"All Thing Is right",
      status:"true",
      data:Result,
      
    }
    res.status(200).send(response);
  }));


  //DeleteUser
  router.get('/deleteUser',auth,asyncMiddleWare(async (req,res)=>{
  
    
    
  //Don't Use it Global in Transaction that throw Exception 
  //Bug in Transaction 
    const sequelize=require('../startup/db')
   let transaction;
     

   try {
    let user=await User.findOne({
      where: {user_id: req.user.id},
    })
    let userProfile=await UserProfile.findOne({
      where: {user_id: req.user.id},
    })
  
    
    // get transaction
    transaction = await sequelize.transaction();
     await User.destroy({
     where:{ user_id: user.user_id},transaction });
     
    
     await UserProfile.destroy({
      where: {
        profile_id: userProfile.profile_id
      }
      ,transaction});
      await Post.destroy({
        where: {
          user_id: user.user_id
        }
        ,transaction});
    // commit
    await transaction.commit();
     res.send({
      status:'true',
      data:user
     })
    
   
   } catch (error) {
     // Rollback transaction only if the transaction object is defined
     console.log("errorDeleteUser")
     if (transaction) await transaction.rollback();
   }
    
    
   
    

    
  } ))
 module.exports = router; 
