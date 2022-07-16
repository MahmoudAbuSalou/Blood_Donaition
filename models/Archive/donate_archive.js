const {Post_Archive}=require('./post_archive')
const Sequelize = require('sequelize')
const sequelize = require('../../startup/db')
//  الشخص المتبرع له
const UserDonate = sequelize.define('userDonate', 
{

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	Donate_id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,


	
		// user_id can not be null.
		allowNull:false,

	},
     birthDate:{ type: Sequelize.STRING,allowNull:false },
     gender:{type:Sequelize.STRING,allowNull:false},
     address:{type:Sequelize.STRING,allowNull:false}


},



)

UserDonate.hasMany(Post_Archive, {
    foreignKey: "Donate_id",
  
  });
  Post_Archive.belongsTo(UserDonate,{
    foreignKey: 'Donate_id',
   });

   
 
   exports.User_Donate=UserDonate