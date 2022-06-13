const express = require('express');

const bloodRequest = require('../routes/home/add_request_blood');
const AllPost = require('../routes/home/getAllPost');
const SinglePost = require('../routes/home/getSinglePost');
const deletePost = require('../routes/home/delete_post');
const updatePost = require('../routes/home/update_post');
const Search = require('../routes/search');

const users = require('../routes/users');
const donaite = require('../routes/donaite');
const genPin=require('../routes/generatePin')
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());

  app.use('/api/home/addRequest', bloodRequest);
  app.use('/api/home/getAll', AllPost);
  app.use('/api/home/getSinglePost', SinglePost);
  app.use('/api/home/deletePost', deletePost);
  app.use('/api/home/updatePost', updatePost);
  app.use('/api/search', Search);
  app.use('/api/users', users);
  app.use('/api/donaite',donaite)
  app.use('/api/genPin',genPin)
 
  app.use(error);
}