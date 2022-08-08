const  _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')
const userProfile=require('./health_user_profile')

const {Post}=require('./post');
const {BloodDonors}=require('./blood_donors');
const {Post_Donate}=require('./post_donate');
const {UserProfile}=require('./health_user_profile');
// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', 
{

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	user_id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		// To increment user_id automatically.
		autoIncrement:true,

		// user_id can not be null.
		allowNull:false,

		// For uniquely identify user.
		primaryKey:true
	},

	// Column-2, name
	name: { type: Sequelize.STRING, allowNull:false },

	// Column-3, email
	email: { type: Sequelize.STRING, allowNull:false },

  password: { type: Sequelize.STRING, allowNull:false },

	
      
      phone: { type: Sequelize.INTEGER, allowNull:false },
      address: { type: Sequelize.STRING, allowNull:false },
      isAdmin:{type:Sequelize.BOOLEAN,allowNull:false},
      tokenPh: { type: Sequelize.STRING, allowNull:false },
     
      birthDate:{ type: Sequelize.STRING,allowNull:false },

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
},
{
 
}


)


 // Create token
   var generateToken=  function(userID,role) { 
 
  let payload={
  
    "id":userID,
    "isAdmin": role
  }
 
  
    const token =  jwt.sign(payload, config.get('jwtPrivateKey'));
   
    return token;
  }


//validate user
function validateUser(user,type) {
  var schema;
  switch (type){
    case 'signUp': {
      console.log('Validation SignUp')
     
      schema=  Joi.object({
        name    : Joi.string().min(3).max(50).required(),
        email   : Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        address: Joi.string().min(5).max(255).required(),
        phone: Joi.number().min(10).required(),
        tokenPh:Joi.string().required(),
        isAdmin :Joi.boolean().required(),
        blood_type    : Joi.string().min(2).max(4).required(),
        gender   : Joi.string().required().min(3).max(255),
        weight: Joi.string().min(2).required(),
        birthDate:Joi.string().required(),
      })
      return schema.validate(user);
  }
  case 'login': {
    console.log('Validation Login')
      schema= Joi.object({
        email   : Joi.string().required().min(5).max(255).email(),
        password: Joi.string().min(5).max(255).required(),
        tokenPh:Joi.string().required()
      
      })
      return schema.validate(user);
  }
  case 'chgPassword':{
    console.log('chgPassword')
    schema= Joi.object({
      email   : Joi.string().required().min(5).max(255).email(),
      password: Joi.string().min(5).max(255).required(),
   
    })
    return schema.validate(user);
  }
  case 'updateProfile':{
    schema=  Joi.object({
      name    : Joi.string().min(3).max(50).required(),
      email   : Joi.string().required().min(5).max(255).email(),
     
     
      phone: Joi.number().min(10).required(),
  
    
      blood_type    : Joi.string().min(2).max(4).required(),
      gender   : Joi.string().required().min(4).max(255),
      weight: Joi.number().min(2).required(),
    })
    return schema.validate(user);
  }
  default: {
     console.log('Error Validation')
  }
 
  }
  
  
}

// one to one between user and user profile
User.hasOne(userProfile.UserProfile, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

UserProfile.belongsTo(User,{
  foreignKey: 'user_id',
 });
// , field : "user_id",
// one to many between post and user  
User.hasMany(Post, {
  foreignKey: 'user_id'
 
});
 Post.belongsTo(User,{
  foreignKey: 'user_id',
 });

//-------------------------------------------------------------
// one to many between BloodDonors and user  
User.hasMany(BloodDonors, {
  foreignKey: 'user_id',
  
});
 BloodDonors.belongsTo(User,{
  foreignKey: 'user_id',
 });


 User.hasMany(Post_Donate, {
  foreignKey: 'user_id'
 
});
Post_Donate.belongsTo(User,{
  foreignKey: 'user_id',
 });
//---------------------------------------------------------------
// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
exports.User = User; 
exports.validate = validateUser;
exports.genToken = generateToken;


