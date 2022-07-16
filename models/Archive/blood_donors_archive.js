const {Post_Archive}=require('./post_archive')
const Sequelize = require('sequelize')
const sequelize = require('../../startup/db')
//الشخص المتبرع
const UserDonor = sequelize.define('userDonor', 
{

	// Column-1, user_id is an object with
	// properties like type, keys,
	// validation of column.
	post_id:{

		type:Sequelize.INTEGER,




		allowNull:false,



	},
	Donor_id:{

		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.INTEGER,

		
	
		// user_id can not be null.
		allowNull:false,

		
	},
     birthDate:{ type: Sequelize.STRING,allowNull:false },
     gender:{type:Sequelize.STRING,allowNull:false},
     address:{type:Sequelize.STRING,allowNull:false},


},



)

UserDonor.hasMany(Post_Archive, {
    foreignKey: "Donor_id",

  });
  
  Post_Archive.belongsTo(UserDonor,{
    foreignKey: 'Donor_id',
   }); 

   exports.User_Donor=UserDonor