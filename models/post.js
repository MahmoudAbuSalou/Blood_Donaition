
const Joi = require('joi');
const Sequelize = require('sequelize')
const sequelize = require('../startup/db.js')
const {Post_Donate}=require('./post_donate');
const {BloodDonors}=require('./blood_donors');

const Post = sequelize.define('post', {


	post_id:{

		type:Sequelize.INTEGER,


		autoIncrement:true,

		allowNull:false,


		primaryKey:true
	},

  firstName: { type: Sequelize.STRING, allowNull:false },
  // user_id: { type: Sequelize.INTEGER, allowNull:false },
  lastName: { type: Sequelize.STRING, allowNull:false },
  bloodBags: { type: Sequelize.INTEGER, allowNull:false },
  bloodBagsCollect: { type: Sequelize.INTEGER, allowNull:false },
	cityName: { type: Sequelize.STRING, allowNull:false },
  hospitalName: { type: Sequelize.STRING, allowNull:false },
  gender: { type: Sequelize.STRING, allowNull:false },
      // true for normal post , false for emergency post  
  postType: { type: Sequelize.BOOLEAN, allowNull:false },
  bloodType: { type: Sequelize.STRING, allowNull:false },  
  bloodOwner: { type: Sequelize.STRING, allowNull:false },
  phone: { type: Sequelize.INTEGER, allowNull:false },
  expiryDate: { type: Sequelize.DATE, allowNull:false },
  
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
})


function validatePost(post) {
  const schema = Joi.object({
   
    cityName    : Joi.string().min(3).max(50).required(),
    firstName    : Joi.string().min(3).max(10).required(),
    lastName    : Joi.string().min(3).max(10).required(),
    bloodBags    : Joi.number().min(1).max(20).required(),
    bloodBagsCollect   : Joi.number().min(0).max(20).required(),
    bloodOwner    : Joi.string().min(2).max(10).required(),
    gender    : Joi.string().min(3).max(10).required(),
    hospitalName   : Joi.string().required().min(3).max(255),
    postType: Joi.boolean().required(),
    bloodType: Joi.string().min(2).max(10).required(),
    phone: Joi.number().min(10).required(),
    expiryDate :Joi.date().required(),
    position_Lat: Joi.required(),
    position_Lang: Joi.required(),

});
return schema.validate(post);
}


// many to many between post and blood_donar

Post.belongsToMany(BloodDonors, { through: Post_Donate });
BloodDonors.belongsToMany(Post, { through: Post_Donate });

exports.Post = Post; 
exports.validate = validatePost;


