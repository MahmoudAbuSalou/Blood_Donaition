
const config = require('config');
const jwt = require('jsonwebtoken');


// Include Sequelize module.
const Sequelize = require('sequelize')

const sequelize = require('../startup/db.js')

// Define method takes two arguments
// 1st - name of table
// 2nd - columns inside the table
const BlockToken = sequelize.define('BlackToken', 
{

	// Column-1,  is an object with
	// properties like type, keys,
	// validation of column.
	black_token_id:{

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
	token: { type: Sequelize.TEXT , allowNull:false ,},


	// Timestamps
	createdAt: Sequelize.DATE,
	updatedAt: Sequelize.DATE,
},



)


 // Create token
   var blockToken=  function(Token) { 
 
  let payload={
  
    "crypt":Token,
    
  }
 
  
    const token =  jwt.sign(payload, config.get('blackListKey'));
   
    return token;
  }



exports.TokenModel = BlockToken; 

exports.encodeToken = blockToken;


