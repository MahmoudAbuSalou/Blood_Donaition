
const Joi = require('joi');
const Sequelize = require('sequelize')
const sequelize = require('../startup/db.js')

const bloodPosition = sequelize.define('Position', {
	position_id:{
		type:Sequelize.INTEGER,
		autoIncrement:true,
		allowNull:false,
		primaryKey:true
	},
    
	position_Lat: { type: Sequelize.DOUBLE, allowNull:false },
	position_Lang: { type: Sequelize.DOUBLE, allowNull:false },


	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})




function validatePosition(position) {
    const schema = Joi.object({
     
		position_Lat    : Joi.number.required(),
		position_Lang   : Joi.number.required(),
  });
  return schema.validate(position);
  }

exports.bloodPosition = bloodPosition; 
exports.validatePosition = validatePosition;


