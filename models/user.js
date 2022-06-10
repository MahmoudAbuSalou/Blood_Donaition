
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')
const userProfile=require('./health_user_profile')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('user', {

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

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})

//  // Create token
// User.methods.generateAuthToken = function() { 
    
//   const token = jwt.sign({ _id: this.user_id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
//   return token;
// }

//validate user
function validateUser(user) {
  const schema = Joi.object({
    name    : Joi.string().min(3).max(50).required(),
    email   : Joi.string().required().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required(),
    address: Joi.string().min(5).max(255).required(),
    phone: Joi.number().min(10).max(10).required(),

    isAdmin :Joi.boolean(),
});
return schema.validate(user);
}
User.hasOne(userProfile.UserProfile, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
exports.User = User; 
exports.validate = validateUser;


