const  _ = require('lodash');

const bcrypt = require('bcrypt');

//to Catch Errors
const  asyncMiddleWare     = require('../middleware/async');


//load Model "USER"
const {User, validate,genToken} = require('../models/user');

const express = require('express');
const router = express.Router();

router.get('/', /*auth,*/ asyncMiddleWare(
  async (req, res) => {
    const user = await User.findOne (req.user._id).select('-password');
    res.send(user);
  }
  
));


//Create User
router.post('/signUp',asyncMiddleWare( async (req, res) => {


  //Check if request isn't validate
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


    // check if user already exist
    // Validate if user exist in our database
  let user = await User.findOne({ where:{email: req.body.email} });
  if (user) return res.status(400).send('User already registered.');


    //Encrypt user password
  const salt = await bcrypt.genSalt(10);
  var password = await bcrypt.hash(req.body.password, salt);


  // save user in our database and store it in UserRes
  const UserRes=await User.create({
    name: req.body.name,
    email: req.body.email,
    password:password,
    phone:req.body.phone,
    address:req.body.address,
    isAdmin:req.body.isAdmin

  })
  
   
    //Gen Token
    const token=genToken();
     //add Token To Object
    UserRes.token=token;
 

    //Init Obj to send it AS Response
     user = _.pick(UserRes, ['user_id','phone','address','name', 'email', 'isAdmin','token']);


     const Obj={
      status : 'true',
      message : 'all Thing is Right',
      user : user
    }


     res.status(200).send(Obj);
  
 
   
 
}));


 module.exports = router; 
