
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('userHealthProfile', {

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	profile_id:{

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
	weight: { type: Sequelize.INTEGER, allowNull:false },

	// Column-3, email
	gender: { type: Sequelize.STRING, allowNull:false },



	
      
      blood_type: { type: Sequelize.STRING, allowNull:false },
      donation_count: { type: Sequelize.INTEGER, allowNull:false },
      dateOfLastDonation:{ type: Sequelize.DATE,allowNull:true },
  
   

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})



//validate user
function validateUser(user) {
  const schema = Joi.object({
     weight    : Joi.number().min(2).max(50).required(),
     gender    : Joi.string().min(3).max(50).required(),
     blood_type    : Joi.string().min(2).max(50).required(),
     donation_count    : Joi.number().min(1).max(50).required(),
     dateOfLastDonation   :  Joi.date().raw().required(),
   
});
return schema.validate(user);
}



// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
exports.UserProfile = User; 
exports.validate = validateUser;

