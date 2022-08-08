const express = require('express');

const bloodRequest = require('../routes/home/add_request_blood');
const AllPost = require('../routes/home/getAllPost');
const SinglePost = require('../routes/home/getSinglePost');
const deletePost = require('../routes/home/delete_post');
const updatePost = require('../routes/home/update_post');
const Search = require('../routes/search');
const acceptanceRate = require('../routes/Donation/acceptance_rate');
const userPosts = require('../routes/Donation/user_posts');
const deleteDonors = require('../routes/Donation/delete');
const ConfirmDonors = require('../routes/Donation/confirm');
const getDonors = require('../routes/Donation/getDonors');

const users = require('../routes/users');
const donaite = require('../routes/donaite');
const genPin=require('../routes/generatePin')
const ratioDonate=require('../routes/dashBoard/GenderRatio')
const ratioAge=require('../routes/dashBoard/AgeRatio')
const ratioBloodGroup=require('../routes/dashBoard/bloodGroupsRatio')
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());

  app.use('/api/home/addRequest', bloodRequest);
  app.use('/api/home/getAll', AllPost);
  app.use('/api/home/getSinglePost', SinglePost);
  app.use('/api/home/deletePost', deletePost);
  app.use('/api/home/updatePost', updatePost);
  app.use('/api/search', Search);
  app.use('/api/Donation/acceptance_rate',acceptanceRate);
  app.use('/api/Donation/user_posts',userPosts);
  app.use('/api/Donation/getDonors',getDonors);
  app.use('/api/Donation/delete',deleteDonors);
  app.use('/api/Donation/confirm',ConfirmDonors);
  app.use('/api/users', users);
  app.use('/api/donaite',donaite)
  app.use('/api/genPin',genPin)
  //المتبرع له + المتبرع
  app.use('/api/GenderRatio/',ratioDonate)
  app.use('/api/AgeRatio/',ratioAge)
  app.use('/api/BloodGroupsRatio/',ratioBloodGroup)
  app.use(error);
}