
const Joi = require('joi');
const Sequelize = require('sequelize')
const sequelize = require('../startup/db.js')

const BloodDonors = sequelize.define('blood_donors', {


	donate_id:{

		type:Sequelize.INTEGER,


		autoIncrement:true,

		allowNull:false,


		primaryKey:true
	},
	post_id:{

		type:Sequelize.INTEGER,

		allowNull:false,
	},

      acceptance_rate: { type: Sequelize.INTEGER, allowNull:false },
	  statusRequest: { type: Sequelize.BOOLEAN, allowNull:false },

	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})


function validateBloodDonations(donation) {
  const schema = Joi.object({
   
    acceptance_rate: Joi.number().min(0).max(100).required(),
	post_id : Joi.number().required(),
   
});
return schema.validate(donation);
}


exports.BloodDonors = BloodDonors; 
exports.validate = validateBloodDonations;


