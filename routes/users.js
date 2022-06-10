

// const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const bcrypt = require('bcrypt');
// const _ = require('lodash');
// //load Model "USER"
// const {User, validate} = require('../models/user');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();

// router.get('/me', auth, async (req, res) => {
//   const user = await User.findById(req.user._id).select('-password');
//   res.send(user);
// });
// //if i want handle errors mannualy by using async MiddleWare 
// //put CallBack Function inside callOfModule
// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
//     // check if user already exist
//     // Validate if user exist in our database
//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered.');
//      // Get user input
//   user = new User(_.pick(req.body, ['name', 'email', 'password']));
//     //Encrypt user password
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   // save user in our database
//   await user.save();

//   const token = user.generateAuthToken();
//   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
// });

// module.exports = router; 
