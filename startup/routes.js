const express = require('express');



const users = require('../routes/users');
const donaite = require('../routes/donaite');
const genPin=require('../routes/generatePin')
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());

  //app.use('/api/customers', customers);
  
  app.use('/api/users', users);
  app.use('/api/donaite',donaite)
  app.use('/api/genPin',genPin)
 
  app.use(error);
}