const databaseConfig = require("../config/dataBaseConfig");
// Include Sequelize module
const Sequelize = require('sequelize')


const sequelize = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.DIALECT


});

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize
