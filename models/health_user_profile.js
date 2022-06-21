
const Joi = require('joi');
const  _ = require('lodash');
// Include Sequelize module.
const Sequelize = require('sequelize')

// Import sequelize object,
// Database connection pool managed by Sequelize.
const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const User = sequelize.define('userHealthProfile', {

	
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
    

	
	weight: { type: Sequelize.STRING, allowNull:false },
	
	gender: { type: Sequelize.STRING, allowNull:false },



	
      
      blood_type: { type: Sequelize.STRING, allowNull:false },
      donation_count: { type: Sequelize.INTEGER, allowNull:true },
      dateOfLastDonation:{ type: Sequelize.DATE,allowNull:true },
  
   

	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})







// Exporting User, using this constant
// we can perform CRUD operations on
// 'user' table.
exports.UserProfile = User; 


