

const Sequelize = require('sequelize')
const sequelize = require('../../startup/db')


const PostArchive = sequelize.define('postArchive', {


	post_id:{

		type:Sequelize.INTEGER,




		allowNull:false,



	},

  user_id:{

		type:Sequelize.INTEGER,




		allowNull:false,



	},
  bloodBags: { type: Sequelize.INTEGER, allowNull:false },
  bloodBagsCollect: { type: Sequelize.INTEGER, allowNull:false },
	cityName: { type: Sequelize.STRING, allowNull:false },
  hospitalName: { type: Sequelize.STRING, allowNull:false },
  gender: { type: Sequelize.STRING, allowNull:false },
      // true for normal post , false for emergency post  
  postType: { type: Sequelize.BOOLEAN, allowNull:false },
  state:{type:Sequelize.BIGINT,allowNull:false},
  bloodType: { type: Sequelize.STRING, allowNull:false },  
 
});

 
exports.Post_Archive=PostArchive;