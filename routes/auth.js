const Joi = require('joi');
const bcrypt = require('bcrypt');
const  asyncMiddleWare     = require('../middleware/async');
const _ = require('lodash');
const User = require('../models/user');

const express = require('express');
const router = express.Router();

router.post('/',asyncMiddleWare( async (req, res) => {

  //Validate Response
  const { error } = validateAuth(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  //Check If User is found
  let user = await User.User.findOne({ where:{email: req.body.email} });
  if (!user) return res.status(400).send('This User Isn\'t Found');


  //Compare Between Req.password And User.password in DB
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password.');

  //If All Things Is GenToken And Send It 
  const token = User.genToken(); 
  res.send(token);
}));

function validateAuth(req) {

  const schema = Joi.object({
        email   : Joi.string().required().min(5).max(255).email(),
    password: Joi.string().min(5).max(255).required(),
 

    isAdmin :Joi.boolean().required(),
});
return schema.validate(req);

}
module.exports = router; 
