
const Joi = require('joi');
const Sequelize = require('sequelize')
const sequelize = require('../startup/db.js')

const Post_Donate = sequelize.define('post_donate', {


	post_donate_id:{

		type:Sequelize.INTEGER,


		autoIncrement:true,

		allowNull:false,


		primaryKey:true
	},
	user_id:{type: Sequelize.INTEGER, allowNull:false },
      status: { type: Sequelize.BOOLEAN, allowNull:false },

	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})


function validate_Post_donate(PostDonate) {
  const schema = Joi.object({
   
    status: Joi.boolean().required(),
   
});
return schema.validate(PostDonate);
}




exports.Post_Donate = Post_Donate; 
exports.validate_Post_donate = validate_Post_donate;


