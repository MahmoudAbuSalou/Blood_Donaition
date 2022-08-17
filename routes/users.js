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



function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

//getUser+UserProfile
router.get('/', auth, asyncMiddleWare(
  async (req, res) => {
      

  
    let user = await User.findOne ({where:{user_id:req.user.id}});
    let userHealthProfile = await UserProfile.findOne ({where:{user_id:req.user.id}});
    if(!user || !userHealthProfile)
    res.status(200).send({
      status:'false',
      message:'This User Not Found',
      user:null,
      userprofile:null
    })
     
    user=_.pick(user,['name', 'email', 'isAdmin','address','phone'])
    userHealthProfile=_.pick(userHealthProfile, ['weight', 'gender', 'blood_type','donation_count','dateOfLastDonation'])
    const response={
      message:"All Thing Is right",
      status:"true",
      user:user,
      userprofile:userHealthProfile
    }
    res.status(200).send(response);
  }
  
));

//getTokenPhone
router.get('/getTokenPh/:id', asyncMiddleWare(
  async (req, res) => {
      

     console.log(req.params.id)
    let user = await User.findOne ({where:{user_id:req.params.id}});
   
    if(!user )
    res.status(200).send({
      status:'false',
      message:'This User Not Found',
      user:null,
      userprofile:null
    })
     
    user=_.pick(user,['tokenPh'])
  
    const response={
      message:"All Thing Is right",
      status:"true",
      tokenPh:user.tokenPh,
    
    }
    res.status(200).send(response);
  }
  
));
//getTokenPhone
router.get('/getAllTokenPh', asyncMiddleWare(
  async (req, res) => {
      

     console.log(req.params.id)
    let user = await User.findAll ();
   
    if(!user )
    res.status(200).send({
      status:'false',
      message:'This User Not Found',
      user:null,
      userprofile:null
    })
     
   // user=_.pick(user,['tokenPh'])
  
    const response={
      message:"All Thing Is right",
      status:"true",
      users:user,
    
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
  if (error ) return res.status(200).send({message:error.details[0].message,
    status : 'false',
  
    user : null,
    userprofile:null,
    token:null
  });

 
    // check if user already exist
    // Validate if user exist in our database
  let user = await User.findOne({ where:{email: req.body.email } });
  if (user) return res.status(200).send({
    
    status : 'false',
    message : 'User already registered.',
    user : null,
    userprofile:null,
    token:null
  
  });


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
    birthDate:req.body.birthDate,
    tokenPh:req.body.tokenPh,
  
  },{transaction})
 
  
  const user_id=UserRes.user_id
  const UserHealthProfileRes=await UserProfile.create({
   weight:req.body.weight,
   gender:req.body.gender,
   blood_type:req.body.blood_type,
   donation_count:0,
   dateOfLastDonation:new Date(),
   user_id:user_id,


  },{transaction})
  
   
    //Gen Token
    
    const token=genToken(UserRes.user_id,UserRes.isAdmin);
    // var birth=UserRes.birthDate.substring(0, 8)
    
      //Init Obj to send it AS Response
      user = _.pick(UserRes, ['user_id','phone','address','name', 'email', 'isAdmin','birthDate','token']);
      const user_Profile = _.pick(UserHealthProfileRes, ['weight','gender','blood_type','donation_count']);
    // user.birthDate=birth
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

router.post('/checkEmail',asyncMiddleWare( async (req, res) => {


    
  
  try {
 
  //Check if request isn't validate
  const { error } = validate(req.body,'signUp'); 
  if (error ) return res.status(200).send(
       {
    message:error.details[0].message,
    status : 'false',
      });

 
    // check if user already exist
    // Validate if user exist in our database
  let user = await User.findOne({ where:{email: req.body.email } });
  if (user) return res.status(200).send({
    
    status : 'false',
    message : 'User already registered.',
    
  });


  
     


  
    
  
  
   
       const Obj={
        status : 'true',
        message : 'all Thing is Right',
       
    
      }
  
  
       res.status(200).send(Obj);
     
    
     
    
   
   } catch (error) {
    res.status(404).send(
      {
   message:error.details[0].message,
   status : 'false',
     });

   }

 


  
 
   
 
}));

//Change password
router.post('/chgPassword',asyncMiddleWare(async(req,res)=>{

  //Validate Response
  const { error } = validate(req.body,'chgPassword'); 
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ where:{email: req.body.email } });
  

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
  if (error) return res.status(200).send({
    status : 'false',
    message : error.details[0].message,
    user : null,
    userprofile:null,
    token:null
    });

  //Check If User is found
  let user = await User.findOne({ where:{email: req.body.email} });
  console.log(user)
  
    let userHealthProfile = await UserProfile.findOne ({where:{user_id:user.user_id}});
    let result=await user.update({
      tokenPh:req.body.tokenPh
      
    })
  if (!user) return res.status(200).send({
    message:'This User Isn\'t Found',
    status:'false',
    token:null,
    user : null,
    userprofile:null,
  
  });


  //Compare Between Req.password And User.password in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(200).send({message:'Invalid password.',status:'false',token:null});

  //If All Things Is GenToken And Send It 
  
  const token = genToken(user.user_id,user.isAdmin); 
  
  
  res.status(200).send({
    status:"true",
    message:"Login Success",
    token:token,
    user : user,
    userprofile:userHealthProfile,
  });
}));

router.post('/updateProfile',auth,asyncMiddleWare(async (req,res)=>{

  
  const {error}=validate(req.body,'updateProfile')

  if (error) return res.status(200).send({
    message:error.details[0].message,
    status:'false',
      "user":null,
  "userProfile":null
});
  
  let userProfile=await UserProfile.findOne({where:{user_id:req.user.id}});
  let user=await User.findOne({where:{user_id:req.user.id}});
  if(!userProfile || !user) res.status(200).send({
   'status':"false",
   'message':"This User isn't found",
   "user":null,
   "userProfile":null
    
  });
  
 
 
  let result=await userProfile.update({
    weight:req.body.weight,
    blood_type:req.body.blood_type,
    gender:req.body.gender
  })
   let result2=await user.update({
    name:req.body.name,
    address:req.body.address,
    email:req.body.email,
    phone:req.body.phone,
    

  })
  
  var data={
    "status":"true",
    "message":"Profile is Updated successfuly ",
    "user":result2,
    "userProfile":result
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

     
      var temp=((element.dataValues.donation_count * avg)/(5))
      
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
     
console.log(req.user.id)
   try {
    let user=await User.findOne({
      where: {user_id: req.user.id},
    })
    let userProfile=await UserProfile.findOne({
      where: {user_id: req.user.id},
    })
    
    if(!user ){
      res.status(200).send({
        status:'false',
        message:'this user is not found',
        data:user
       })
    }
    
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
      message:'this user is deleted',
      data:user
     })
    
   
   } catch (error) {
     // Rollback transaction only if the transaction object is defined
     console.log("errorDeleteUser")
     if (transaction) await transaction.rollback();
   }
    
    
   
    

    
  } ))

 
 module.exports = router; 
